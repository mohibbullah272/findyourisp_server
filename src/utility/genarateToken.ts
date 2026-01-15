
import jwt from "jsonwebtoken";

export const generateToken = async(payload:object)=>{
    return jwt.sign(payload,process.env.JWT_SECRET as string,{
        expiresIn: "30d",
    })
}

export const verifyToken = (token: string, secret: string) => {

    const verifiedToken = jwt.verify(token, secret);

    return verifiedToken
}