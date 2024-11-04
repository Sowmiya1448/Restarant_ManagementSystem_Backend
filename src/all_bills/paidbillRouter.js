import express from 'express'
import { paidbill } from './billmodel.js'
import { paiditem } from './billmodel.js'

const paidbillRouter = express.Router()

paidbillRouter.get("/all/", async (request, response) => {

  const all_bill = await paidbill.find({})

    let all_data = []

    for (let bill of all_bill) {

        const items_to_bill = await paiditem.find({ 'Billref':paidbill._id})

        let single_data = {

            bill_data: bill,
            items_data: items_to_bill

        }

        all_data.push(single_data)
    }

    response.json(all_data)
   
})

paidbillRouter.get('/billcount/', async (request, response) => {

    const { date } = request.query

    if (!date) {
        return response.status(400).json({ error: "Date query parameter is required" });
    }
    const presentbillCount = await paidbill.countDocuments({
        billdate: date

    })

    const totalbillaount = await paidbill.find({

        billdate:date
   })

   let amount = 0

   for(let bil of totalbillaount){
     
    amount = amount+bil.billamount
    }

   response.json({ presentbillCount ,amount})

})



paidbillRouter.get("/:id/", async (request, response) => {

    const { id } = request.params

    const bills = await paidbill.findById(id)

    const items_to_bill = await paiditem.find({ 'Billref': id })

    let single_data = {

        bill_data: bills,
        items_data: items_to_bill

    }
    response.json(single_data)

  
})


paidbillRouter.post("/add/", async (request, response) => {

    const billdata = request.body[0]

    const ordereditems = request.body[1]

    const newdata = new paidbill(billdata)

    await newdata.save()

    let grandtotal = 0

    for (let orders of ordereditems) {

        grandtotal= grandtotal+orders.subtotal

        const data = new paiditem({

            item_ref:orders.item_ref,
            Billref:newdata._id,
            price: orders.price,
            amount: orders.amount,
            quantity: orders.quantity,
            gst:orders.gst,
            gstamount:orders.gstamount,
            subtotal:orders.subtotal

        })

        await data.save()
    }
    
    await paidbill.findByIdAndUpdate(newdata._id, { billamount: grandtotal })

    response.json("data received in paidbill model")




    
})

paidbillRouter.patch("/:id/", async (request, response) => {

    const {id} = request.params

    await paidbill.findByIdAndUpdate(id,request.body)

    response.json(request.body)
})


paidbillRouter.delete("/:id/", async (request, response) => {

    const { id } = request.params

    await paidbill.findByIdAndDelete(id)

    const products_to_bill = await paiditem.find({ 'Billref': id })

    for (let orders of products_to_bill) {

        await paiditem.findByIdAndDelete(orders._id)
    }

    response.json({ message: "data deleted in paid bills" })

})

export default paidbillRouter