import { model, Schema } from "mongoose";

const todoSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    isread: {
      type: Number,
      default: 0,
    },
  },
  { strict: true, timestamps: true }
);

export const todoModel = model("Todo", todoSchema);
