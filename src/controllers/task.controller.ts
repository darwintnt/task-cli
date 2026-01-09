import { cnx } from "../database.ts";
import { taskModel } from "../models/Task.ts";

export const addTask = async (task: any) => {
  await taskModel.create(task);
  console.log("Task created");
  cnx.close();
};

export const listTasks = async () => {
  const tasks = await taskModel.find().lean();
  cnx.close();
  return tasks;
};

export const deleteTask = async (task: any) => {
  await taskModel.findByIdAndDelete(task._id);
  console.log("Task deleted");
  cnx.close();
};

export const updateTask = async (task: any) => {
  await taskModel.findByIdAndUpdate(task._id, { ...task });
  console.log("Task updated");
  cnx.close();
};

export const search = async (term: string) => {
  const value = new RegExp(term, "i");
  const search = await taskModel.find({
    $or: [{ title: value }, { description: value }],
  });
  cnx.close();
  return search;
};
