export default function GamePageBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full min-w-0 max-w-full bg-gray-950 text-white">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {children}
      </div>
    </div>
  );
}
