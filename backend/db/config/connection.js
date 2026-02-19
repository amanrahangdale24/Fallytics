import mongoose from "mongoose";
import { ENV } from "../../utils/env.js";

const connectToDB = ()=>{
    try {
        mongoose.connect(ENV.MONGO_URI_PUBLIC).then(()=>{
            console.log("connected to DB")
        })
    } catch (error) {
        console.log("error occurred while connectiong to db") ;
    }
}

export default connectToDB; 
