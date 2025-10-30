import { EmptyDemo } from "@/components/empty";
import { Spinner } from "@/components/ui/spinner";
import { useUserTasks } from "@/features/tasks/useCurrentUserTask";
import { Checkbox } from "@radix-ui/react-checkbox";
import { endOfDay, formatISO } from "date-fns";
import { Calendar, ChevronRight, CircleCheckBig, CloudAlert } from "lucide-react";
import { useState } from "react";

function Work() {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    
    const {tasks, isPending} = useUserTasks()
    const numOfWork = tasks?.data.filter(task => task.lists === 'work')

    if(isPending) return <Spinner/>

    return (
        <main className="min-h-screen p-4 md:p-0 flex-1 flex flex-col justify-start items-start gap-4 md:w-full text-[#1a1a1a]">
            <div className="flex gap-4 items-center">
                <h1 className="text-3xl font-bold">Work</h1>
                <span className="py-1 p-3 border rounded font-semibold">{numOfWork?.length}</span>
            </div>

            {/* //list existing task for the current day  */}
            {numOfWork?.length === 0 ? (
                    <div className="mx-auto w-full">
                        <EmptyDemo setModalOpen={setIsDialogOpen} />
                    </div>
                ) : (<ul className="w-full flex flex-col gap-2">
                {numOfWork?.map((task) => (
                    <li key={task.id}>
                        <button
                            // onClick={() => handleTaskClick(task.id.toString())}
                            className="border-b w-full text-start cursor-pointer p-2 rounded flex flex-col gap-2 text-sm text-[#1a1a1a] hover:bg-[#eceeef] transition-colors duration-300"
                        >
                            <div className="flex justify-between">
                                <span className="self-end flex items-center gap-2">
                                    <Checkbox asChild />
                                    {task.tasks}
                                </span>
                                <ChevronRight width={16} />
                            </div>
                            <div className="flex gap-2 items-center ml-8 text-[12px]">
                                <span className="flex items-center gap-2 border-r pr-3">
                                    <Calendar width={16} />
                                    <span className="">{formatISO(endOfDay(task?.expiry_at))}</span>
                                </span>
                                <span className="flex items-center gap-2 border-r pr-3">
                                    {task?.completed ? <CircleCheckBig width={16} /> : <CloudAlert width={16} />}
                                    <span className="text-secBackground font-bold">{task?.completed ? 'Completed' : 'Pending'}</span>
                                </span>
                                <span className="flex items-center gap-2">
                                    <div
                                    className={`w-[12px] h-[12px] rounded ${
                                        task?.lists === "personal"
                                        ? "bg-[#e53e3e]"
                                        : "bg-[#38b2ac]"
                                    }`}
                                    />
                                    {task?.lists}
                                </span>
                            </div>
                        </button>
                    </li>
                ))}
                </ul>)}
        </main>
    )
}

export default Work;