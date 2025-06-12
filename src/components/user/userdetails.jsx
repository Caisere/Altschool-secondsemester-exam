import React from 'react'
import { Link } from 'react-router-dom'
import { Github } from 'lucide-react'

const UserDetails = ({user}) => {
        const {
            name,
            bio,
            login,
            email,
            public_repos,
            twitter_username,
            html_url,
        } = user || {};
        console.log(user)
    return (
        <div className='flex flex-col gap-2 p-4 max-w-full'>
            <p className='text-sm md:text-base text-white'> <span className='font-bold'>Name:</span> {name}</p>
            <p className='text-sm md:text-base text-white'> <span className='font-bold'>Bio:</span> {bio}</p>
            <p className='text-sm md:text-base text-white'> <span className='font-bold'>Username:</span> {login}</p>
            <p className='text-sm md:text-base text-white'> <span className='font-bold'>Email:</span> {email || 'N/A'}</p>
            <p className='text-sm md:text-base text-white'> <span className='font-bold'>Public Repos:</span> {public_repos}</p>
            <p className='text-sm md:text-base text-white'> <span className='font-bold'>X/Twitter:</span> @{twitter_username || 'N/A'}</p>
            <Link className=' text-sm md:text-base text-white hover:underline max-w-full' to={html_url} target='_blank' rel='noopener noreferrer'><Github className='w-8 h-8 font-bold text-2xl border border-gray-200 rounded-full p-2' /> </Link>
        </div>
    )
}

export default UserDetails