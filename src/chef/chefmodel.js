import mongoose from "mongoose";

const chefschema = mongoose.Schema({

   table_ref:{
        
        type:mongoose.Schema.Types.ObjectId,
        ref:'table'
    },

    itemname :String,

    quantity:Number,

    status:{

        type:String,
        default:"Pending"
    }

})
export const chef = mongoose.model('chef',chefschema)