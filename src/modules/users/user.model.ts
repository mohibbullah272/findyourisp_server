import mongoose, { Schema } from "mongoose";
import { IUser, UserRole } from "./user.interface";



const userSchema = new Schema<IUser>({
    name:{
        type:String, required:false, trim:true
    },
    email:{
        type:String, required:true, unique:true
    },
    phone:{
        type:String, required:false, trim:true
    },
    photo:{
        type:String, required:false, trim:true
    },
    password:{
        type:String, required:true, 
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER,
      },
    isVerified:{
        type:Boolean, required:false , default:false
    },
    isBlocked:{
        type:Boolean, required:false , default:false
    },
    isDeleted:{
        type:Boolean, required:false , default:false
    }
},
{
collection:"USER",
versionKey:false,
timestamps:true

})



export const User = mongoose.model<IUser>("User",userSchema)