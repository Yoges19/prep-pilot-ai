
import { supabase } from "./supabase";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function getUserLearningMemory(user_id: string) {

  const { data: userChats, error: fetchError } = await supabase
    .from("ai_chats")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: true })
    .limit(5);

  if (fetchError) {
    console.log(fetchError);

    return {
      chatHistory: "",
      completedTask: "",
      pendingTask: "",
      memorySummary: "",
    };
  }

  const chatHistory =
    userChats
      ?.map(
            (chat) => `
            Question: ${chat.question}
            Answer: ${chat.answer}`
      ).join("\n") || "";

  const { data: tasks, error: taskError } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user_id);

  if (taskError) {
    console.log(taskError);

    return {
      chatHistory,
      completedTask: "",
      pendingTask: "",
      memorySummary: "",
      userChats
    };
  }


  const completedTasks =
    tasks?.filter((task) => task.completed === true) || [];

  const pendingTasks =
    tasks?.filter((task) => task.completed === false) || [];

  const completedTask =
    completedTasks.map((task) => task.title).join("\n");

  const pendingTask =
    pendingTasks.map((task) => task.title).join("\n");

  const memoryAnalysis = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `
                You are an AI mentor.

                Analyze the user's previous interview questions.

                Identify:
                - weak technical areas
                - repeated struggles
                - missing concepts
                - areas needing improvement

                Return only concise bullet points.
                `,
      },
      {
        role: "user",
        content: 
        `Previous Interview Questions:
        ${chatHistory}`,
      },
    ],
  });

  const memorySummary =
    memoryAnalysis.choices[0].message.content || "";
return {
   chatHistory,
   completedTask,
   pendingTask,
   memorySummary,
   userChats
}
}
