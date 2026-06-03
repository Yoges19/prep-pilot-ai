'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Profile() {
    const [profile, setProfile] = useState<{ username: string; email: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const fetchProfile = async () => {
        setLoading(true);
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) {
            console.log('Error fetching user:', userError);
        } else if (userData) {
            // Fetch profile data from your database
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('username, email')
                .eq('id', userData.user.id)
                .single();

            if (profileError) {
                console.log('Error fetching profile:', profileError);
            } else {
                setProfile(profileData);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <ProtectedRoute>
            <div className="flex-1 p-6 text-white">

        <h1 className="text-4xl font-bold mb-8">
            My Profile
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-white/10 p-6 rounded-2xl">
            <p className="text-lg font-semibold mb-4">Username: {profile?.username}</p>
            <p className="text-lg font-semibold">Email: {profile?.email}</p>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl">
            <p className="text-lg font-semibold">Learning Stats</p>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl">
            <p className="text-lg font-semibold">Career Goal</p>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl">
            <p className="text-lg font-semibold">Interview Stats</p>
            </div>

        </div>

        <div className="mt-6 bg-white/10 p-6 rounded-2xl">
            <p className="text-lg font-semibold">Weak Areas</p>
        </div>

        </div>
        </ProtectedRoute>
    );
}