import { useState, type FormEvent} from 'react';
import { Eye, EyeOff, Github, Mail } from 'lucide-react';
import { Link} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSignUp} from './useSignUp';
import { useLogin } from './useLogin';
import { useSignInWithGithub } from './useSignInWithGithub';
import { useSignInWithGoogle } from './useSignInWithGoogle';

type RegisterFormProp = {
    formAction?: string,
}

type FormData = {
    fullName: string,
    password: string,
    email: string,
    confirmPassword: string
}


function RegisterForm({formAction}:RegisterFormProp) {
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    

    const {register, handleSubmit, formState:{errors}, getValues, reset} = useForm<FormData>({
        defaultValues: {
            fullName: '',
            password: '',
            email: '',
            confirmPassword: ''
        }
    })

    const {signUp, isSigningUp} = useSignUp()

    const {login, isSigningIn} = useLogin()

    const {signInWithGithub} = useSignInWithGithub()

    const {signInWithGoogle} = useSignInWithGoogle()


    function handleSignUp(data:FormData) {
        console.log(data)
        const userObj = {
            fullName: data.fullName,
            email: data.email,
            password: data.password
        }

        signUp(userObj)
        reset()
    }

    function handleSignUpWithGithub(e:FormEvent) {
        e.preventDefault()
        signInWithGithub()
    }

    function handleSignUpWithGoogle(e:FormEvent) {
        e.preventDefault()
        console.log('google')
        signInWithGoogle()
    }

    function handleLogin(data:FormData) {
        console.log('logging in', data)
        const user = {
            email: data.email,
            password: data.password
        }

        login(user, {
            onSuccess: () => {
                reset()
            }
        })
        
    }



    //sign up form
    if (formAction) {
        return (
            <form 
            className="w-full flex justify-start md:justify-center items-start md:items-center"
            onSubmit={handleSubmit(handleSignUp)}
            >
                <div className="mx-auto w-full md:w-[60%] py-4 px-8 md:p-0 md:px-0">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-8 text-center ">
                        Create An Account
                    </h2>

                    {/* Full Name */}
                    <div className="mb-6 flex flex-col gap-2">
                        <input
                            type="text"
                            {...register('fullName', {
                                required: ('Full Name is required'),
                            })}
                            className="w-full px-2 py-3 text-gray-700 bg-transparent border-1  border-gray-300 focus:outline-none transition-colors duration-200 text-base rounded-sm focus:border-b-gray-500 focus:border-b-2"
                            placeholder="Full Name"
                            disabled={isSigningUp}
                        />
                        {errors?.fullName && <p className='text-red-500'>{errors?.fullName?.message}</p>}
                    </div>
                
                    {/* Email Input */}
                    <div className="mb-6 flex flex-col gap-2">
                        <input
                            type="email"
                            {...register('email', {
                                required: ('Email is required')
                            })}
                            className="w-full px-2 py-3 text-gray-700 bg-transparent border-1  border-gray-300 focus:border-b-gray-500 focus:border-b-2 focus:outline-none transition-colors duration-200 text-base rounded-sm"
                            placeholder="email.email@mail.com"
                            disabled={isSigningUp}
                        />
                        {errors?.email && <p className='text-red-500'>{errors?.email?.message}</p>}
                    </div>
                
                    {/* Password Input */}
                    <div className="mb-8 flex flex-col gap-2 relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', {
                                required: ('Password is required'),
                                minLength: {
                                    value: 8,
                                    message: 'Password need a minimum of 8 character'
                                }
                            })}
                            className="w-full px-2 py-3 pr-10 text-gray-700 bg-transparent border-1  border-gray-300 focus:border-b-gray-500 focus:border-b-2 focus:outline-none transition-colors duration-200 text-base rounded-sm"
                            placeholder="Password"
                            disabled={isSigningUp}
                        />
                        {errors?.password && <p className='text-red-500'>{errors?.password?.message}</p>}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-8 flex flex-col gap-2 relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            {...register('confirmPassword', {
                                required: ('Confirm Password is required'),
                                validate: (value) => value === getValues().password || 'Password need to match'
                            })}
                            className="w-full px-2 py-3 pr-10 text-gray-700 bg-transparent border-1  border-gray-300 focus:border-b-gray-500 focus:border-b-2 focus:outline-none transition-colors duration-200 text-base rounded-sm"
                            placeholder="Confirm Password"
                            disabled={isSigningUp}
                        />
                        {errors?.confirmPassword && <p className='text-red-500'>{errors?.confirmPassword?.message}</p>}
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
            
                
                    {/* Sign In Button */}
                    <button 
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-base mb-6"
                    >
                        {isSigningUp ? 'Signing Up' : 'Sign Up'}
                    </button>
                
                    {/* Or Divider */}
                    <div className="text-center text-gray-500 mb-6">
                        or
                    </div>
                
                    {/* Social Sign In Buttons */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                        <button 
                            className="bg-gray-200 flex items-center gap-2 hover:bg-[#1a1a1a] hover:text-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-sm"
                            onClick={handleSignUpWithGoogle}
                        >
                            <span><Mail /></span>
                            Continue with Google
                        </button>
                        <button 
                            className="bg-gray-200 flex items-center gap-2 hover:bg-[#1a1a1a] hover:text-gray-200 text-gray-700  font-medium py-3 px-4 rounded-lg transition-colors duration-300 text-sm"
                            onClick={handleSignUpWithGithub}
                        >
                            <span><Github /></span>
                            Continue with Github
                        </button>
                    </div>
                    
                    {/* Sign Up Link */}
                    <p className="text-center text-gray-600 text-sm">
                        Already have an account?
                        <Link to='/signin' className="text-[#1a1a1a] hover:text-gray-700 ml-1 font-bold hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </form>
        )
    }



    // Login Form
    return (
        <form 
            className="w-full flex justify-start md:justify-center items-start md:items-center"
            onSubmit={handleSubmit(handleLogin)}
        >
            <div className="mx-auto w-full md:w-[60%] px-8">
                <h2 className="text-4xl md:text-3xl font-bold text-[#1a1a1a] mb-8 text-center">Login</h2>
                
                {/* Email Input */}
                <div className="mb-6">
                    <input
                        type="email"
                        {...register('email', {
                            required: ('Email is required')
                        })}
                        className="w-full px-2 py-3 text-gray-700 bg-transparent border-1  border-gray-300 focus:outline-none transition-colors duration-200 text-base rounded-sm focus:border-b-gray-500 focus:border-b-2"
                        placeholder="email.email@mail.com"
                        disabled={isSigningIn}
                    />
                    {errors?.email && <p className='text-red-500'>{errors?.email?.message}</p>}
                </div>
                
                {/* Password Input */}
                <div className="mb-8 relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', {
                            required: ('Password is required'),
                            minLength: {
                                value: 8,
                                message: 'Password need a minimum of 8 character'
                            }
                        })}
                        className="w-full px-2 py-3 pr-10 text-gray-700 bg-transparent border-1  border-gray-300 focus:border-b-gray-500 focus:border-b-2 focus:outline-none transition-colors duration-200 text-base rounded-sm"
                        placeholder="Password"
                        disabled={isSigningIn}
                    />
                    {errors?.password && <p className='text-red-500'>{errors?.password?.message}</p>}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                
                {/* Sign In Button */}
                <button 
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-base mb-6"
                >
                    {isSigningIn ? "Signing In" : "Sign in"}
                </button>
                
                {/* Or Divider */}
                <div className="text-center text-gray-500 mb-6">
                    or
                </div>
                
                {/* Social Sign In Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                    <button 
                        className="bg-gray-200 flex items-center gap-2 hover:bg-[#1a1a1a] hover:text-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-sm"
                        onClick={handleSignUpWithGoogle}
                    >
                        <span><Mail/></span>
                        Continue with Google
                    </button>
                    <button 
                        className="bg-gray-200 flex items-center gap-2 hover:bg-[#1a1a1a] hover:text-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-sm"
                        onClick={handleSignUpWithGithub}
                    >
                        <span><Github /></span>
                        Continue with Github
                    </button>
                </div>
                
                {/* Sign Up Link */}
                <p className="text-center text-gray-600 text-sm">
                    Don't have an account?
                    <Link to='/signup' className="text-[#1a1a1a] hover:text-gray-700 ml-1 font-bold hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </form>
    )
}

export default RegisterForm;
