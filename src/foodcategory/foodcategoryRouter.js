import express from 'express'
import { foodcategory } from './foodcategorymodel.js'



const foodcategory_Router = express.Router()


foodcategory_Router.get('/all',async(request,response)=>{

        const categorylist = await foodcategory.find({})

        response.json(categorylist)
})


foodcategory_Router.get('/:id',async(request,response)=>{

    const {id} =request.params
    
    const onedata = await foodcategory.findById(id)

    response.json(onedata)

})

foodcategory_Router.post('/add/',async(request,response)=>{

    console.log(request.body)

    const newdata = new foodcategory(request.body)

    await newdata.save()

    response.json(request.body)
})

foodcategory_Router.patch('/:id',async(request,response)=>{


    
})

foodcategory_Router.delete('/:id',async(request,response)=>{


    const {id} =request.params
  
    await foodcategory.findByIdAndDelete(id)
    response.json({message:"data deleted"})


    
})
export default foodcategory_Router