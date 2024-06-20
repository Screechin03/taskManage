import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide title to create task"],
    trim: true,
    maxLength: [16, "Task title cannot exceed 15 chars"],
  },
  description: {
    type: String,
    required: [true, "Please provide description about task"],
    maxLength: [150, "Task title cannot exceed 150 chars"],
  },
  taskLevel: {
    type: Number,
    default: "0",
    maxLength: [100],
  },
  taskStatus: {
    type: String,
    default: "Not Started",
  },
  priorityLevel: {
    type: String,
    required: true,
    enum: ["Normal", "High", "Important"],
  },
  dueDate: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Task = mongoose.models?.Task || mongoose.model("Task", taskSchema);
