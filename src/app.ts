import { Application, Request, Response } from "express";
import express from 'express';
import cors from 'cors'
import globalErrorHandler from "./middlewares/error";
import router from "./routes";




const app:Application = express()

app.use(cors())
app.use(express.json())
app.use("/api/v1",router)



app.get("/healthz", (req:Request,res:Response) => {
    res.send("ok");
  });
  
app.get('/',async(req:Request,res:Response)=>{
    res.send(`danger zone please keep 100km distance away this is find your isp server `)
})


app.use(globalErrorHandler);



export default app



