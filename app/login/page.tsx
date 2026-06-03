'use client';

import { useState } from "react";
import { supabase } from "@/lib/supabase";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword(
      {email, password}
    );
    if(error){
      console.error('Error logging in:', error);
    }else{
      window.location.href = '/dashboard';
      console.log('Logged in user:', data.user);
    }
  }


  return (
    <div className="
      w-full
      max-w-md
      mx-auto
      h-96
      mt-10
      px-4 p-6 bg-white/10 backdrop-blur-3xl rounded-lg border border-gray-300 shadow-md">
      {/* create a login page with email and password fields and a submit button */}
      <h1 className="text-2xl md:text-3xl font-bold mb-4 self-center text-gray-900">Login</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="text-gray-800">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-md p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
        <label className="text-gray-800">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="w-full
                      border
                      border-gray-300
                      rounded-md
                      p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />
        <button
          type="submit"
          className="w-full
          bg-blue-500
          text-white
          rounded-md
          p-3  hover:bg-blue-600 transition-colors duration-300"
        >
          Login
        </button>
      </form>
    </div>
    
  );
}