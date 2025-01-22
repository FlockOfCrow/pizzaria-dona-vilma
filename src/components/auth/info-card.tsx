export default function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-bg border-[1px] border-border-pizza shadow p-4 rounded-2xl">
      {children}
    </div>
  );
}
