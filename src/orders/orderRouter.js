import express from 'express'
import { bill, order } from './ordermodel.js'
import { menu } from '../Menuitems/menumodel.js'
import {paidbill} from '../all_bills/billmodel.js'

const orderRouter = express.Router()


orderRouter.get('/weekly-sales', async (request, response) => {
  
       const today = new Date()

        const pastWeekDates = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(today)
            date.setDate(today.getDate() - i)
            return date.toISOString().split("T")[0]

        }).reverse()

      const weeklySales = []
      
      for (const date of pastWeekDates) {
          
            const billsForDate = await paidbill.find({ billdate: date })
            const dailyTotal = billsForDate.reduce((sum, bill) => sum + (bill.billamount || 0), 0)
            
            const Weekdays = new Date(date).toLocaleDateString('en-US',{ weekday: 'long' })

            weeklySales.push({ date, day: Weekdays, totalSales: Math.round(dailyTotal )})
          }
       
          response.json({ weeklySales })
   
})


orderRouter.get('/all/', async (request, response) => {


    const all_bill = await bill.find({})

    let all_data = []

    for (let bill of all_bill) {

        const items_to_bill = await order.find({ 'Billref': bill._id })

        let single_data = {

            bill_data: bill,
            items_data: items_to_bill

        }

        all_data.push(single_data)
    }

    response.json(all_data)

})




  orderRouter.get('/:id', async (request, response) => {

            const { id } = request.params

            const bills = await bill.findById(id)

            const items_to_bill = await order.find({ 'Billref': id })

            let single_data = {

                bill_data: bills,
                items_data: items_to_bill

            }
            response.json(single_data)

})

orderRouter.post('/add/', async (request, response) => {

            const billdata = request.body[0]

            const ordereditems = request.body[1]

            const gstdata = request.body[2]

            const newdata = new bill(billdata)

            await newdata.save()

            let grandtotal = 0

            for (let orders of ordereditems) {

                let itemref = await menu.findOne({ itemname: orders.itemname })

                let gstamounts = (Number(orders.subtotal) * Number(gstdata)) / 100

                let subtot = Number(orders.subtotal) + Number(gstamounts)

                grandtotal = grandtotal + subtot

                const data = new order({

                    item_ref: itemref._id,
                    Billref: newdata._id,
                    price: orders.price,
                    amount: orders.subtotal,
                    quantity: orders.quantity,
                    gst: gstdata,
                    gstamount: gstamounts,
                    subtotal: subtot

                })

                await data.save()
            }

            await bill.findByIdAndUpdate(newdata._id, { billamount: grandtotal })

            response.json({ message: "data received in order" })

})

orderRouter.patch('/:id/', async (request, response) => {

    const { id } = request.params

    const billdata = request.body[0]

    const ordereditems = request.body[1]

  

    await bill.findByIdAndUpdate(id, billdata)

    let grandtotal = 0

    for (let orders of ordereditems) {

        if (orders.update === true) {

            let amount = Number(orders.quantity) * Number(orders.price)

            let gstamounts = (Number(amount) * Number(orders.gst)) / 100

            let subtot = Number(amount) + Number(gstamounts)

            grandtotal = Number(grandtotal) + Number(subtot)

            const data = {

                item_ref: orders.item_ref,
                Billref: orders.Billref,
                price: orders.price,
                amount: amount,
                quantity: orders.quantity,
                gst: orders.gst,
                gstamount: gstamounts,
                subtotal: subtot

            }
            await order.findByIdAndUpdate(orders._id, data)
        }

        else if (orders.delete === true) {
            await order.findByIdAndDelete(orders._id)

        }
        else {
            grandtotal = grandtotal + orders.subtotal
        }

    }

    await bill.findByIdAndUpdate(id, { billamount: grandtotal })
    response.json({ message: "data updated in order" })

})


orderRouter.delete('/:id', async (request, response) => {


    const { id } = request.params

    await bill.findByIdAndDelete(id)

    const products_to_bill = await order.find({ 'Billref': id })

    for (let orders of products_to_bill) {

        await order.findByIdAndDelete(orders._id)
    }

    response.json({ message: "data deleted in order" })
})

export default orderRouter