import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const UserLoadingSkeleton = () => {
    return (
        <div className='flex flex-col gap-2 w-full items-center justify-center space-x-4'>
            <Skeleton className='h-20 w-20 rounded-full overflow-hidden flex items-center justify-center border border-gray-200 md:w-40 md:h-40 '  />
            <div className='flex flex-col gap-4 p-4 max-w-full space-y-2'>
                <Skeleton className=' h-6 w-[200px]' />
                <Skeleton className='h-6 w-[200px]' />
                <Skeleton className='h-6 w-[200px]' />
                <Skeleton className='h-6 w-[200px]' />
                <Skeleton className='h-6 w-[200px]' />
                <Skeleton className='h-6 w-[200px]' />
                <Skeleton className='h-6 w-[200px]' />
                <Skeleton className='h-8 w-8 rounded-full' />
            </div>
        </div>
    );
}

export default UserLoadingSkeleton