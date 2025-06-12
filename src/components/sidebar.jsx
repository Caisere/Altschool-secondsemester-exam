import React from 'react'
import { User } from './index'

const Sidebar = () => {
    return (
        <aside className='flex p-2 flex-col gap-8  bg-secBackground h-screen md:p-6'>
            <h1 className='text-xl text-white mt-10 font-bold text-center md:text-2xl'>User Profile</h1>
            <User />
        </aside>
    )
}

export default Sidebar