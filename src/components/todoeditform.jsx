import React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "../api/apiCall";
import { toast } from "react-hot-toast";

const TodoEditForm = ({ todo, setIsEditOpen }) => {
    const queryClient = useQueryClient();
    const { id, todo: todoText, completed, userId } = todo;
    const [editTodo, setEditTodo] = useState(todoText);
    const [editCompleted, setEditCompleted] = useState(completed);

    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
        todo: todoText,
        completed: completed,
        },
    });
    const { errors } = formState;

    const { mutate: updateTodoMutation, isPending } = useMutation({
        mutationFn: updateTodo,
        onMutate: async ({ id, newTodo }) => {
            // cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ["todo", id] });
            await queryClient.cancelQueries({ queryKey: ["todos"] });

            // cache the previous value of the todo
            const previousTodo = queryClient.getQueryData(["todo", id]);

            // optimistically update the individual todo
            queryClient.setQueryData(["todo", id], {
                ...previousTodo,
                ...newTodo,
                id: id,
            });

            // update in the todos list if it exists in cache
            const todosQueries = queryClient.getQueriesData(["todos"]);
            todosQueries.forEach(([queryKey, data]) => {
                if (data?.data) {
                queryClient.setQueryData(queryKey, {
                    ...data,
                    data: data.data.map((todo) =>
                    todo.id === id ? { ...todo, ...newTodo } : todo
                    ),
                });
                }
            });

            return { previousTodo };
            },
            onError: (err, variables, context) => {
                if (context?.previousTodo) {
                    queryClient.setQueryData(["todo", variables.id], context.previousTodo);
                }
                toast.error("Failed to update todo", err.message);
            },
            onSuccess: () => {
                toast.success("Todo updated successfully");
            },
        });

        function handleCompleted(e) {
            setEditCompleted(e.target.checked);
        }

        function handleEditTodoTitle(e) {
            setEditTodo(e.target.value);
        }

        function onSubmit(data) {
            // console.log(data);
            const newTodo = {
                id: id,
                userId: userId,
                todo: data.todo,
                completed: data.completed,
            };
            console.log(newTodo);
            updateTodoMutation({
                id: id,
                newTodo: newTodo,
            });
            setIsEditOpen(false);
        }

        function onError() {
            toast.error("Failed to update todo from form submission");
        }

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} className=" w-[80%] flex flex-col gap-4 p-4 rounded-md shadow-lg border border-border md:w-[30%]">
            <Input
                role="textbox"
                aria-label="Edit Todo Input"
                type="text"
                value={editTodo}
                name="todo"
                {...register("todo", { required: "Todo is required" })}
                onChange={handleEditTodoTitle}
                placeholder="Edit Todo"
            />
            {errors?.["todo"]?.message && <p className="text-red-500">{errors["todo"].message}</p>}
            <p>User ID: {userId}</p>
            <div className="flex items-center">
                <label htmlFor="completed">Completed</label>
                <Input
                    role="checkbox"
                    aria-label="Completed Checkbox"
                    type="checkbox"
                    id="completed"
                    name="completed"
                    checked={editCompleted}
                    {...register("completed")}
                    onChange={handleCompleted}
                    className="p-0"
                />
            </div>
            <Button
                role="button"
                disabled={isPending}
                aria-label="Save Todo"
                type="submit"
                className="bg-secBackground hover:bg-secBackground/90 hover:text-gray transition-all duration-300 w-[20%] mx-auto text-white px-4 py-2 rounded-md cursor-pointer"
            >
                Save
            </Button>
        </form>
    );
};

export default TodoEditForm;
