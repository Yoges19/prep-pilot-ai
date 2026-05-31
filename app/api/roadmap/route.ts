import Groq from "groq-sdk";
import { getUserLearningMemory } from "@/lib/coral-memory"; 

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY!
});

export async function POST(request: Request) {
    try{
        const body = await request.json();
        const { goal, user_id } = body;


        const memory = await getUserLearningMemory(user_id);


        const prompt =` You are an AI career mentor. 
                Create a highly personalized learning roadmap for:
                ${goal} 
                Previous interview conversations:
                ${memory.chatHistory} 
                Completed topics: ${memory.completedTask} 
                Pending topics: ${memory.pendingTask}
                
                Instructions: 
                - Avoid heavily repeating already completed topics 
                - Focus more on weak areas 
                - Suggest practical projects 
                - Add interview preparation guidance 
                - Add DSA preparation if needed 
                - Make the roadmap beginner-friendly and structured Return the response in beautiful markdown format.
                Use: 
                # for main headings 
                ## for subheadings 
                - for bullet points 
                
                Include: 
                # Beginner Phase 
                # Intermediate Phase 
                # Advanced Phase 
                # Projects 
                # Interview Preparation 
                # Weekly Study Plan `;
        const result = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "user", content: prompt }
            ]
        });
        const response = result.choices[0].message.content;
        return Response.json({
            roadmap: response
        });
    }catch(error){
        console.log(error);
        return Response.json({
            roadmap: "Sorry, I am having trouble generating your roadmap at the moment. Please try again later."
        });
    }
}