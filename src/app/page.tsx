import NavBar from "@/components/nav/navbar";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-bg">
      <NavBar />
      <main className="flex flex-col items-center min-h-screen">
        <h1>main</h1>
      </main>
      <footer className="flex flex-col items-center justify-center">
        <h1>footer</h1>
      </footer>
    </div>
  );
}
