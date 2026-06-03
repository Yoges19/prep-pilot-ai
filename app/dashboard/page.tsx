import DashboardCard from "@/components/DashboardCard";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
   <main className="flex-1 p-4">
    
     <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard title="Welcome to PrepPilot AI!" description="Your personalized interview preparation dashboard. Here you can track your progress, access your roadmap, and start training for your next interview." />
      <DashboardCard title="Progress Tracker" description="Track your interview preparation progress with our intuitive dashboard. See your completed tasks, upcoming milestones, and overall performance at a glance." />
      <DashboardCard title="Roadmap" description="Access your personalized interview preparation roadmap. Get a clear path to success with tailored recommendations and resources based on your goals and progress." />
      <DashboardCard title="Interview Trainer" description="Start training for your next interview with our AI-powered interview trainer. Practice common questions, get feedback, and improve your performance with personalized coaching." />
     </div>
   </main>
   </ProtectedRoute>
  
  );
}