import express from 'express'
import { menu } from './menumodel.js'

const menuRouter = express.Router()

menuRouter.get('/all',async(request,response)=>{

    const categorylist = await menu.find({})

    response.json(categorylist)
})


menuRouter.get('/:id',async(request,response)=>{

const {id} =request.params

const onedata = await menu.findById(id)

response.json(onedata)

})

menuRouter.post('/add/',async(request,response)=>{

console.log(request.body)

const newdata = new menu(request.body)

await newdata.save()

response.json(request.body)
})



menuRouter.patch('/:id/',async(request,response)=>{

    const {id} =request.params

    await menu.findByIdAndUpdate(id,request.body)
    response.json({message:"data deleted in menu"})

})


menuRouter.delete('/:id',async(request,response)=>{


const {id} =request.params

await menu.findByIdAndDelete(id)
response.json({message:"data deleted in menu"})



})

export default menuRouter