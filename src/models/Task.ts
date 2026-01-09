import { model, Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const taskModel = model("Task", taskSchema);
