import { param, body, validationResult } from "express-validator";

import { Request, Response, NextFunction } from "express";

export const todoIdValidation = [
  param("todoId").notEmpty().withMessage("Todo id is required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];
export const updateTodoValidation = [
  body("todoId").notEmpty().withMessage("Todo id is required"),
  body("title").notEmpty().withMessage("Todo title is required"),
  body("description").notEmpty().withMessage("Todo description is required"),

  (req: Request, res: Response, next: NextFunction) => {
    console.log("From validation");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];
export const addTodoValidation = [
  body("title").notEmpty().withMessage("Todo title is required"),
  body("description").notEmpty().withMessage("Todo description is required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];
