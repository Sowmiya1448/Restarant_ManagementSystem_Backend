import express from 'express'
import { chef } from './chefmodel.js'


const chefRouter = express.Router()

chefRouter.get('/all/' ,async(request,response) =>{

    const getdata = await chef.find({})

    response.json(getdata)

})


chefRouter.get('/:id/' ,async(request,response) =>{

    const {id} = request.params

    const getdata = await chef.findById(id)

    response.json(getdata)

})


chefRouter.post('/add/' ,async(request,response) =>{

   const {table_ref} =request.body[0]

    const items = request.body[1]

  for(let order of items )

        {
            const newdata = new chef({

                table_ref:table_ref,
                itemname :order.itemname,
                quantity:order.quantity
             })


             await newdata.save()
        }

    response.json("data received in chef model")

})



chefRouter.patch('/:id/' ,async(request,response) =>{

    const {id} = request.params

await chef.findByIdAndUpdate(id,request.body)

response.json("chef model updated")

})



chefRouter.delete('/:id/' ,async(request,response) =>{

    const {id} = request.params

    await chef.findByIdAndDelete(id)
    
    response.json("chef model deleted")
    
})



export default chefRouter