import mongoose from "mongoose";

const foodcategoryschema = mongoose.Schema({

           categoryname:String

}) 
export const foodcategory = mongoose.model('foodcategory',foodcategoryschema)