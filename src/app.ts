import { Application, Request, Response } from "express";
import express from 'express';
import cors from 'cors'
import globalErrorHandler from "./middlewares/error";




const app:Application = express()

app.use(cors())
app.use(express.json())




app.get("/healthz", (req:Request,res:Response) => {
    res.send("ok");
  });
  
app.get('/',async(req:Request,res:Response)=>{
    res.send(`Welcome to find your isp server`)
})


app.use(globalErrorHandler);



export default app



