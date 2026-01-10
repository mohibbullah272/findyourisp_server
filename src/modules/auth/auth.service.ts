import { Request, Response } from "express";
import catchAsync from "../../utility/catchAsync";
import { User } from "../users/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utility/genarateToken";


const createAccount = async(payload: { email: string; password: string; }) => {
const {email,password}=payload

const isEmailAlreadyExist = await User.findOne({email})
if(isEmailAlreadyExist?.email){
    throw new Error("email Already Exist")
}
const salt = await bcrypt.genSalt(Number(process.env.SALT!))

const hashedPassword = await bcrypt.hash(password,salt)

const user = await User.create({
    email,
    password:hashedPassword
})
const token = await generateToken({
    userId:user?._id,
    email:user?.email,
    role:user?.role
})

const userSafeData ={
    userId:user?._id,
    email:user?.email,
    role:user?.role

}

return {userSafeData,token}

}


const login = async (payload: { email: string; password: string; }) => {
    const { email, password } = payload
  
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("Invalid credentials");
    }
  
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid credentials");
    }
  
    const token = await generateToken({
        userId:user?._id,
        email:user?.email,
        role:user?.role
    })
    const userSafeData ={
        userId:user?._id,
        email:user?.email,
        role:user?.role
    
    }
    return {userSafeData,token}
  }

  export const authService ={
    createAccount,
    login
  }