import React from 'react'
import { Link } from 'react-router-dom'

const UserDetails = ({user}) => {
        const {
        name,
        bio,
        login,
        email,
        public_repos,
        twitter_username,
        url,
        } = user || {};
    return (
        <div className='flex flex-col gap-2 p-4 max-w-full'>
            <p className='text-sm md:text-base text-white'> <span className='font-bold'>Name:</span> {name}</p>
            <p className='text-sm md:text-base text-white'> <span className='font-bold'>Bio:</span> {bio}</p>
            <p className='text-sm md:text-base text-white'> <span className='font-bold'>Username:</span> {login}</p>
            <p className='text-sm md:text-base text-white'> <span className='font-bold'>Email:</span> {email || 'N/A'}</p>
            <p className='text-sm md:text-base text-white'> <span className='font-bold'>Public Repos:</span> {public_repos}</p>
            <p className='text-sm md:text-base text-white'> <span className='font-bold'>X/Twitter:</span> @{twitter_username || 'N/A'}</p>
            <Link className=' text-sm md:text-base text-white hover:underline max-w-full' to={url} target='_blank' rel='noopener noreferrer'><span className='font-bold'>URL:</span> {url || 'N/A'}</Link>
        </div>
    )
}

export default UserDetails