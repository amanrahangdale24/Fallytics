import Task from "../db/models/Task.js";
import { getAIAnalysis } from '../utils/gemini.js'
import { getDateRange, calculateTaskStats, analyzeMissedReasons, calculateDayWisePerformance, detectPatterns } from "../utils/taskAnalytics.js";


export const createTask = async (req, res) => {
  try {
    const userId = req.user.id; 
    const {
      taskName,
      category,
      plannedDate,
      plannedTime,
      duration
    } = req.body;

    if (!taskName || !plannedDate || !plannedTime || !category || !duration) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const newTask = new Task({
      userId,
      taskName,
      category,
      plannedDate,
      plannedTime,
      duration
    });

    await newTask.save();

    res.status(201).json({
      message: "Task created successfully",
      task: newTask
    });

  } catch (error) {
    console.error("Error in createTask:", error);
    res.status(500).json({
      message: "Failed to create task"
    });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const userId = req.user.id;          // from protect middleware
    const taskId = req.params.id;        // task id from URL
    const { status, reason } = req.body; // done | missed

    if (!["done", "missed"].includes(status)) {
      return res.status(400).json({
        message: "Status must be either 'done' or 'missed'"
      });
    }

    const task = await Task.findOne({
      _id: taskId,
      userId
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    task.status = status;

    if (status === "missed") {
      task.reason = reason || "No reason provided";
    } else {
      task.reason = "";
    }

    await task.save();

    res.status(200).json({
      message: `Task marked as ${status}`,
      task
    });

  } catch (error) {
    console.error("Error in updateTaskStatus:", error);
    res.status(500).json({
      message: "Failed to update task status"
    });
  }
};

export const getTasksForAnalysis = async (req, res) => {
  try {
    const userId = req.user.id;
    const range = req.query.range;

    if (range !== "7days") {
      return res.status(400).json({
        message: "Only 7days is supported"
      });
    }

    const { startDate, endDate } = getDateRange(7);
    const tasks = await Task.find({
      userId,
      plannedDate: { $gte: startDate, $lte: endDate }
    });

    const stats = calculateTaskStats(tasks);
    const missedAnalysis = analyzeMissedReasons(stats.missedTasks);
    const dayWisePerformance = calculateDayWisePerformance(tasks);

    const aiContext = {
      summary: {
        totalTasks: stats.totalTasks,
        completed: stats.doneTasks.length,
        missed: stats.missedTasks.length,
        plannedMinutes: stats.plannedMinutes,
        completedMinutes: stats.completedMinutes,
        consistencyPercentage: stats.consistencyPercentage,
        topMissedReason: missedAnalysis.topMissedReason
      },
      patterns: detectPatterns(stats.doneTasks, stats.missedTasks)
    };

    const aiResponse = await getAIAnalysis(aiContext);

    res.status(200).json({
      range: "Last 7 Days",
      cards: {
        totalTasks: stats.totalTasks,
        completed: stats.doneTasks.length,
        missed: stats.missedTasks.length,
        topMissedReason: missedAnalysis.topMissedReason
      },
      charts: {
        missedReasons: {
          labels: missedAnalysis.labels,
          values: missedAnalysis.percentages
        },
        taskPerformance: dayWisePerformance
      },
      ai: aiResponse
    });

  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({
      message: "Failed to analyze tasks"
    });
  }
};