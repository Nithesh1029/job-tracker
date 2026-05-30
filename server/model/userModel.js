import mongoose from "mongoose";
const url=process.env.DB_URL
const userSchema=new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            trim:true

        },
        lastName:{
            type:String,
            required:true,
            trim:true

        },
        email:{
            type:String,
            unique:true,
            trim:true,
            required:true,
            lowercase:true
        },
        password:{
            type:String,
            trim:true,


        }, 
        resume:{
            type:String,
            default:""
        },

    },
    {
        timestamps:true
    }
)

const User = mongoose.model("User",userSchema);

export default User;