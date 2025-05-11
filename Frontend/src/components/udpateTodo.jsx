import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  useGetTodoByIdQuery,
  useUpdateTodoMutation,
} from "@/features/api/todoApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const UdpateTodo = () => {
  const navigate = useNavigate();
  const { todoId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [updateTodo, { isLoading }] = useUpdateTodoMutation();

  const { data } = useGetTodoByIdQuery(todoId);

  console.log(data);

  useEffect(() => {
    if (data?.todo) {
      setFormData({
        title: data?.todo?.title,
        description: data?.todo?.description,
      });
    }
  }, [data]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateTodo = async (e) => {
    e.preventDefault();
    try {
      const updatedTodo = await updateTodo({
        title: formData.title,
        description: formData.description,
        todoId,
      }).unwrap();
      toast.success(updatedTodo.message || "Todo updated successfully.");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message ||
          error?.data?.errors?.[0]?.msg ||
          "Something went wrong"
      );
    }
  };
  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Edit your task below.
                </CardTitle>
                <CardDescription className="font-winky">
                  Make your changes and click{" "}
                  <span className="font-semibold">Save</span> to update the
                  todo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateTodo}>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="title">Title</Label>
                    </div>
                    <Input
                      name="title"
                      type="text"
                      placeholder="Go to grocery"
                      required
                      value={formData.title}
                      onChange={handleChange}
                    />
                    <div className="flex items-center">
                      <Label htmlFor="title">Description</Label>
                    </div>
                    <Input
                      name="description"
                      type="text"
                      placeholder="Buy egg, chips, books"
                      required
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mt-4  flex justify-end gap-3 ">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-indigo-500 hover:bg-indigo-700  "
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin" />
                        </>
                      ) : (
                        "Update"
                      )}
                    </Button>
                    <Link to="/">
                      <Button variant="secondary" className="cursor-pointer">
                        Cancel
                      </Button>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default UdpateTodo;
