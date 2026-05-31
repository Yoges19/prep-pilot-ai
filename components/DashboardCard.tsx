export default function DashboardCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white/10 hover:scale-105 backdrop-blur-lg border border-white/20 p-4 rounded-4xl shadow-xl">
      <h3 className="text-lg font-bold mb-2 text-cyan-200">{title}</h3>
      <p className="text-gray-200">{description}</p>
    </div>
  );
}