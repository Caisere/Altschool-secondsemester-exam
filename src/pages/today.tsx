import { Calendar, ChevronRight, CircleCheckBig, CloudAlert, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tasksList } from "@/contants/contants";
import { useNavigate, useLocation } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawer } from "@/components/ui/drawer";
import TaskDetail from "@/components/taskdetail";
import { useState, useEffect } from "react";

function Todays() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

    // Check if we're viewing a task
    useEffect(() => {
        const pathParts = location.pathname.split("/");
        const taskId = pathParts[pathParts.length - 1];

        if (pathParts.includes("task") && taskId && taskId !== "today") {
        setSelectedTaskId(taskId);
        setIsDrawerOpen(true);
        } else {
        setIsDrawerOpen(false);
        setSelectedTaskId(null);
        }
    }, [location.pathname]);

    console.log(selectedTaskId)

    const handleTaskClick = (taskId: string) => {
        navigate(`/dashboard/today/task/${taskId}`);
    };

    const handleCloseDrawer = () => {
        navigate("/dashboard/today");
    };

    return (
        <>
            <main className="min-h-screen p-4 md:p-0 flex-1 flex flex-col justify-start items-start gap-4 md:w-full text-[#1a1a1a]">
                <div className="flex gap-4 items-center">
                    <h1 className="text-3xl font-bold">Today</h1>
                    <span className="py-1 p-3 border rounded font-semibold">5</span>
                </div>

                {/* // create new tasks */}
                <Dialog>
                    <form className="">
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                className="border w-full text-start cursor-pointer p-2 rounded flex gap-2 text-sm items-start"
                            >
                                <span>
                                    <Plus width={16} />
                                </span>
                                <p>Add New Task</p>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add Task</DialogTitle>
                                <DialogDescription>
                                    Input your New Task in the field provided. Click save when
                                    you&apos;re done.
                                </DialogDescription>
                            </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="task">Task*</Label>
                                <Input id="task" name="task" defaultValue="Task" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    name="description"
                                    defaultValue="Description"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="lists">Category*</Label>
                            <Select name="lists">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Lists" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="personal">Personal</SelectItem>
                                    <SelectItem value="work">Work</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>

                {/* //list existing task for the current day  */}
                <ul className="w-full flex flex-col gap-2">
                {tasksList.map((task) => (
                    <li key={task.id}>
                    <button
                        onClick={() => handleTaskClick(task.id.toString())}
                        className="border-b w-full text-start cursor-pointer p-2 rounded flex flex-col gap-2 text-sm text-[#1a1a1a] hover:bg-[#eceeef] transition-colors duration-300"
                    >
                        <div className="flex justify-between">
                        <span className="self-end flex items-center gap-2">
                            <Checkbox asChild />
                            {task.task}
                        </span>
                        <ChevronRight width={16} />
                        </div>
                        <div className="flex gap-2 items-center ml-8 text-[12px]">
                        <span className="flex items-center gap-2 border-r pr-3">
                            <Calendar width={16} />
                            <span className="">{task?.dueDate}</span>
                        </span>
                        <span className="flex items-center gap-2 border-r pr-3">
                            {task?.completed ? <CircleCheckBig width={16} /> : <CloudAlert width={16} />}
                            <span className="text-secBackground font-bold">{task?.completed ? 'Completed' : 'Pending'}</span>
                        </span>
                        <span className="flex items-center gap-2">
                            <div
                            className={`w-[12px] h-[12px] rounded ${
                                task?.list === "Personal"
                                ? "bg-[#e53e3e]"
                                : "bg-[#38b2ac]"
                            }`}
                            />
                            {task?.list}
                        </span>
                        </div>
                    </button>
                    </li>
                ))}
                </ul>
            </main>

            {/* Task Detail Drawer */}
            <Drawer
                isOpen={isDrawerOpen}
                onClose={handleCloseDrawer}
                title="Task Details"
                className="bg-[#f5f6f7]"
            >
                {selectedTaskId && (
                <TaskDetail taskId={selectedTaskId} onClose={handleCloseDrawer} />
                )}
            </Drawer>
        </>
    );
}

export default Todays;
