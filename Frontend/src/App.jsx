import { useEffect, useState } from "react";
import "./App.css";
import { destructureDate } from "./utils/date";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import { Button } from "./components/ui/button";
import { Edit, Loader2, LogIn, Plus, Trash2 } from "lucide-react";
import { Checkbox } from "./components/ui/checkbox";
import { Label } from "./components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { useAddTodoMutation } from "./features/api/todoApi";
import { toast } from "sonner";
// ✅ Sample todos with unique `id`
const initialTodos = [
  {
    id: 1,
    title: "Buy groceries",
    description: "Milk, Bread, Eggs, and Vegetables",
    isread: 0,
  },
  {
    id: 2,
    title: "Finish project report",
    description: "Complete and submit the final draft by Monday",
    isread: 1,
  },
  {
    id: 3,
    title: "Doctor appointment",
    description: "Annual health checkup at 10 AM",
    isread: 0,
  },
  {
    id: 4,
    title: "Call mom",
    description: "Weekly call to catch up and share updates",
    isread: 0,
  },
  {
    id: 5,
    title: "Read new book",
    description: "Start reading 'Atomic Habits' this weekend",
    isread: 1,
  },
];

const result = destructureDate(new Date());
function App() {
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
      setTimeout(() => {
        window.location.reload();
      }, 700);
    } catch (error) {
      console.log(error);
      toast.error(err?.data?.message || err?.data?.errors?.[0]?.msg || "Something went wrong");
    }
  };
  // -------------------------------------------------------------------------------------
  const [todos, setTodos] = useState(initialTodos);
  // ✅ Mock API request function
  const updateReadStatus = async (id, isread) => {
    try {
      // Optimistically update state
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, isread } : todo))
      );
    } catch (error) {
      console.error("Failed to update read status:", error);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-center font-bold text-2xl md:text-3xl font-winky tracking-normal text-blue-600 m-3">
          Daily Todos List
        </h1>
      </div>

      <Card className="md:w-[50%] sm:mx-auto mx-2 relative">
        <CardHeader>
          <div className="flex justify-between items-center ">
            <h2 className="md:text-3xl text-2xl font-nunito text-indigo-500">
              <span className="font-bold">{result.weekday}</span>,{" "}
              <span className="font-semibold">{result.day}th</span>
            </h2>
            <p className="text-muted-foreground md:text-lg text-base">
              <span className="font-semibold">{todos.length}</span> Tasks
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
                  className="cursor-pointer"
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

        <CardContent>
          {todos.map((todo) => (
            <Card key={todo.id} className="md:p-4 my-2">
              <div className="flex justify-between items-center mx-4">
                <div className="flex gap-6 mr-2 items-center">
                  <Checkbox
                    className="cursor-pointer"
                    checked={!!todo.isread}
                    onCheckedChange={(checked) =>
                      updateReadStatus(todo.id, checked ? 1 : 0)
                    }
                  />
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
                  <Button
                    size="icon"
                    className="cursor-pointer p-0"
                    variant="outline"
                  >
                    <Edit />
                  </Button>
                  <Button variant="destructive" className="cursor-pointer">
                    <Trash2 />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>
    </>
  );
}

export default App;
