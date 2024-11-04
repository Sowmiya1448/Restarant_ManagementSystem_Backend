import express, {json,urlencoded} from 'express'
import { config } from 'dotenv'
import { connect } from 'mongoose'
import cors from 'cors'

import empRouter from './employee/employeeRouter.js'
import ImageRouter from './imageupload/imageRouter.js'
import empRole from './empRole/roleRouter.js'
import foodcategory_Router from './foodcategory/foodcategoryRouter.js'
import attendanceRouter from './attendance/attendanceRouter.js'
import salaryRouter from './salary/salaryRouter.js'
import menuRouter from './Menuitems/menuRouter.js'
import tableRouter from './Tables/tableRouter.js'
import orderRouter from './orders/orderRouter.js'
import UserRouter from './login/signuprouter.js'
import paidbillRouter from './all_bills/paidbillRouter.js'
import chefRouter from './chef/chefRouter.js'


const app = express()
app.use(json({ limit: "50mb" }))
app.use(urlencoded({ limit: "50mb", extended: true }))
config()
app.use(cors())

app.use('/employee/',empRouter)
app.use('/image/',ImageRouter)
app.use('/emprole/',empRole)
app.use('/foodcategory/',foodcategory_Router)
app.use('/attendance/',attendanceRouter)
app.use('/salary/',salaryRouter)
app.use('/menu/',menuRouter)
app.use('/table/',tableRouter)
app.use('/order/',orderRouter)
app.use('/signup/',UserRouter)
app.use('/paidbills/',paidbillRouter)
app.use('/chef/',chefRouter)



const port = process.env.port
const mongo = process.env.mongo

const start = async () => {

    await connect(mongo)
    app.listen(port, console.log(`serving on port ${port}`))

}

start()

