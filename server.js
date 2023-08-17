import express from 'express'
import './config/DB.js';
import dotenv from 'dotenv';
import router from './routes/userRoute.js';
import cors from 'cors'
dotenv.config();


const app=express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(
    cors({
        origin:[process.env.CORS_URL],
        methods:["GET","POST","DELETE","PUT","PATCH"],
        credentials:true,
    })
    )
app.use((req,res,next)=>{
    res.set("Cahe-Control","no-store");
     next();
    })

app.use('/',router)

const port= process.env.PORT
app.listen(port,()=>{
    console.log(`Server is running at  http://localhost:${port}`)
})