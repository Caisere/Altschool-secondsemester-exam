import { LogOut, SlidersHorizontal } from 'lucide-react'
import { useLogout } from '../features/authentication/useLogOut'
import Search from './search'
import TaskFilter from './taskfilter'
import ListFilter from './listfilter'
import { Link } from 'react-router-dom'
import { Spinner } from './ui/spinner'

const Sidebar = () => {

    const {logout, isLoggingOut} = useLogout()

    function signOut () {
        logout()
    }

    return (
        <aside className='flex p-2 flex-col text-[#969798] gap-8 h-screen md:p-6'>
            <h1 className='text-2xl font-semibold'>Menu</h1>
            <Search />
            <TaskFilter />
            <ListFilter/>
            <div className='flex flex-col gap-1 text-sm justify-self-end'>
                <Link to='/dashboard/settings' 
                    className='flex gap-2 text-start text-[#969798] cursor-pointer items-center hover:bg-bgHover hover:text-[#1a1a1a] py-1 px-3 transition-colors duration-300 rounded'
                >
                    <span><SlidersHorizontal width={16}  /></span>
                    Settings
                </Link>
                <button 
                    className='flex gap-2 text-start text-[#969798] cursor-pointer hover:bg-bgHover hover:text-[#1a1a1a] py-1 px-3 transition-colors duration-300 rounded disabled:cursor-not-allowed' 
                    onClick={signOut} 
                    disabled={isLoggingOut}
                >
                    <span><LogOut width={16} /></span>
                    {isLoggingOut ? <span>Signing Out <Spinner/> </span>  : "Sign Out"}
                </button>
            </div>
            
        </aside>
    )
}

export default Sidebar