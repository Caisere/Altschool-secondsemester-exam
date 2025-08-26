import { useState } from 'react'
import { Sidebar } from '../components'
import { Menu, X } from 'lucide-react'
import { Outlet } from 'react-router-dom'

const HomePage = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const handleMenuClick = () => {
        setIsMenuOpen(is => !is);
    }

    return (
        <main role="main" aria-label="Home Page" className="flex relative w-full md:w-full p-4 overflow-x-hidden">
            <div onClick={handleMenuClick} className="absolute top-0 right-0 p-4 md:hidden">{isMenuOpen ? <X /> : <Menu />}</div>
            {/* min-lg:fixed */}
            <aside aria-label="Sidebar" className={`${isMenuOpen ? 'block absolute top-0 left-0 h-screen bg-white border-r border-gray-200 w-[60%] z-[1000] transition-all duration-1000' : 'hidden'} md:block md:fixed md:top-0 md:left-0 md:h-screen md:bg-white md:border-r md:border-gray-200 md:w-1/4 md:z-[1000]`}>
                <Sidebar />
            </aside>
            <Outlet />
        </main>
    );
}

export default HomePage;