import React, { useState } from 'react'
import {  useParams, Link } from 'react-router-dom'
import { getEachTodo } from '../api/apiCall'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
import { TodoEditForm } from '@/components';



const Todo = () => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const {id} = useParams();
    const {data: eachTodo, isLoading, error} = useQuery({
        queryKey: ['todo', id],
        queryFn: () => getEachTodo(id),
        // enabled: !!id,
    })
    
    // const [editTodo, setEditTodo] = useState(eachTodo?.title);
    // const navigate = useNavigate();

    
    console.log(id);
    
    // const handleBack = () => {
    //     navigate(-1);
    // }

    function handleEdit(e) {
        e.preventDefault();
        e.stopPropagation();
        setIsEditOpen(is => !is);
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <div className="min-h-screen w-full h-full flex flex-col gap-4 justify-center items-center flex-1 md:flex md:flex-col md:justify-center md:items-center md:w-full md:relative md:flex-1 md:left-[10%] md:gap-4">
            <h1 className='text-2xl font-bold'>Todo Details</h1>
            <Card className='w-full max-w-[60%]'>
                <CardHeader>

                    <CardTitle>{eachTodo.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>User ID: {eachTodo.userId}</CardDescription>
                    <p>Completed: {eachTodo.completed ? 'Yes' : 'No'}</p>
                </CardContent>
            </Card>
            <div className='flex justify-center items-center gap-4'>
                <Link to='/'>
                    <Button className='bg-black/70 hover:bg-black text-white px-4 py-2 rounded-md'>Back</Button>
                </Link>
                <Button className='bg-secBackground hover:bg-secBackground/70 text-white px-4 py-2 rounded-md' onClick={handleEdit}>{isEditOpen ? 'Cancel Edit' : 'Edit Todo'}</Button>
            </div>
            {isEditOpen && <TodoEditForm todo={eachTodo.title} />}
        </div>
    );
}

export default Todo