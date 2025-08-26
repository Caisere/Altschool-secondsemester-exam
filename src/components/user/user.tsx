import Avatar from './avatar'
import { getGithubUser } from '../../api/apiCall'
import { useQuery } from '@tanstack/react-query'
import UserDetails from './userdetails'
// import { Loader2 } from 'lucide-react'
import UserLoadingSkeleton from '../loadingskeleton/userloadingskeleton'

import type { GithubUser } from '../../types'


const User = () => {
    const {data: user, isPending: isLoading, error} = useQuery<GithubUser>({
        queryKey: ['github-user'],
        queryFn: getGithubUser,
    })

    // console.log(user)

    const {avatar_url} = user || {};
    // loading state
    if (isLoading) return <UserLoadingSkeleton />
    // on error
    if (error) return <div className='text-red-500 flex items-center justify-center gap-2'>Error: {error.message}</div>

    return (
        <aside className='flex flex-col gap-2 w-full justify-center items-center'>
            <Avatar avatar={avatar_url} />
            <UserDetails user={user} />
        </aside>
    )
}

export default User