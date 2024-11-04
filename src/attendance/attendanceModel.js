import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema({

    employeeID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'employee'
    },

    date:Date,

    status:{
        type:String,
        default:"Absent"
    }

})

export const attendance = mongoose.model('emp_Attendance',attendanceSchema)