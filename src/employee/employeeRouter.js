import express from 'express'
import { employee } from './employeemodel.js'

const empRouter = express.Router()

empRouter.get("/all/", async (request, response) => {

    let alldata = await employee.find({})

    response.json(alldata)
})

empRouter.get("/:id/", async (request, response) => {

    const { id } = request.params

    let singledata = await employee.findById(id)

    response.json(singledata)
})

empRouter.post("/add/", async (request, response) => {


    const newdata = new employee(request.body) 

    await newdata.save()

    response.json(newdata)
})

empRouter.patch("/:id/", async (request, response) => {

    const {id} = request.params

    await employee.findByIdAndUpdate(id,request.body)

    response.json(request.body)
})

empRouter.delete("/:id/", async (request, response) => {

    const { id } = request.params

    await employee.findByIdAndDelete(id)

    response.json({ message: "data deleted in employee model" })
})

export default empRouter