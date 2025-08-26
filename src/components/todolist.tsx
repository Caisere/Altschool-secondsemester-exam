import React from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '../api/apiCall';
import toast from 'react-hot-toast';
import { Trash } from 'lucide-react';
import { Button } from './ui/button'
import type { TodoInfo } from '../types';

type TodoListProps = {
    todo: TodoInfo, 
    pageParam: number
}

interface TodosResponse {
    data: TodoInfo[];
}

interface DeleteTodoContext {
    previousTodos: TodosResponse; 
}


const TodoList = ({todo, pageParam}: TodoListProps) => {
    const queryClient = useQueryClient();
    const {id, todo: todoText, completed} = todo;

    const {mutate: deleteTodoMutation} = useMutation({
        mutationFn: deleteTodo,
        onMutate: async (id: string): Promise<DeleteTodoContext> => {
            await queryClient.cancelQueries({queryKey: ['todos', pageParam]})

            const previousTodos = queryClient.getQueryData<TodosResponse>(['todos', pageParam]) as TodosResponse
            // console.log('previousTodos', previousTodos);
            console.log(queryClient.getQueryData(['todos', pageParam]));

            if (previousTodos) {
                queryClient.setQueryData<TodosResponse>(['todos', pageParam], {
                    ...previousTodos,
                    data: previousTodos.data.filter(todo => todo.id !== id)
                });
            }

            return {previousTodos};
        },
        onError: (error: Error, variables, context: DeleteTodoContext | undefined) => {
            if (context?.previousTodos) {
                queryClient.setQueryData(['todos'], context.previousTodos);
            }
            toast.error(`Failed to delete todo: ${error.message}`);
        },
        onSuccess: () => {
            toast.success('Todo deleted successfully');
            // setTimeout(() => {
            //     queryClient.invalidateQueries({ queryKey: ['todos', pageParam] })
            // }, 3000);
            // queryClient.invalidateQueries({ queryKey: ['todos', pageParam] })
        }
    })

    function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        deleteTodoMutation(id as string);
        // console.log('deleting todo', id);
    }


    function handleComplete(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        e.stopPropagation();
        // console.log('completing todo', id);
    }


    return (
        <li className='flex items-center justify-between w-full border border-gray-200 p-2 rounded-md' role="listitem">
            <input type="checkbox" checked={completed} className='mx-2' onChange={handleComplete} />
            <Link to={`/todo/${id}`} className='flex items-center justify-start w-full gap-2' role="link">
                <p className='flex-1'>{todoText}</p>
            </Link>
            <Button 
                role="button" 
                aria-label="Delete Todo" 
                onClick={handleDelete} 
                className='bg-red-500 hover:bg-red-600 hover:text-gray transition-all duration-300 text-white rounded-md cursor-pointer'
                >
                    <Trash 
                    className='text-white rounded-md' />
            </Button>
        </li>
    )
}

export default TodoList