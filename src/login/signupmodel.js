import mongoose from "mongoose";

const userschema = mongoose.Schema({
          
        email:{
            type:String,
            required:true
           },
        
           password :{
            type:String,
            required:true
           },
           
        admin:{
            type:Boolean,
            required:true
           },
        
           chef:{
            type:Boolean,
            required:true
           }

},
{
      timestamps:true

}
)

export const user =mongoose.model('user' ,userschema)


const RefreshTokenSchema = mongoose.Schema(
      {
            refresh_token:{
                   
                  type:String,
                  required:true

            }
      }
)

export const RefreshToken = mongoose.model('refreshtoken',RefreshTokenSchema)