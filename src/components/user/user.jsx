import React from 'react'
import Avatar from './avatar'
import { getGithubUser } from '../../api/apiCall'
import { useQuery } from '@tanstack/react-query'
import UserDetails from './userdetails'


const User = () => {
    const {data: user, isLoading, error} = useQuery({
        queryKey: ['github-user'],
        queryFn: getGithubUser,
    })

    const {avatar_url} = user || {};

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    return (
        <div className='flex flex-col gap-2 w-full justify-center items-center'>
            <Avatar avatar={avatar_url} />
            <UserDetails user={user} />
        </div>
    )
}

export default User