import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col gap-2 md:flex-row">
          {/* Left Panel - Dark with Abstract Shapes */}
            <div className="w-full md:w-1/2">
                <img src="/mind_sync_logo_square.jpg" alt="mind sync logo" className="object-cover h-full w-full" />
            </div>
            {/* Right Panel - Light with Content */}
            <div className="w-full items-start justify-start px-2 py-4 md:w-1/2 bg-[#f5f5f5] flex flex-col md:justify-center md:items-center md:px-16 md:py-0 border-1">
                <div className="max-w-md p-2 md:p-0 ">
                    <h2 className="text-4xl font-semibold text-gray-900 mb-4 md:mb-8">
                        Productive Mind
                    </h2>
                    
                    <p className="text-gray-600 text-lg leading-relaxed mb-12">
                        With only the features you need, Mind Sync is customized 
                        for individuals seeking a stress-free way to stay focused on 
                        their goals, projects, and tasks.
                    </p>
                    
                    <div className="flex flex-col gap-4">
                        <Link to='/signup' className="w-full text-center bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-4 px-8 rounded-lg transition-colors duration-200 text-lg">
                            Get Started
                        </Link>
                        
                        <div>
                            <p className="text-center text-gray-500">
                                Already have an account? 
                                <Link to='/signin' className="text-gray-700 hover:text-gray-900 ml-1 font-medium">
                                    Sign in
                                </Link>
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );   
}

export default Home;
