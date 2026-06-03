'use client';
import { SendHorizontal } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import ReactMarkdown from "react-markdown";


type Message = {
  role: string;
  text: string;
};

export default function InterviewTrainer() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
    async function ansData()
    {  
      if(!question.trim()) return;
      setLoading(true);
      try{
        const userMessage = {
          role: "user",
          text: question,
        };
      const { data: userData } = await supabase.auth.getUser(); // Get the current logged-in user
  
      setMessages((prev) => [...prev, userMessage]);

      const response = await fetch('/api/interview', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({question , user_id: userData.user?.id}) // Pass the user ID to the API route
      })
      const data = await response.json();
      const aiMessage = {
        role: "ai",
        text: data.answer,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setQuestion("");
    }catch(error){
      console.log(error);
    }finally{
        setLoading(false);
    }
    }
    return (
    <div className="h-screen w-full bg-[#020617] text-white p-8 overflow-hidden">
      <div className="max-w-5xl mx-auto h-full flex flex-col">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">Hii..I am your Interview Trainer</h1>
  
        {loading && (
         <div className="animate-pulse text-gray-400">
            AI is thinking...
          </div>
       )}
       
      <div className="mt-6 flex-1 overflow-y-auto flex flex-col gap-6 pr-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-5 rounded-2xl max-w-3xl shadow-lg ${
              message.role === "user"
                ? "bg-indigo-600 text-white self-end"
                : "bg-[#111827] text-gray-100 self-start border border-gray-800"
            }`}
          >
            {
              message.role === "ai" ? (
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown>
                    {message.text}
                  </ReactMarkdown>
                </div>
              ) : (
                <p>{message.text}</p>
              )
            }
            <div ref={bottomRef}></div>
          </div>
        ))}
        </div>
        <div className="flex items-center gap-3 mt-4">
  
        <input
          type="text"
          value={question}
          placeholder="Ask me anything about interview preparation..."
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              ansData();
            }
                }}
                className="flex-1 p-4 rounded-2xl bg-[#111827] border border-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                disabled={loading}
                onClick={ansData}
                className="h-14 w-14 flex items-center justify-center rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 disabled:opacity-50"
              >
                <SendHorizontal size={22} />
              </button>

          </div>
      </div>
    </div>
    
  );
}
