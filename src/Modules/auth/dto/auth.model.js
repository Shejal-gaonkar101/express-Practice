import { string } from "joi"
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name : {
        type :String,
        trim :true,
        minlength :2,
        maxlength:50,
        require:[true,"Name is required"]
    },
    email: {
        type :String,
        trim :true,
       lowercase:true,
       unique:true,
        require:[true,"Email is required"]
    },
    password: {
        type :String,
        minlength:8,
        require:[true,"password is required"],
        select : false
    },
    role: {
        type :String,
        default:"customer",
        enum:["customer","seller","admin"]
    },
    isVerified:{
        type:Boolean,
        default:false

    },
    verificationToken:{type:String , select :false},
    refreshToken:{type:String , select :false},
    resetPasswordToken:{type:String , select :false},
    resetPasswordToken:{type:String , select :false},
    resetPasswordExpires :{type:String , select :false},


}, {timestamps:true})

export default mongoose.model("User", userSchema)