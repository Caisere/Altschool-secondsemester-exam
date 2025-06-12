import React from 'react'
import { Loader2 } from "lucide-react";

const EachTodoLoader = () => {
    return (
        <div className="min-h-screen w-full h-full flex flex-col gap-4 justify-center items-center flex-1 md:flex md:flex-col md:justify-center md:items-center md:w-full md:relative md:flex-1 md:left-[10%] md:gap-4">
            Loading...
            <div className='grid place-items-center h-[100vh]'>
                <Loader2 className='w-20 h-20 text-secBackground' />
            </div>
        </div>
    )
}

export default EachTodoLoader