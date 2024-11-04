import mongoose from "mongoose";


const billschema = mongoose.Schema({

    Billno:String,
    billdate:Date,
    billamount:Number,
    
    billstatus:{

        type:String,
        default:"UNPAID"
    },
    
    table_ref:{
        
        type:mongoose.Schema.Types.ObjectId,
        ref:'table'
    },

    ordertype:String

})

export const bill = mongoose.model('bill',billschema)



const orderSchema = mongoose.Schema({

    Billref:{
       type:mongoose.Schema.Types.ObjectId,
        ref:'bill'

    },

    item_ref :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'menu'
    },

    
    price:{
        type:Number,
        required:true

    },

    quantity:{
        type:Number,
        required:true

    },

    amount:Number,

    gst:Number,
   
    gstamount:Number,
   
  subtotal:{
        type:Number,
        required:true

    }
    

})
export const order = mongoose.model('order',orderSchema)