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


export async function getUserLists() {
    const currentUser = await getCurrentUser() 
    if (!currentUser) return null


    const { data: { user } } = await supabase.auth.getUser()
    const user_Id = user?.id

    const { data, error } = await supabase
    .from('tasks')
    .select("lists")
    .eq('user_id', user_Id)

    if (error) {
        throw new Error('No task found for this user')
    }

    return {data}
}

export async function deleteTask (id: string) {

    const currentUser = await getCurrentUser() 
    if (!currentUser) return null


    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)

    if (error) {
        throw new Error("Can't delete the selected task at the moment. Please, try again later!")
    }
    return data;
}
