'use client';

import { useState } from "react";
import { supabase } from "@/lib/supabase";


export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp(
      {email, password}
    );
    if(error){
      console.error('Error signing up:', error);
    }else{
      console.log('Signed up user:', data.user);
    }
  }


  return (
    <div className="max-w-md mx-auto h-full mt-10 p-6 bg-white/10 backdrop-blur-3xl rounded-lg border border-gray-300 shadow-md">
      {/* create a signup page with email and password fields and a submit button */}
      <h1 className="text-2xl font-bold mb-4 self-center text-gray-800">Signup</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="text-gray-700">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-md p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
        <label className="text-gray-700">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-md p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition-colors duration-300"
        >
          Signup
        </button>
      </form>
    </div>
    
  );
}