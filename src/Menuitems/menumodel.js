import mongoose from "mongoose";

const menuSchema = mongoose.Schema({

       itemname:String,

       price:Number,

       image:String,
       
       category_ref:{
              
        type:mongoose.Schema.Types.ObjectId,
        ref:"foodcategory"

       }

})

export const menu = mongoose.model('menuitem',menuSchema)