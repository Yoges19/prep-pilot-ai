'use client';

import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export default function ButtonVisible() {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        async function getUser() {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        }

        getUser();

        const { data: authListener } =
            supabase.auth.onAuthStateChange((event, session) => {
                setUser(session?.user || null);
            });

        return () => {
            authListener.subscription.unsubscribe();
        };

    }, []);

    // IF USER NOT LOGGED IN
    if (!user) {
        return (
            <>
                <Link
                    href="/login"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 backdrop-blur-lg border border-white/20 text-white px-3 py-1 rounded-lg"
                >
                    Login
                </Link>

                <Link
                    href="/signup"
                    className="bg-gradient-to-r from-green-500 to-teal-500 hover:scale-105 backdrop-blur-lg border border-white/20 text-white px-3 py-1 rounded-lg"
                >
                    Sign Up
                </Link>
            </>
        );
    }

    // IF USER LOGGED IN
    return null;
}