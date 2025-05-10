export type UpdateTodo = {
  title: string;
  description: string;
  todoId: string;
};
export type AddTodo = Pick<UpdateTodo, "title" | "description">;
export type TodoId = Pick<UpdateTodo, "todoId">;
