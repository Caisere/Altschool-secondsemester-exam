import React from 'react'
import { CircleUser } from 'lucide-react'
// import avatar from '../../assets/vite.svg'

const Avatar = ({avatar}) => {
    return (
        <div className='w-20 h-20 rounded-full overflow-hidden flex items-center justify-center border border-gray-200 md:w-40 md:h-40'>
            {avatar ? <img src={avatar} alt="avatar" /> : <CircleUser className='w-full h-full object-cover' />}
        </div>
    )
}

export default Avatar