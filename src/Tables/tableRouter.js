import express from 'express'
import { table } from './tablemodel.js'

const tableRouter = express.Router()

tableRouter.get('/all',async(request,response)=>{

    const alldata = await table.find({})

    response.json(alldata)
})


tableRouter.get('/:id',async(request,response)=>{

const {id} =request.params

const onedata = await table.findById(id)

response.json(onedata)

})

tableRouter.post('/add/',async(request,response)=>{

console.log(request.body)

const newdata = new table(request.body)

await newdata.save()

response.json("data received in table")
})



tableRouter.patch('/:id/',async(request,response)=>{

    const {id} =request.params

    await table.findByIdAndUpdate(id,request.body)
    response.json({message:"data deleted in table"})

})


tableRouter.delete('/:id',async(request,response)=>{


const {id} =request.params

await table.findByIdAndDelete(id)
response.json({message:"data deleted in table"})



})

export default tableRouter