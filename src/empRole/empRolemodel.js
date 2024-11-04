import mongoose from "mongoose";

const empcategoryschema = mongoose.Schema({

           categoryname:String

}) 
export const empcategory = mongoose.model('empRole',empcategoryschema)