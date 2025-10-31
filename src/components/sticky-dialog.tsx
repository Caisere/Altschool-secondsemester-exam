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
import { type Dispatch, type SetStateAction } from "react";
import type { StickyNote } from "@/types";
import { useForm } from "react-hook-form";
import { useStickyNote } from "@/features/tasks/useCreateTask";
import { Spinner } from "./ui/spinner";
import { Textarea } from "./ui/textarea";

type DialogComponentProps = {
    isDialogOpen?: boolean,
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

function StickyDialog({isDialogOpen, setIsDialogOpen}:DialogComponentProps) {
    // const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const {register, handleSubmit, reset, formState: {errors}} = useForm<StickyNote>()
    
    const {createStickyNote, isCreatingStickyNote, error} = useStickyNote()



    function handleTaskSubmit(data: StickyNote) {
        const newTask = {
            ...data,
        }
        createStickyNote(newTask, {
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
                        <p>Add New Sticky Note</p>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleTaskSubmit)}>
                        {/* dialog header */}
                        <DialogHeader>
                            <DialogTitle>Add Task</DialogTitle>
                            <DialogDescription>
                                Input your New Sticky-Note Title and Content in the field provided. Click Create Sticky-Note when
                                you&apos;re done.
                            </DialogDescription>
                        </DialogHeader>
                        {/* Task */}
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="title">Title*</Label>
                                <Input id="title" placeholder="Title" {...register('title', {required: 'Title is required'})} />
                                {errors?.title && <p className="text-red-500 text-[12px]">{errors.title.message}</p>}
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="content">Description</Label>
                                <Textarea
                                    id="content"
                                    {...register('content')}
                                    placeholder="Stick-Note Content"
                                />
                                <p className="text-[12px] italic text-stone-500">Note: Every Full-Stop (.) create a list of task on the Stick-Note.</p>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isCreatingStickyNote}>{isCreatingStickyNote ?<Spinner/> : "Create Sticky-Note"}</Button>
                        </DialogFooter>
                    </form>
                    {error?.message && <p>{error?.message}</p>}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default StickyDialog;
