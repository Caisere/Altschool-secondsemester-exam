
import { useLogout } from '../features/authentication/useLogOut'
import { User } from './index'

const Sidebar = () => {

    const {logout, isLoggingOut} = useLogout()

    function signOut () {
        logout()
    }

    return (
        <aside className='flex p-2 flex-col gap-8  bg-secBackground h-screen md:p-6'>
            <h1 className='text-xl text-white mt-10 font-bold text-center md:text-2xl'>User Profile</h1>
            <User />
            <button className='text-start text-white cursor-pointer' onClick={signOut} disabled={isLoggingOut}>Sign Out</button>
        </aside>
    )
}

export default Sidebar