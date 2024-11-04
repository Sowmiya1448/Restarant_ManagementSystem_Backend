import mongoose from "mongoose";

const salarySchema = mongoose.Schema({

    emp_ref:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'employee'
    },
    
    monthlysalary:Number,
    monthlyPresentDays:Number
        
})

export const salary = mongoose.model('salary',salarySchema)