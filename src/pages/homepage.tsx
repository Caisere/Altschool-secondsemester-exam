import { useEffect, useRef, useState } from 'react'
import { Sidebar } from '../components'
import { Menu, X } from 'lucide-react'
import { Outlet } from 'react-router-dom'

const HomePage = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    // Close drawer on resize to md
    useEffect(() => {
        const handleResize = () => {
        if (window.innerWidth >= 768) setIsMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

   // Close drawer when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
        if (
            isMenuOpen &&
            sidebarRef.current &&
            !sidebarRef.current.contains(e.target as Node)
        ) {
            setIsMenuOpen(false);
        }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);



    // const handleMenuClick = () => {
    //     setIsMenuOpen(is => !is);
    // }

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Mobile hamburger */}
            <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="md:hidden fixed top-4 right-4 z-20 bg-white rounded-full p-2 shadow"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
    
            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                aria-label="Main navigation"
                className={`
                    transition-all duration-300
                    absolute inset-y-0 z-10
                    ${isMenuOpen ? 'left-0 w-1/2 bg-[#1a1a1a] border-r border-gray-200' : '-left-full'}
                    md:relative md:w-60 md:block
                    md:inset-y-0 md:left-0 md:bg-[#1a1a1a] md:border-gray-200
                `}
            >
                <nav className="h-full py-4">
                    <Sidebar />
                </nav>
            </aside>

            <main
                className="flex-1 overflow-auto p-4 md:ml-5 md:mt-0 transition-all duration-300"
                role="main"
                aria-label="Home Page"
            >
                <Outlet />
            </main>
        </div>
    );
}

export default HomePage;