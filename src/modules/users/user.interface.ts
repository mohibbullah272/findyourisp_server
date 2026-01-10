export type IUser= {
    name?:string;
    email:string;
    password:string;
    photo?:string;
    phone?:string;
    role:UserRole;
    isVerified:boolean;
    isBlocked:boolean;
    isDeleted:boolean;
}

export enum UserRole {
 ADMIN = "ADMIN",
 USER = "USER",
 ISP =  "ISP",
 ISP_MEMBER = "ISP_MEMBER"
}