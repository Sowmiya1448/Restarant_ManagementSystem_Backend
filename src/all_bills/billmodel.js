import mongoose from "mongoose";


const paid_billschema = mongoose.Schema({

    Billno:String,
    billdate:Date,
    billamount:Number,
    billstatus:String,
   
})

export const paidbill = mongoose.model('paidbill',paid_billschema)



const paiditemSchema = mongoose.Schema({

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
export const paiditem = mongoose.model('paiditem',paiditemSchema)

