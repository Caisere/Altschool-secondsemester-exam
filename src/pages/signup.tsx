import { Link } from "react-router-dom";
import RegisterForm from "../features/authentication/registerform";
// import SignInForm from "../features/authentication/signinform";

function SignUp() {
    return (
        <div className="min-h-screen bg-[#f5f5f5]  md:bg-gray-50 flex flex-col justify-center gap-2 md:flex-row">
            {/* Left Panel - Dark with Abstract Shapes */}
            <div className="hidden md:w-1/2 md:block">
                <img
                    src="/mind_sync_logo_square.jpg"
                    alt="mind sync logo"
                    className="object-cover h-full w-full"
                />
            </div>
            <div className="md:w-1/2 bg-[#f5f5f5] py-6 flex flex-col gap-6">
                <Link to='/'>
                    <div className="w-20 h-20 mx-auto">
                        <img src="/logo_design.png" alt="logo_design.png" className="object-cover" />
                    </div>
                </Link>
                {/* Right Panel - Light with Content */}
                <RegisterForm formAction="sign-up" />
            </div>
        </div>
    );
}

export default SignUp;
