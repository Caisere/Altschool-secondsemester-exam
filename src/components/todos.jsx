import React, { useState } from "react";
import { getTodos } from "../api/apiCall";
import { useQuery } from "@tanstack/react-query";
import { TodoList } from "./index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getLocalTodos } from "../utils/localStorage";
import { usePageContext } from "@/context/PageContext";

const Todos = () => {
    const {pageParam, setPageParam} = usePageContext();
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'completed', 'active'
    const limit = 10;

    const { data, isLoadingTodo, isErrorTodo } = useQuery({
        queryKey: ["todos", pageParam],
        queryFn: async () => {
            const apiResponse = await getTodos(pageParam, limit);
            const localTodos = getLocalTodos();

            // Merge API todos with local todos
            return {
                ...apiResponse,
                data: [...localTodos, ...apiResponse.data],
                total: apiResponse.total + localTodos.length,
            };
        },
    });

    const todos = data?.data;
    const total = data?.total;

    const totalPages = Math.ceil(total / limit);
    // console.log(totalPages);

    // Filter and search todos
    const filteredTodos = todos?.filter((todo) => {
        const matchesSearch = todo.todo
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
        const matchesFilter =
        filterStatus === "all"
            ? true
            : filterStatus === "completed"
            ? todo.completed
            : !todo.completed;
        return matchesSearch && matchesFilter;
    });

    // function to handle previous page
    function handlePrevious(e) {
        e.preventDefault();
        console.log(pageParam);
        setPageParam(pageParam - 1);
    }

    // function to handle Page Change
    function handlePageChange(index) {
        setPageParam(index + 1);
    }

    // function to handle next page
    function handleNext(e) {
        e.preventDefault();
        console.log(pageParam);
        setPageParam(pageParam + 1);
    }

    // if (isLoadingTodo) return <TodoLoadingSkeleton />;
    if (isErrorTodo) return <div className="text-center text-2xl font-bold">Error fetching todos</div>;
    return (
        <div className="w-full flex flex-col items-center gap-4">
            <div className="w-[80%] md:max-w-[70%] flex flex-col gap-4">
                {/* Search Todo Input */}
                <Input
                    role="search"
                    aria-label="Search todos"
                    type="text"
                    placeholder="Search todos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                />
                {/* Filtering */}
                <nav className="flex gap-2 justify-center">
                    {/* All Todos Button */}
                    <Button
                        role="button"
                        aria-label="All Todos"
                        onClick={() => setFilterStatus("all")}
                        className={`${
                        filterStatus === "all" ? "bg-secBackground" : "bg-gray-200"
                        } hover:bg-secBackground/70 text-white px-4 py-2 rounded-md`}
                    >
                        All
                    </Button>
                    {/* Active Todos Button */}
                    <Button
                        role="button"
                        aria-label="Active Todos"
                        onClick={() => setFilterStatus("active")}
                        className={`${
                        filterStatus === "active" ? "bg-secBackground" : "bg-gray-200"
                        } hover:bg-secBackground/70 text-white px-4 py-2 rounded-md`}
                    >
                        Active
                    </Button>
                    {/* Completed Todos Button */}
                    <Button
                        role="button"
                        aria-label="Completed Todos"
                        onClick={() => setFilterStatus("completed")}
                        className={`${
                        filterStatus === "completed" ? "bg-secBackground" : "bg-gray-200"
                        } hover:bg-secBackground/70 text-white px-4 py-2 rounded-md`}
                    >
                        Completed
                    </Button>
                </nav>
            </div>

            {/* Todo List */}
            <ul className="flex flex-col gap-2 w-[80%] md:max-w-[70%]" role="list">
                {filteredTodos?.map((todo) => (
                    <TodoList key={todo.id} todo={todo} pageParam={pageParam} isLoadingTodo={isLoadingTodo} />
                ))}
            </ul>
            {/* Pagination */}
            <div className="flex justify-center items-center gap-6 mt-4 w-full max-w-full md:max-w-[80%]">
                <nav className="flex justify-center items-center flex-wrap gap-2">
                    {/* Previous Pagination Button */}
                    <Button
                        role="button"
                        aria-label="Previous Page"
                        className={`bg-gray-200 px-[10px] py-1 rounded-md text-gray-500 cursor-pointer ${
                        pageParam === 1 ? "" : "hover:bg-secBackground/90 hover:text-white transition-all duration-300"
                        }`}
                        disabled={pageParam === 1}
                        onClick={handlePrevious}
                    >
                        Previous
                    </Button>

                    {/* Pagination button in respect to total pages */}
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <Button
                            role="button"
                            aria-label={`Page ${index + 1}`}
                            className={`${
                                pageParam === index + 1
                                ? "bg-secBackground text-white"
                                : "bg-gray-400"
                            } hover:bg-secBackground/80 hover:text-gray transition-all duration-300 text-white px-[10px] py-[2px] rounded mx-1 cursor-pointer`}
                            key={index}
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(index);
                            }}
                        >
                        {index + 1}
                        </Button>
                    ))}
                    {/* Next Button */}
                    <Button
                        disabled={pageParam === totalPages}
                        role="button"
                        aria-label="Next Page"
                        className={`${
                        pageParam === totalPages
                            ? "bg-secBackground text-gray-500 px-[10px] py-1 rounded-md"
                            : "bg-gray-200 px-[10px] py-1 rounded-md"
                        } hover:bg-secBackground/80 hover:text-gray transition-all duration-300 text-white px-[10px] py-1 rounded-md mx-1 cursor-pointer`}
                        onClick={handleNext}
                    >
                        Next
                    </Button>
                </nav>
            </div>
        </div>
    );
};

export default Todos;
