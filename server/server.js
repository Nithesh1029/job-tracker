import express from "express"
import cors from 'cors'
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/authRoute.js"
import { getUser } from "./middleware/userAuth.js"
import jobRouter from "./routes/jobRoute.js"


dotenv.config()
connectDb();
const app = express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())






app.use('/api/job',jobRouter)
app.use('/api/auth',authRouter);
const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Connected on ${port}`)
})