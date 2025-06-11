import React, { useState } from 'react'
import { getTodos } from '../api/apiCall'
import { useQuery } from '@tanstack/react-query'
import { TodoList } from './index'
import { Button } from '@/components/ui/button'

const Todos = () => {
    const [pageParam, setPageParam] = useState(1);
    const limit = 10;

    const {data, isLoadingTodo, isErrorTodo} = useQuery({
        queryKey: ['todos', pageParam],
        queryFn: () => getTodos(pageParam, limit),
    })

    const todos = data?.data;
    const total = data?.total;

    const totalPages = Math.ceil(total / limit)
    // console.log(totalPages);

    // function to handle previous page
    function handlePrevious(e) {
        e.preventDefault();
        console.log(pageParam);
        setPageParam(pageParam - 1);
    }

    function handlePageChange (index) {
        setPageParam(index + 1);
    }

    // function to handle next page
    function handleNext(e) {
        e.preventDefault();
        console.log(pageParam);
        setPageParam(pageParam + 1);
    }

    

    if (isLoadingTodo) return <div>Loading...</div>
    if (isErrorTodo) return <div>Error fetching todos</div>
    return (
        <>
            <ul className='flex flex-col gap-2 w-[80%] md:max-w-[70%]'>
                {todos?.map((todo) => (
                    <TodoList key={todo.id} todos={todo} pageParam={pageParam} />
                ))}
            </ul>
            <div className='flex justify-center items-center gap-6 mt-4 w-full max-w-full md:max-w-[80%]'>
                <nav className='flex justify-center items-center flex-wrap gap-2'>
                    <Button className={`bg-gray-200 px-[10px] py-1 rounded-md text-gray-500 ${pageParam === 1 ? '' : 'hover:bg-secBackground/70'}`} disabled={pageParam === 1} onClick={handlePrevious}>Previous</Button>

                    {Array.from({length: totalPages}).map((_, index) => (
                        <button className={`${pageParam === index + 1 ? 'bg-secBackground  text-white' : 'bg-gray-200'} hover:bg-secBackground/70 hover:text-white px-[10px] py-1 rounded-md mx-1`} key={index} onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(index)
                        }}>{index + 1}</button>
                    ))}

                    <Button disabled={pageParam === totalPages} className={`${pageParam === totalPages ? 'bg-secBackground   text-gray-500  px-[10px] py-1 rounded-md' : 'bg-gray-200  px-[10px] py-1 rounded-md '} hover:bg-secBackground/70 text-gray-500`}  onClick={handleNext}>Next</Button>
                </nav>
            </div>
        </>
    )
}


export default Todos