import React from 'react'
import Avatar from './avatar'
import { getGithubUser } from '../../api/apiCall'
import { useQuery } from '@tanstack/react-query'
import UserDetails from './userdetails'
// import { Loader2 } from 'lucide-react'
import UserLoadingSkeleton from '../loadingskeleton/userloadingskeleton'


const User = () => {
    const {data: user, isLoading, error} = useQuery({
        queryKey: ['github-user'],
        queryFn: getGithubUser,
    })

    const {avatar_url} = user || {};

    if (isLoading) return <UserLoadingSkeleton />
    if (error) return <div className='text-red-500 flex items-center justify-center gap-2'>Error: {error.message}</div>
    return (
        <div className='flex flex-col gap-2 w-full justify-center items-center'>
            <Avatar avatar={avatar_url} />
            <UserDetails user={user} />
        </div>
    )
}

export default User