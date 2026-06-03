'use client';
import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from "react-markdown";
import { supabase } from '@/lib/supabase';
export default function Roadmap() {
  const[goal, setGoal] = useState("");
  const[roadmap, setRoadmap] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roadmap]);

  async function generateRoadmap(){
    try{
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      const user_id = userData.user?.id;
      const response = await fetch('/api/roadmap', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({goal, user_id})
    });

    const data = await response.json();
    setRoadmap(data.roadmap);
    }catch(error){
      console.log(error);
    }finally{
        setLoading(false);
    }
  }

return (
  <div className="h-screen w-full overflow-hidden bg-[#020617] text-white px-4 md:px-10 py-6">
    
     <div className="w-full h-full flex flex-col">

      <div className="mb-10 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          AI Personalized Roadmap
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Personalized learning roadmap powered by Coral + Groq AI
        </p>
      </div>
            <div className="flex items-center gap-3">

        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              generateRoadmap();
            }
          }}
          placeholder="Become a Full Stack Developer..."
          className="flex-1 p-5 rounded-2xl bg-[#111827] border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={generateRoadmap}
          disabled={loading}
          className="px-8 py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 font-semibold disabled:opacity-50"
        >
          Generate
        </button>

      </div>

      {loading && (
        <div className="mt-6 animate-pulse text-indigo-400">
          AI is generating your personalized roadmap...
        </div>
      )}


      {roadmap && (
        <div className="mt-8 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-transparent bg-[#0F172A] border border-gray-800  p-8 rounded-2xl shadow-2xl">

          <div className="prose prose-invert max-w-none prose-headings:text-indigo-300 prose-strong:text-white prose-li:text-gray-300">

            <ReactMarkdown>
              {roadmap}
            </ReactMarkdown>

          </div>
        </div>
      )}
      <div ref={bottomRef}></div>
      
  </div>

  </div>
);
}