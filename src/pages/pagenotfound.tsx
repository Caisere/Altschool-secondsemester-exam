
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <section role="alert" className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center" role="alert">
                <h1 className="text-4xl font-bold mb-4">): 404</h1>
                <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
                <Link to="/" className="text-blue-500 hover:text-blue-700 underline" role="link">
                    Return to Home
                </Link>
            </div>
        </section>
    );
};

export default NotFound;
