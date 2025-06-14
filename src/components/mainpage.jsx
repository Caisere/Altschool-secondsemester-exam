import React, { useState } from "react";
import { TodoForm, Todos } from "../components";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../api/apiCall";
import { usePageContext } from "@/context/PageContext";

const MainPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {pageParam} = usePageContext()


    // Fetch todos for stats
    const { data } = useQuery({
        queryKey: ["todos", pageParam], 
        queryFn: () => getTodos(),
    });

    const todos = data?.data || [];
    const activeTodos = todos.filter((todo) => !todo.completed).length;
    const completedTodos = todos.filter((todo) => todo.completed).length;

    return (
        <main className="min-h-screen p-4 flex-1 md:flex md:flex-row md:justify-center md:items-center md:w-full md:relative md:flex-1 md:left-[10%]">
            <section className="max-w-full mx-auto pt-8 flex flex-col items-center gap-4">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-5xl font-bold text-foreground mb-4 tracking-tight">
                        My Todo App
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Organize your thoughts, accomplish your goals
                    </p>

                    {/* Stats */}
                    <div className="flex justify-center gap-8 mt-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary">
                                {activeTodos}
                            </div>
                            <div className="text-sm text-muted-foreground">Active</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-500">
                                {completedTodos}
                            </div>
                            <div className="text-sm text-muted-foreground">Completed</div>
                        </div>
                    </div>
                </div>
                <Button
                    role="button"
                    aria-label="Add Todo Button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-secBackground hover:bg-secBackground/80 hover:text-gray text-white px-4 py-2 rounded-md transition-all duration-300 cursor-pointer"
                >
                    {isOpen ? "Close Form" : "Add Todo"}
                </Button>

                {isOpen && <TodoForm setIsOpen={setIsOpen} />}
                <Todos />
            </section>
        </main>
    );
};

export default MainPage;
