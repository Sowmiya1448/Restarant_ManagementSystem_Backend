import mongoose from "mongoose";

const tableschema = mongoose.Schema({

    tableno:Number,
    chairs:Number,
    
    status:{
        type:String,
        default:"Available"
    }


})

export const  table = mongoose.model('table',tableschema)