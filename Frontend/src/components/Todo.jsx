import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { destructureDate } from "../utils/date";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { Edit, Loader2, Plus, Trash2 } from "lucide-react";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  useAddTodoMutation,
  useGetTodoQuery,
  useRemoveTodoMutation,
  useUpdateStatusMutation,
} from "../features/api/todoApi";
import { toast } from "sonner";
import TodoSkeleton from "../components/TodoSkeleton";
import { Skeleton } from "../components/ui/skeleton";
import { Link } from "react-router-dom";
// ✅ Sample todos with unique `id`

const result = destructureDate(new Date());
function Todo() {
  //! ----- add todo ---------
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [addTodo, { isLoading: addTodoLoading }] = useAddTodoMutation();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const addTodoData = await addTodo(formData).unwrap();
      toast.success(addTodoData.message || "Todo added successfully.");
      setFormData({
        title: "",
        description: "",
      });
      setTimeout(() => {
        window.location.reload();
      }, 700);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message ||
          error?.data?.errors?.[0]?.msg ||
          "Something went wrong"
      );
    }
  };

  //! -------- get todos----------
  const { data: getTodo, isLoading: isTodoLoading } = useGetTodoQuery();
  //!---------remove todo---------
  const [removeTodo, { isLoading: isRemoveTodoLoading }] =
    useRemoveTodoMutation();
  const handleRemoveTodo = async (todoId) => {
    try {
      const removedTodo = await removeTodo(todoId).unwrap();
      toast.success(removedTodo.message || "Todo deleted successfully.");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message ||
          error?.data?.errors?.[0]?.msg ||
          "Something went wrong"
      );
    }
  };
  //!--------- update status ------------
  const [updateStatus, { isLoading: updateStatusLoading }] =
    useUpdateStatusMutation();
  const handleUpdateReadStatus = async (todoId) => {
    console.log("todo id", todoId);
    const status = await updateStatus(todoId);
    console.log(status);
    toast.success(status?.data?.message || "Status updated");
    try {
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message ||
          error?.data?.errors?.[0]?.msg ||
          "Something went wrong"
      );
    }
  };
  // -------------------------------------------------------------------------------------

  return (
    <>
      <div className="text-center ">
        <h1 className="font-bold text-2xl md:text-3xl font-winky tracking-normal text-blue-600 m-3">
          Daily Todos List
        </h1>
        <div className="font-winky text-muted-foreground font-thin text-xs mb-1">
          <p>
            My free instance will spin down with inactivity, which can delay
            requests by 50 seconds or more.
          </p>
          <p> Please wait a while if system takes time to respond.</p>
        </div>
      </div>

      <Card className="lg:w-[50%] md:w-[60%] sm:mx-auto mx-2 relative">
        <CardHeader>
          <div className="flex justify-between items-center ">
            <h2 className="md:text-3xl text-2xl font-nunito text-indigo-500">
              <span className="font-bold">{result.weekday}</span>,{" "}
              <span className="font-semibold">{result.day}th</span>
            </h2>
            <p className="text-muted-foreground md:text-lg text-base flex gap-1 items-center">
              <span className="font-semibold">
                {isTodoLoading ? (
                  <Skeleton className="h-4 w-4" />
                ) : (
                  getTodo.getTodos.length
                )}
              </span>
              Tasks
            </p>
          </div>
          <h4 className="text-xl text-muted-foreground">{result.month}</h4>
        </CardHeader>
        <Separator />
        <Dialog>
          <DialogTrigger asChild>
            <div className=" cursor-pointer h-15 w-15 flex items-center justify-center border rounded-full bg-rose-500 absolute right-10 top-20 ">
              <Plus className="text-white" />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleAddTodo}>
              <DialogHeader>
                <DialogTitle>Add a new task to your list.</DialogTitle>
                <DialogDescription>
                  Fill in the details below and click Save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    name="title"
                    onChange={handleChange}
                    placeholder="go to gym"
                    required
                    value={formData.title}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Milk, Bread, Eggs"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={addTodoLoading}
                  type="submit"
                  className="cursor-pointer "
                >
                  {addTodoLoading ? (
                    <>
                      <Loader2 className="animate-spin" />
                    </>
                  ) : (
                    "Add"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <CardContent className="md:px-6 space-y-1 px-0">
          {isTodoLoading ? (
            <TodoSkeleton />
          ) : (
            getTodo.getTodos.map((todo) => (
              <Card
                key={todo._id}
                className="md:p-4 rounded-none md:rounded-md"
              >
                <div className="flex justify-between items-center mx-4">
                  <div className="flex gap-6 mr-2 items-center">
                    {
                      <Checkbox
                        className="cursor-pointer"
                        checked={!!todo.isread}
                        onCheckedChange={() => handleUpdateReadStatus(todo._id)}
                      />
                    }
                    <div>
                      <Label
                        className={`text-lg font-semibold tracking-wide font-nunito ${
                          todo.isread
                            ? "text-muted-foreground line-through"
                            : "text-stone-900"
                        }`}
                      >
                        {todo.title}
                      </Label>
                      <p
                        className={`text-sm md:text-base ${
                          todo.isread
                            ? "text-muted-foreground "
                            : "text-stone-600"
                        }`}
                      >
                        {todo.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex sm:flex-row flex-col gap-1">
                    <Link to={`/update/${todo._id}`}>
                      <Button
                        size="icon"
                        className="cursor-pointer p-0"
                        variant="outline"
                      >
                        <Edit />
                      </Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          className="cursor-pointer"
                        >
                          <Trash2 />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-xl">
                            Delete Todo
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this task? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleRemoveTodo(todo._id)}
                          >
                            {isRemoveTodoLoading ? (
                              <>
                                <Loader2 className="animate-spin" />
                              </>
                            ) : (
                              "Delete"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default Todo;
