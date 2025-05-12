import express from "express"
import cors from 'cors'
import dotenv from "dotenv"
import connectDB from "./config/db.js"
dotenv.config(); // Load env variables

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to DB
connectDB();
app.use(cors({
    credentials: true,
    origin: "*",

}))
app.use(express.json())
app.get("/", (req,res)=> {
    res.send("Api is running")
})
app.listen(PORT,()=>{
    console.log("Server is running", PORT)
})