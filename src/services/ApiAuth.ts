import supabase from "./supabase";


export type SignUpProps = {
    fullName: string,
    email: string,
    password: string
}

export type SignInProps = Pick<SignUpProps, 'email' | 'password'>

export async function signup({fullName, email, password}:SignUpProps){
    const {data, error} = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName
            }
        }
    })

    if(error) {
        throw new Error(error.message)
    }

    return data
}

export async function signin({email, password}:SignInProps) {
    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        throw new Error(error.message)
    }

    console.log(data)
    return data
}

export async function getCurrentUser(){
    const {data: session}  = await supabase.auth.getSession()
    
    if(!session.session) return null

    const {data, error} = await supabase.auth.getUser()

    if(error) {
        throw new Error(error.message)
    }

    return data.user
}

export async function logout() {
    const {error} = await supabase.auth.signOut()

    if (error) {
        throw new Error(error.message)
    }
}


export async function signInWithGithub () {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github'
    })

    if(error) {
        throw new Error(error.message)
    }

    return data
}

export async function signInWithGoogle () {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {redirectTo: 'https://altschool-secondsemester-exam.vercel.app/dashboard'}
    })

    if(error) {
        throw new Error(error.message)
    }

    return data
}

