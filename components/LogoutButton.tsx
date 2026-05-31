'use client';

import { supabase } from "@/lib/supabase";

export default function LogoutButton() {
    async function handleLogout() {
        await supabase.auth.signOut();
        window.location.href = '/login';
    }

    return (
        <button onClick={handleLogout} className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:scale-105 backdrop-blur-lg border border-white/20  text-white px-3 py-1 rounded-lg">
            Logout
        </button>
    );
}