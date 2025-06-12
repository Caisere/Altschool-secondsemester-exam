import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEachTodo } from "../api/apiCall";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
import { TodoEditForm } from "@/components";
import { getLocalTodoById } from "../utils/localStorage";

const Todo = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { id } = useParams();

  const {
    data: eachTodo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todo", id],
    queryFn: async () => {
      // Check if it's a local todo first
      if (id.startsWith("local-")) {
        const localTodo = getLocalTodoById(id);
        if (!localTodo) throw new Error("Todo not found");
        return localTodo;
      }
      // If not local, fetch from API
      return getEachTodo(id);
    },
  });

  // const [editTodo, setEditTodo] = useState(eachTodo?.title);
  // const navigate = useNavigate();

  // console.log(id);

  // const handleBack = () => {
  //     navigate(-1);
  // }

  function handleEdit(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsEditOpen((is) => !is);
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="min-h-screen w-full h-full flex flex-col gap-4 justify-center items-center flex-1 md:flex md:flex-col md:justify-center md:items-center md:w-full md:relative md:flex-1 md:left-[10%] md:gap-4">
            <h1 className="text-2xl font-bold">Todo Details</h1>
            <Card className="w-full max-w-[60%]">
                <CardHeader>
                    <CardTitle>{eachTodo.todo}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>User ID: {eachTodo.userId}</CardDescription>
                    <p>Completed: {eachTodo.completed ? "Yes" : "No"}</p>
                    {/* <p className="text-sm text-muted-foreground mt-2">
                        {id.startsWith("local-") ? "(Stored locally)" : "(From API)"}
                    </p> */}
                </CardContent>
            </Card>
            <div className="flex justify-center items-center gap-4">
                <Link role="link" aria-label="Back Link" to="/">
                    <Button role="button" aria-label="Back Button" className="bg-black/70 hover:bg-black text-white px-4 py-2 rounded-md cursor-pointer">
                        Back
                    </Button>
                </Link>
                <Button
                    role="button"
                    aria-label="Edit Todo Button"
                    className="bg-secBackground cursor-pointer hover:bg-secBackground/80 hover:text-gray text-white px-4 py-2 rounded-md transition-all duration-300"
                    onClick={handleEdit}
                >
                    {isEditOpen ? "Cancel Edit" : "Edit Todo"}
                </Button>
            </div>
            {isEditOpen && (
                <TodoEditForm todo={eachTodo} setIsEditOpen={setIsEditOpen} />
            )}
        </div>
    );
};

export default Todo;
