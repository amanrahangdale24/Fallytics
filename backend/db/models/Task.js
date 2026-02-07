import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    taskName: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      default: "General"
    },

    plannedDate: {
      type: Date,
      required: true
    },

    plannedTime: {
      type: String, // e.g. "9:00 PM"
      required: true
    },

    duration: {
      type: Number, // in minutes
      default: 60
    },

    status: {
      type: String,
      enum: ["planned", "done", "missed"],
      default: "planned"
    },

    reason: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;