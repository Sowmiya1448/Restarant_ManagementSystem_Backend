import mongoose from "mongoose";

const imageSchema = mongoose.Schema({

    image:String
})

export const image = mongoose.model('imageupload',imageSchema)