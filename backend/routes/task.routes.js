import express from "express";
import { 
  createTask, 
  updateTaskStatus, 
  getTasksForAnalysis } from "../controllers/task.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(protectRoute); 


router.post("/", createTask);
router.patch("/:id", updateTaskStatus);
router.get("/", getTasksForAnalysis);

export default router;