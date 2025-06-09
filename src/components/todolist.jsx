import React from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '../api/apiCall';
import toast from 'react-hot-toast';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button'

const TodoList = ({todo, pageParam}) => {
    const queryClient = useQueryClient();
    const {id, title, completed} = todo;

    const {mutate: deleteTodoMutation} = useMutation({
        mutationFn: deleteTodo,
        onMutate: async (id) => {
            await queryClient.cancelQueries({queryKey: ['todos', pageParam]})

            const previousTodos = queryClient.getQueryData(['todos', pageParam])
            console.log('previousTodos', previousTodos);

            if (previousTodos) {
                queryClient.setQueryData(['todos', pageParam], {
                        ...previousTodos,
                        data: previousTodos?.data?.filter(todo => todo.id !== id)
                    });
            }
            return {previousTodos};
        },
        onError: (error, variables, context) => {
            if (context?.previousTodos) {
                queryClient.setQueryData(['todos'], context.previousTodos);
            }
            toast.error(`Failed to delete todo: ${error.message}`);
        },
        onSuccess: () => {
            toast.success('Todo deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['todos', pageParam] })
        }
    })

    function handleDelete(e) {
        e.preventDefault();
        e.stopPropagation();
        deleteTodoMutation(id);
        console.log('deleting todo', id);
    }



    // function handleEdit(e) {
    //     e.preventDefault();
    //     console.log(todo.id);
    // }

    return (
        <li className='flex items-center justify-between w-full border border-gray-200 p-2 rounded-md'>
            <Link to={`/todo/${id}`} className='flex items-center justify-start w-full gap-2'>
                <input type="checkbox" checked={completed} />
                <p className='flex-1'>{title}</p>
            </Link>
            <Button onClick={handleDelete} className='bg-red-500 hover:bg-red-600 text-white rounded-md'><Trash className='text-white rounded-md' /></Button>
        </li>
    )
}

export default TodoList