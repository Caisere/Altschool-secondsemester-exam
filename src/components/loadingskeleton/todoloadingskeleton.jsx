import React from "react";
import { Skeleton } from "../ui/skeleton";

const TodoLoadingSkeleton = () => {
  return (
        <div>
            <ul className="flex flex-col gap-2 w-[80%] md:max-w-[70%]">
                <div className="flex items-center justify-between w-full border border-gray-200 p-2 rounded-md">
                <Skeleton className="h-4 w-4 rounded-full className='mx-2'" />
                <Skeleton className="flex flex-1 items-center justify-start w-full gap-2" />
                <Skeleton className="h-4 w-4 rounded-md" />
                </div>
            </ul>
        </div>
    );
};

export default TodoLoadingSkeleton;
