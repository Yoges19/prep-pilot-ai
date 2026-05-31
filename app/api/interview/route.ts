import { supabase } from "@/lib/supabase";
import Groq from "groq-sdk";
import { getUserLearningMemory } from "@/lib/coral-memory"; 

import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";
    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY!
    });

export async function POST(request: Request) {
    
    try{
        const body = await request.json();
        const { question, user_id } = body;
        if(!question ||question.trim() === "") return Response.json({ answer: "Please ask a valid question." });
        const memory = await getUserLearningMemory(user_id);
        
        //fetch previous chats of the user from supabase

            const messages: ChatCompletionMessageParam[] = [
                {
                    role: "system",
                    content: `
                            You are an AI Interview Trainer.

                            Here is the user's learning memory:

                            Weak Areas:
                            ${memory?.memorySummary}

                            Completed Topics:
                            ${memory?.completedTask}

                            Pending Topics:
                            ${memory?.pendingTask}

                            Instructions:
                            - Help the user improve weak areas
                            - Avoid repeating mastered topics
                            - Give beginner-friendly explanations
                            - Ask follow-up interview questions when useful
                            - Act like a real technical interviewer
                    `,
                },

                    ...(memory.userChats?.flatMap((chat) => [
                    {
                        role: "user" as const,
                        content: chat.question,
                    },
                    {
                        role: "assistant" as const,
                        content: chat.answer,
                    },
                ]) || []),

                {
                    role: "user",
                    content: question,
                },
            ];
        //send memory to GROQ
        const result = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: messages,
        });

        //get AI response
        const response = result.choices[0].message.content;

        //save new chat to supabase
        const { error: insertError } = await supabase
            .from('ai_chats')
            .insert([
                {
                    user_id: user_id,
                    question: question,
                    answer: response,
                }
            ]);
            if(insertError){
                console.log(insertError);
                return Response.json({
                    answer: "Error saving chat."
                });
            }
        return Response.json(
            {
                answer: response,
            }
        );
    }catch(error){
        console.log(error);
        return Response.json({
            answer: "Sorry, I am having trouble answering your question at the moment. Please try again later."
        });
    }
}