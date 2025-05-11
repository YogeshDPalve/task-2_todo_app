import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_API } from "@/constants/constants";

const USER_API = `${BASE_API}/api/v1/todo`;

export const todoApi = createApi({
  reducerPath: "todoApi",
  tagTypes: ["Refetch_todos"],
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    addTodo: builder.mutation({
      query: (todoData) => ({
        url: "/add",
        method: "POST",
        body: todoData,
      }),
      invalidatesTags: ["Refetch_todos"],
    }),
    getTodo: builder.query({
      query: () => ({
        url: "/list",
        method: "GET",
      }),
      providesTags: ["Refetch_todos"],
    }),
    removeTodo: builder.mutation({
      query: (todoId) => ({
        url: `/remove/${todoId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_todos"],
    }),
    updateTodo: builder.mutation({
      query: (updateData) => ({
        url: `/update`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["Refetch_todos"],
    }),
    updateStatus: builder.mutation({
      query: (todoId) => ({
        url: `/update-status/${todoId}`,
        method: "POST",
      }),
      invalidatesTags: ["Refetch_todos"],
    }),
    getTodoById: builder.query({
      query: (todoId) => ({
        url: `/?todoId=${todoId}`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useAddTodoMutation,
  useGetTodoQuery,
  useRemoveTodoMutation,
  useUpdateTodoMutation,
  useGetTodoByIdQuery,
  useUpdateStatusMutation,
} = todoApi;
