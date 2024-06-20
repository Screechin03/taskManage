"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Task } from "../models/taskModel";
import connectDB from "@/lib/db";

//Task Actions

export const addTask = async (formData: FormData) => {
  const { title, description, taskLevel, taskStatus, priorityLevel, dueDate } =
    Object.fromEntries(formData);

  try {
    await connectDB();
    const newTask = new Task({
      title,
      description,
      taskLevel,
      taskStatus,
      priorityLevel,
      dueDate,
    });
    await newTask.save();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add new task");
  }
  revalidatePath("/home/tasks");
  redirect("/home/tasks");
};

export const getUserTasks = async () => {
  try {
    await connectDB();
    const tasks = await Task.find();
    return tasks;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get tasks");
  }
};

export const getSingleTask = async (id: FormData) => {
  try {
    await connectDB();
    const task = await Task.findById(id);
    return task;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get requested task");
  }
};

export const updateUserTask = async (formData: FormData) => {
  const {
    id,
    title,
    description,
    taskLevel,
    taskStatus,
    priorityLevel,
    dueDate,
  } = Object.fromEntries(formData);

  try {
    await connectDB();
    const updateTask = {
      title,
      description,
      taskLevel,
      taskStatus,
      priorityLevel,
      dueDate,
    };

    const filteredUpdateTask = Object.fromEntries(
      Object.entries(updateTask).filter(
        ([_, value]) => value !== "" && value !== undefined
      )
    );

    await Task.findByIdAndUpdate(id, filteredUpdateTask);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add new task");
  }
  revalidatePath("/home/tasks");
  redirect("/home/tasks");
};

export const deleteUserTask = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectDB();

    await Task.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete task");
  }
  revalidatePath("/home/tasks");
  redirect("/home/tasks");
};
