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


// make ready for deployment 
// setting in a way, where when we run the backend, our frontend will run auto inside the backend. 

if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    });
    // any route other than the defined above, will hit the *; 
}


app.listen(process.env.PORT || 4044, ()=>{
    console.log("Server is listening on PORT 4044"); 
}); 