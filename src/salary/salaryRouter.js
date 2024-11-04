import express from 'express'
import { salary } from './salarymodel.js'
import { employee } from '../employee/employeemodel.js'
import { attendance } from '../attendance/attendanceModel.js'


const salaryRouter = express.Router()

    salaryRouter.get('/all/', async (request, response) => {

        const alldata = await salary.find({})
        response.json(alldata)

})

    salaryRouter.get('/:id/', async (request, response) => {

        const { id } = request.params

        const singledata = await salary.findById(id)
        response.json(singledata)
 })


    salaryRouter.post('/monthly_salary/', async (request, response) => {

        const { month, year } = request.body

       const startOfMonth = new Date(year, month - 1, 1)
        const endOfMonth = new Date(year, month, 0)

       const employees = await employee.find()

        const results = await Promise.all(employees.map(async (emp) => {

            const totdays = await attendance.countDocuments({

                employeeID: emp._id,
                date: { $gte: startOfMonth, $lte: endOfMonth },
                status: 'present'
            })

            const totsalary = emp.salaryPerDay * totdays

            await salary.findOneAndUpdate(

                { emp_ref: emp._id },
                { monthlysalary: totsalary, monthlyPresentDays: totdays, month, year },
                { upsert: true, new: true }
            )

            return { emp_ref: emp._id, monthlyPresentDays: totdays, monthlysalary: totsalary }
        }))

        response.json({ message: "Data processed for all employees", data: results })

 })


        salaryRouter.post('/add/', async (request, response) => {

        console.log(request.body)

        const newdata = new salary(request.body)

        newdata.save()

        response.json(newdata)



})

    salaryRouter.patch('/:id/', async (request, response) => {


        const { id } = request.params

        await salary.findByIdAndUpdate(id, request.body)

        response.json("data updated in salary model")


})

    salaryRouter.delete('/:id/', async (request, response) => {


        const { id } = request.params

        await salary.findByIdAndDelete(id)

        response.json("data deleted in salary model")


 })

export default salaryRouter

