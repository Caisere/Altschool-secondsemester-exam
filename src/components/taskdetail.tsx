import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Tag } from "lucide-react";
import { useCurrentUserTask } from "@/features/tasks/useCurrentUserTask";
import { useDeleteTask } from "@/hooks/useDeleteTask";
import { Spinner } from "./ui/spinner";

interface TaskDetailProps {
    taskId: string;
    onClose: () => void;
}

const TaskDetail = ({ taskId, onClose }: TaskDetailProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const {tasks} = useCurrentUserTask();
    const {deleteTask, isDeleting} = useDeleteTask()


    const individualTask = tasks?.tasks.filter(task => task.id === Number(taskId))

    const handleSave = () => {
        // Implement save logic here
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div className="p-4 flex flex-col gap-4">
            {individualTask?.map(task => (
                <div key={task.id} className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className={`px-6 py-1 rounded text-white ${task.completed ? "bg-[#38b2ac]"
                                : "bg-[#2d3748]"}`}>
                            {task.completed ? 'Completed' : 'In-Progress'}
                        </div>
                        {
                            !task.completed &&  
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-[#ecc94b]"
                                    onClick={() => setIsEditing(!isEditing)}
                                >
                                    {isEditing ? "Cancel" : "Edit"}
                                </Button>
                            </div>
                        }
                    </div>

                    {/* Editing task */}
                    {isEditing ? (
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={task.tasks}
                                // onChange={(e) => setTask({ ...task, title: e.target.value })}
                            />
                        </div>
                    ) : (
                        <h1 className="text-xl font-bold">{task.tasks}</h1>
                    )}

                    {/* Task Description */}


                    <div className="flex flex-col gap-2">
                        <Label htmlFor="title">Description</Label>
                        {isEditing ?
                            <Input
                                id="title"
                                value={task.description}
                                // onChange={(e) => setTask({ ...task, title: e.target.value })}
                            />
                            : 
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                        }
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        <Label htmlFor="title" className="flex items-center gap-2">
                            <Calendar width={16} />
                            <span>Due Date:</span>
                        </Label>
                        {isEditing ?
                            <Input
                                type="date"
                                id="title"
                                value={task.expiry_at}
                                // onChange={(e) => setTask({ ...task, title: e.target.value })}
                            />
                            : 
                            <p className="text-sm text-muted-foreground">{task.expiry_at}</p>
                        }
                    </div>


                    <div className="flex items-center gap-2 text-sm">
                        <Label htmlFor="title" className="flex items-center gap-2">
                            <Tag className="w-4 h-4" />
                            <span className="font-medium">List</span>
                        </Label>
                        
                        {isEditing ? (
                            <select
                                value={task.lists}
                                // onChange={(e) => setTask({ ...task, priority: e.target.value })}
                                className="mt-1 w-full p-2 border rounded-md text-sm"
                            >
                                <option value="Personal">Personal</option>
                                <option value="Work">Work</option>
                            </select>
                        ) : (
                            <p className="text-sm text-muted-foreground mt-1 capitalize">
                                {task.lists}
                            </p>
                        )}
                    </div>

                    {/* Task Details */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Action Buttons */}
                        {isEditing && (
                            <div className="flex gap-2 pt-4 border-t">
                                <Button onClick={handleSave} className="flex-1">
                                    Save Changes
                                </Button>
                                <Button variant="outline" onClick={handleCancel} className="flex-1">
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Delete Action Buttons */}
                        {!isEditing && (
                            <div className="flex gap-2 pt-4">
                                <Button variant='destructive'  className="flex-1" 
                                    onClick={() => {
                                        deleteTask(task.id, {
                                            onSettled: () => {
                                                onClose()
                                            }
                                        })
                                    }} 
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? <Spinner/>  : "Delete"}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div> 
    );
};

export default TaskDetail;
