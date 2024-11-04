import express from 'express'
import { attendance } from './attendanceModel.js'
import { employee } from '../employee/employeemodel.js'
import { salary } from '../salary/salarymodel.js'

const attendanceRouter = express.Router()

attendanceRouter.get('/all/', async (request, response) => {

    const alldata = await attendance.find({})
    
    response.json(alldata)

})

attendanceRouter.get('/presentcount/', async (request, response) => {
    
        const { date } = request.query; 

        if (!date) {
            return response.status(400).json({ error: "Date query parameter is required" })
        }

        const presentCount = await attendance.countDocuments({
            date: date,
            status: 'present'
        })

        response.json({ presentCount});
   
})




attendanceRouter.get('/:id/', async (request, response) => {
    const { id } = request.params

    const singledata = await attendance.findById(id)
    response.json(singledata)

})




attendanceRouter.post('/add/', async (request, response) => {

    console.log(request.body)

    const newdata = new attendance(request.body)

    newdata.save()

    response.json("data received in attendance model")

})



attendanceRouter.patch('/:id/', async (request, response) => {


    const { id } = request.params

    await attendance.findByIdAndUpdate(id, request.body)

    response.json("data updated in attendance model")


})

attendanceRouter.delete('/:id/', async (request, response) => {


    const { id } = request.params

    await attendance.findByIdAndDelete(id)

    response.json("data deleted in attendance model")


})

export default attendanceRouter

