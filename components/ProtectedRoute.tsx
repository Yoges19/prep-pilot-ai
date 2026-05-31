'use client';

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode}){
    const router = useRouter();
    const[loading, setLoading] = useState(true);

    useEffect(() =>{
        async function checkUser() {
            const { data } = await supabase.auth.getUser();

            //if not a user
            if(!data.user){
                router.push('/login');
            }else{
                setLoading(false);
            }
        }
        checkUser();
    }, [router]
    );

    if(loading) {
        return( 
            <div className="text-white p-10 text-xl">Loading...</div>
    );
    }
    return <>{children}</>;
}