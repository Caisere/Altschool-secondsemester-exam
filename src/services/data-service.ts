import { getCurrentUser } from "./ApiAuth"
import supabase from "./supabase"
import type { CreateTaskType } from "@/types"


export async function getTasksByCurrentUser() {
    const currentUser = await getCurrentUser() 
    if (!currentUser) return null


    const { data: { user } } = await supabase.auth.getUser()
    const user_Id = user?.id

    const { data: tasks, error } = await supabase
    .from('tasks')
    .select("*")
    .eq('user_id', user_Id)

    if (error) {
        throw new Error('No task found for this user')
    }

    return {tasks}
}


export async function createTaskForCurrentUser(newTask:CreateTaskType) {
    // check for active logged in user
    const currentUser = await getCurrentUser() 
    if (!currentUser) return null

    // get currently login in user data
    const { data: { user } } = await supabase.auth.getUser()
    const user_Id = user?.id

    const fullTask = {...newTask, user_id: user_Id}

    const { data, error } = await supabase
        .from('tasks')
        .insert([
            fullTask
        ])
        .select()

    if (error) {
        throw new Error("Can't create task right now, Please try again later")
    }

    return data
}

