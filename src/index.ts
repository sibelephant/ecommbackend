import express,{Express,Request,Response} from "express"
import {PORT} from './secrets'
import rootRouter from "./routes"
import { PrismaClient } from "./generated/prisma"  // Changed import path

const app:Express = express()
app.use(express.json())

app.use('/api',rootRouter)

export const prismaClient = new PrismaClient({
    log:['query']
})

app.listen(PORT, ()=>{
    console.log(`the App is working in  port ${PORT}`);
    
})