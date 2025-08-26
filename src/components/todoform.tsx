import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLocalTodo } from "../utils/localStorage";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { usePageContext } from "../context/PageContext";
import type { TodoInfo } from "../types";

type TodoFormProps = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type TodoFormContext = {
    previousTodos? : TodosResponse
}

interface TodosResponse {
    data: TodoInfo[];
}

interface FormData {
    'add-todo': string
}


const TodoForm = ({ setIsOpen }: TodoFormProps) => {
    const queryClient = useQueryClient();
    const {pageParam} = usePageContext();
    const { register, handleSubmit, reset, formState } = useForm<FormData>();
    const { errors } = formState;

    const { mutate: addTodoMutation, isPending } = useMutation({
        mutationFn: addLocalTodo,
        onMutate: async (newTodo): Promise<TodoFormContext> => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ["todos"] });

            // Get the current todos for the first page
            const previousTodos = queryClient.getQueryData<TodosResponse>(["todos", pageParam]) as TodosResponse;

            // Optimistically update the cache with the new local todo
            if (previousTodos) {
                const addedTodo = {
                    ...newTodo,
                    id: "temp-id", // Will be replaced by the actual local ID
                };
                queryClient.setQueryData(["todos", pageParam], {
                    ...previousTodos,
                    data: [addedTodo, ...previousTodos.data],
                });
            }
            return { previousTodos };
        },
        onError: (error, newTodo, context: TodoFormContext | undefined) => {
            if (context?.previousTodos) {
                queryClient.setQueryData(["todos", pageParam], context.previousTodos);
            }
            toast.error("Failed to add todo: " + error.message);
        },
        onSuccess: (newTodo) => {
            // Update the cache with the actual local todo (with proper ID)
            const previousTodos = queryClient.getQueryData<TodosResponse>(["todos", pageParam]);
            if (previousTodos) {
                queryClient.setQueryData(["todos", pageParam], {
                    ...previousTodos,
                    data: previousTodos.data.map((todo) =>
                        todo.id === "temp-id" ? newTodo : todo
                    ),
                });
            }
            toast.success("Todo added successfully");
        },
    });

    function onSubmit (data: FormData){
        // new todo object
        const newTodo = {
            todo: data["add-todo"] as string ,
            completed: false,
            userId: 1,
        };
        // mutate function
        addTodoMutation(newTodo);
        reset(); // form reset
        setIsOpen(false);
    }

    function onError() {
        toast.error("Failed to add todo");
    }

    return (
        <form
            role="form"
            aria-label="Add Todo Form"
            onSubmit={handleSubmit(onSubmit, onError)}
            className="flex flex-col gap-2 w-[90%] max-w-full items-center rounded-2xl shadow-lg border border-border p-6 mb-8 md:w-[60%] "
        >
            {/* <label htmlFor="add-todo">Add a new todo</label> */}
            <div className="flex flex-col gap-2 w-full">
                <Input
                    role="textbox"
                    aria-label="Add Todo Input"
                    className="flex-1 border border-gray-200 rounded-md p-2 w-full focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-secBackground"
                    type="text"
                    placeholder="Add a new todo"
                    // name="add-todo"
                    {...register("add-todo", { required: "Todo is required" })}
                />
                {errors?.["add-todo"]?.message && <p className="text-red-500">{errors["add-todo"].message}</p>}
            </div>
            <Button
                role="button"
                aria-label="Add Todo Button"
                disabled={isPending}
                className="bg-secBackground hover:bg-secBackground/80 hover:text-gray transition-all duration-300 text-white px-4 py-2 rounded-md text-center cursor-pointer"
                type="submit"
            >
                {isPending ? <Loader2 className="animate-spin" /> : "Add Todo"}
            </Button>
        </form>
    );
};

export default TodoForm;
