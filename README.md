# PrepPilot AI 🚀

PrepPilot AI is an AI-powered personalized interview preparation and learning roadmap platform built using Coral, Groq, Supabase, Next.js, and TailwindCSS.

## Problem

Most interview preparation platforms provide generic learning plans and static question banks. Users struggle because:

* learning is not personalized
* weak areas are not tracked
* previous learning history is ignored

## Solution

PrepPilot AI uses Coral as a memory retrieval layer to build personalized AI mentorship experiences.

The system:

* remembers previous interview chats
* tracks completed and pending learning tasks
* identifies weak technical areas
* generates adaptive AI roadmaps
* acts as a personalized AI interview trainer

---

# Features

## AI Interview Trainer

* Personalized interview preparation
* Context-aware AI responses
* Follow-up interview questions
* Weak-area focused learning

## AI Roadmap Generator

* Personalized learning roadmaps
* Beginner → Advanced structured plans
* Project suggestions
* Interview preparation guidance
* Weekly study plans

## Memory System (Coral + Supabase)

* Stores user interview history
* Tracks learning progress
* Retrieves contextual memory before AI generation

---

# Tech Stack

* Next.js 16
* TailwindCSS
* Supabase
* Groq API
* Coral AI
* React Markdown

---

# Architecture

User → Next.js Frontend → API Routes → Coral Memory Layer → Supabase Retrieval → Groq AI → Personalized Response

---

# Coral Usage

Coral is used as the primary memory retrieval layer.

It:

* retrieves previous interview conversations
* tracks user learning goals
* stores contextual learning memory
* improves AI personalization

---

# Future Improvements

* Voice interviews
* AI mock interview scoring
* Resume analysis
* Company-specific preparation
* Real-time AI coaching

---

# Demo

https://prep-pilot-ai-lac.vercel.app

# Author

Yogeswari B
