
import { User } from "../users/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utility/genarateToken";
import AppError from "../../middlewares/appError";


const createAccount = async(payload: { email: string; password: string; }) => {
const {email,password}=payload

const isEmailAlreadyExist = await User.findOne({email})
if(isEmailAlreadyExist?.email){
    throw new AppError("Email already exist",409)
}


const hashedPassword = await bcrypt.hash(password, 10)


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
      throw new AppError("Invalid credentials",403);
    }
  
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new AppError("Invalid credentials",403);
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