import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center px-6">

      {/* Hero Section */}
      <div className="text-center max-w-4xl">

        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
          PrepPilot AI
        </h1>

        <p className="mt-6 text-xl text-gray-400 leading-relaxed">
          Personalized AI Interview Trainer + Roadmap Generator powered by
          Coral Memory + Groq AI.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">

          <Link
            href="/roadmap"
            className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 font-semibold shadow-lg"
          >
            Generate Roadmap
          </Link>

          <Link
            href="/interview-trainer"
            className="px-8 py-4 rounded-2xl border border-gray-700 bg-[#111827] hover:bg-[#1F2937] transition-all duration-200 font-semibold"
          >
            Start Interview Training
          </Link>

        </div>

      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mt-24 w-full max-w-6xl">

        <div className="bg-[#0F172A] border border-gray-800 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-indigo-400">
            AI Roadmaps
          </h2>

          <p className="text-gray-400 mt-4">
            Personalized career roadmaps generated from your goals,
            tasks, and interview history.
          </p>
        </div>

        <div className="bg-[#0F172A] border border-gray-800 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-purple-400">
            Smart Memory
          </h2>

          <p className="text-gray-400 mt-4">
            Coral-powered memory tracks weak areas, completed topics,
            and learning patterns.
          </p>
        </div>

        <div className="bg-[#0F172A] border border-gray-800 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-pink-400">
            Interview Trainer
          </h2>

          <p className="text-gray-400 mt-4">
            Practice technical interviews with contextual AI feedback
            and adaptive questioning.
          </p>
        </div>

      </div>

    </main>
  );
}