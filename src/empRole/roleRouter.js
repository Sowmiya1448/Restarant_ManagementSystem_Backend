import express from 'express'
import { empcategory } from './empRolemodel.js'


const empRole = express.Router()


empRole.get('/all',async(request,response)=>{

        const categorylist = await empcategory.find({})

        response.json(categorylist)
})


empRole.get('/:id',async(request,response)=>{

    const {id} =request.params
    
    const onedata = await empcategory.findById(id)

    response.json(onedata)

})

empRole.post('/add/',async(request,response)=>{

    console.log(request.body)

    const newdata = new empcategory(request.body)

    await newdata.save()

    response.json(request.body)
})

empRole.patch('/:id',async(request,response)=>{


    
})

empRole.delete('/:id',async(request,response)=>{


    const {id} =request.params
  
    await empcategory.findByIdAndDelete(id)
    response.json({message:"data deleted"})


    
})
export default empRole