import { Plus } from "lucide-react";
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
import { type Dispatch, type SetStateAction } from "react";
import type { CreateTask } from "@/types";
import {Controller, useForm } from "react-hook-form";
import { useCreateTask } from "@/features/tasks/useCreateTask";
import { Spinner } from "./ui/spinner";

type DialogComponentProps = {
    isDialogOpen?: boolean,
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

function DialogComponent({isDialogOpen, setIsDialogOpen}:DialogComponentProps) {
    // const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const {register, handleSubmit, control, reset, formState: {errors}} = useForm<CreateTask>()
    
    const {createTask, isCreatingTask, error} = useCreateTask()



    function handleTaskSubmit(data: CreateTask) {
        const newTask = {
            ...data,
            expiry_at: new Date(data.expiry_at).toISOString(),
            created_at: new Date().toISOString(),
            completed: false
        }
        createTask(newTask, {
            onSuccess: () => {
                reset()
                setIsDialogOpen(false) 
            }   
        })
    }  

    return (
        <div className="w-full">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="border justify-baseline w-full cursor-pointer p-2 rounded flex gap-2 text-sm"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        <span>
                            <Plus width={16} />
                        </span>
                        <p>Add New Task</p>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleTaskSubmit)}>
                        {/* dialog header */}
                        <DialogHeader>
                            <DialogTitle>Add Task</DialogTitle>
                            <DialogDescription>
                                Input your New Task in the field provided. Click save when
                                you&apos;re done.
                            </DialogDescription>
                        </DialogHeader>
                        {/* Task */}
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="task">Task*</Label>
                                <Input id="task" placeholder="Task" {...register('tasks', {required: 'Task is required'})} />
                                {errors?.tasks && <p className="text-red-500 text-[12px]">{errors.tasks.message}</p>}
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    {...register('description')}
                                    placeholder="Description"
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="description">Expires In</Label>
                                <Input
                                    id="expiry_at"
                                    {...register('expiry_at', {required: 'Task Due Date is required'})}
                                    type="date"
                                    // disabled
                                />
                                {errors?.expiry_at && <p className="text-red-500 text-[12px]">{errors.expiry_at.message}</p>}
                            </div>
                        </div>
                        {/* categories */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="lists">Category*</Label>
                            <Controller
                                name="lists"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Lists" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="personal">Personal</SelectItem>
                                            <SelectItem value="work">Work</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isCreatingTask}>{isCreatingTask ?<Spinner/> : "Create Task"}</Button>
                        </DialogFooter>
                    </form>
                    {error?.message && <p>{error?.message}</p>}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DialogComponent;
