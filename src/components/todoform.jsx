import React from 'react'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {addTodo} from '../api/apiCall'
import toast from 'react-hot-toast'

const TodoForm = ({setIsOpen}) => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset } = useForm();
    
    const {mutate: addTodoMutation} = useMutation({
        mutationFn: addTodo,
        onError: (error) => {
            // queryClient.setQueryData(['todos'], (oldData) => oldData);
            toast.error('Failed to add todo', error.message);
            console.log(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos']});
            toast.success('Todo added successfully');
        }
    })

    function onSubmit(data) {
        const newTodo = {
            title: data['add-todo'],
            completed: false,
            userId: 1
        }
        console.log(newTodo);
        addTodoMutation(newTodo);
        reset();
        setIsOpen(false);
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-[90%] max-w-full items-center rounded-2xl shadow-lg border border-border p-6 mb-8 md:w-[60%] ">
            {/* <label htmlFor="add-todo">Add a new todo</label> */}
            <input className='flex-1 border border-gray-200 rounded-md p-2 w-full' type="text" placeholder="Add a new todo" name="add-todo" {...register('add-todo')}/>
            <Button className="bg-secBackground hover:bg-secBackground/70 text-white px-4 py-2 rounded-md text-center" type="submit">Add</Button>
        </form>
    )
}

export default TodoForm;