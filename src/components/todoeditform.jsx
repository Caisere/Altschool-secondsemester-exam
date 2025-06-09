import React from 'react'
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const TodoEditForm = ({todo}) => {
    const [editTodo, setEditTodo] = useState(todo);
    return (
        <form className=' w-[60%] flex flex-col gap-4'>
            <Input type='text' value={editTodo} onChange={(e) => setEditTodo(e.target.value)} placeholder='Edit Todo' />
            <Button type='submit' className='bg-secBackground hover:bg-secBackground/90 w-[20%] mx-auto text-white px-4 py-2 rounded-md'>Save</Button>
        </form>
    )
}

export default TodoEditForm