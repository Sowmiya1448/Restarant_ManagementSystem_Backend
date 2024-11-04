import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
        
        empid:String,
        empname:String,
        age:Number,
        phno:Number,
        gender:String,
        address:String,
        salaryPerDay:Number,
        image:String,
        
        category_ref :{
          type:mongoose.Schema.Types.ObjectId,
            ref:'empcategory'
        }

})

export const employee = mongoose.model('employeedata',employeeSchema)