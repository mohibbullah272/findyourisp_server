
import jwt from "jsonwebtoken";

export const generateToken = async(payload:object)=>{
    return jwt.sign(payload,process.env.JWT_SECRET as string,{
        expiresIn: "30d",
    })
}