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
  }),
});
export const { useAddTodoMutation } = todoApi;
