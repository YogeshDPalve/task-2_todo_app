import { Router } from "express";
import {
  addTodoValidation,
  todoIdValidation,
  updateTodoValidation,
} from "../validations/validationMiddleware";
import { ValidationChain } from "express-validator";
import {
  addTodo,
  getTodoById,
  getTodos,
  removeTodo,
  updateStatus,
  updateTodo,
} from "../controllers/todo.controller";

const router: Router = Router();

router.get("/list", getTodos);
router.get("/", getTodoById);
router.post("/add", addTodoValidation as ValidationChain[], addTodo);
router.post(
  "/update-status/:todoId",
  todoIdValidation as ValidationChain[],
  updateStatus
);
router.put("/update", updateTodoValidation as ValidationChain[], updateTodo);
router.delete(
  "/remove/:todoId",
  todoIdValidation as ValidationChain[],
  removeTodo
);

export default router;
