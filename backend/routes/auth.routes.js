import express from "express";
import { signup, login } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router(); 

router.post("/signup",signup)
router.post("/login", login)


// when user refresh it will tell frontend if user is logged in 
router.get("/check", protectRoute, (req,res)=>res.status(200).json(req.user));
export default router; 