import { model, Schema } from "mongoose";
import { INotify } from "./notification.interface";



const notificationSchema =new Schema<INotify>({
title:{
    type:String,required:true
},
content:{
    type:String,required:true
},
image:{
    type:String, 
},
emails:{
    type:[String]
}

},
{
    collection:"Notification",
    versionKey:false,
    timestamps:true
    
    }
)


const Notification = model<INotify>("Notification",notificationSchema)

export default Notification