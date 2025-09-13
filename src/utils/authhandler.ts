import type { QueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabase";
import toast from "react-hot-toast";

export function AuthHandler({ queryClient }: { queryClient: QueryClient }) {
    const navigate = useNavigate();

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log('Auth event:', event, session);
                
                if (event === 'SIGNED_IN' && session) {
                    // User just signed in (including OAuth)
                    await queryClient.invalidateQueries({ queryKey: ['user'] });
                    toast.success('Welcome!');
                    navigate('/dashboard');
                } else if (event === 'SIGNED_OUT') {
                    queryClient.setQueryData(['user'], null);
                    navigate('/');
                }
            }
        );

        return () => subscription.unsubscribe();
    }, [queryClient, navigate]);

    return null; // This component doesn't render anything
}