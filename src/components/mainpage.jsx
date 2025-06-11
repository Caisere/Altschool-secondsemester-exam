import React, { useState } from "react";
import { TodoForm, Todos } from "../components";
import { Button } from "@/components/ui/button";



const MainPage = () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className="min-h-screen p-4 flex-1 md:flex md:flex-row md:justify-center md:items-center md:w-full md:relative md:flex-1 md:left-[10%]">
                <div className="max-w-full mx-auto pt-8 flex flex-col items-center gap-4">
                    {/* Header */}
                    <div className="text-center mb-12 animate-fade-in">
                        <h1 className="text-5xl font-bold text-foreground mb-4 tracking-tight">My Todo App</h1>
                        <p className="text-muted-foreground text-lg">Organize your thoughts, accomplish your goals</p>

                        {/* Stats */}
                        <div className="flex justify-center gap-8 mt-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">6</div>
                                <div className="text-sm text-muted-foreground">Active</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-500">9</div>
                                <div className="text-sm text-muted-foreground">Completed</div>
                            </div>
                        </div>
                    </div>
                    <Button
                        onClick={() => setIsOpen(!isOpen)}
                        className="bg-secBackground hover:bg-secBackground/70 text-white px-4 py-2 rounded-md "
                    >
                        Add Todo
                    </Button>

                    {isOpen && <TodoForm setIsOpen={setIsOpen} />}
                    <Todos />
                </div>
            </div>
        )
}

export default MainPage