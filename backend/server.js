import express from "express";
import dotenv from "dotenv";
import connectToDB from "./db/config/connection.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser"; 

dotenv.config(); 
const app = express(); 

// DB connection
connectToDB(); 

app.use(express.json()); 
app.use(cookieParser());
app.use("/api/auth", authRoutes); 

app.listen(process.env.PORT || 4044, ()=>{
    console.log("Server is listening on PORT 4044"); 
}); 