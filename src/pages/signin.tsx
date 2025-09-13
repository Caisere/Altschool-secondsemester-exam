import { Link } from "react-router-dom";
import RegisterForm from "../features/authentication/registerform";
// import SignInForm from "../features/authentication/signinform";

const SignIn = () => {
    return (
        <div className="min-h-screen bg-[#f5f5f5] md:bg-gray-50 flex flex-col justify-center gap-2 md:flex-row">
            {/* Left Panel - Dark with Abstract Shapes */}
            <div className="hidden md:w-1/2 md:block">
                <img
                    src="/mind_sync_logo_square.jpg"
                    alt="mind sync logo"
                    className="object-cover h-full w-full"
                />
            </div>
            {/* Right Panel - Light with Content */}
            <div className="w-full md:w-1/2 bg-[#f5f5f5] flex flex-col gap-16 md:gap-10 py-2 md:py-10">
                <Link to='/'>
                    <div className="w-28 h-28 mx-auto">
                        <img src="/logo_design.png" alt="logo_design.png" className="object-cover" />
                    </div>
                </Link>
                {/* Right Panel - Light with Content */}
                <RegisterForm />
            </div>
        </div>
    );
};

export default SignIn;
