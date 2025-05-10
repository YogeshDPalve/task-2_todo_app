import { Request, Response } from "express";
import { todoModel } from "../models/todo.schema";
import { AddTodo, TodoId, UpdateTodo } from "../constants/interfaces";

export const getTodos = async (req: Request, res: Response): Promise<any> => {
  try {
    const getTodos = await todoModel.find();

    if (!getTodos || getTodos.length === 0) {
      return res.status(400).send({
        success: false,
        message: "Todos not found",
      });
    }
    return res.status(200).send({
      success: true,
      getTodos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Internal server error",
    });
  }
};

export const addTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, description }: AddTodo = req.body;

    if (!title || !description) {
      return res.status(404).send({
        success: false,
        message: "Title and Description are required",
      });
    }
    const todo = await todoModel.create({ title, description });
    if (!todo) {
      return res.status(400).send({
        success: false,
        message: "Error to create todo",
        todo,
      });
    }

    return res.status(201).send({
      success: false,
      message: "Todo added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Internal server error",
    });
  }
};

export const removeTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    const { todoId } = req.params;
    if (!todoId) {
      return res.status(404).send({
        success: false,
        message: "Todo id is required to remove todo",
      });
    }

    const removeTodo = await todoModel.findOneAndDelete({ _id: todoId });

    if (!removeTodo) {
      return res.status(400).send({
        success: false,
        message: "Error to remove todo",
      });
    }

    return res.status(200).send({
      success: false,
      message: "Todo removed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Internal server error",
    });
  }
};

export const updateStatus = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { todoId } = req.params;

    const todo = await todoModel.findById(todoId);
    if (!todo) {
      return res.status(400).send({
        success: false,
        message: "Todo not found",
      });
    }

    const updatedTodo = await todoModel.findByIdAndUpdate(
      todoId,
      { isread: todo.isread === 1 ? 0 : 1 },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(400).send({
        success: false,
        message: "Todo not updated",
      });
    }
    const status = updatedTodo?.isread ? "read" : "un-read";
    return res.status(200).send({
      success: true,
      message: `Todo marked as ${status}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log("from start of controller");
    const { todoId, title, description }: UpdateTodo = req.body;
    const todo = await todoModel.findById(todoId);
    if (!todo) {
      return res.status(400).send({
        success: false,
        message: "Todo not found",
      });
    }
    const updatedTodo = await todoModel.findByIdAndUpdate(todoId, {
      title,
      description,
    });
    return res.status(200).send({
      success: true,
      message: "Todo updated successfully",
      updatedTodo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};
