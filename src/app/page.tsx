import NavBar from "@/components/nav/navbar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-bg">
      <NavBar />
      <main className="flex flex-col items-center justify-center w-full flex-grow">
        <div className="flex flex-1 flex-row w-full h-full py-20 px-28 gap-x-44">
          <div className="w-1/2 h-full">
            <div className="flex flex-row justify-between">
              <div className="relative w-2/3">
                <Input
                  type="search"
                  className="shadow-xl bg-bg border-2 border-border-pizza rounded-lg pl-10"
                  placeholder="Digite aqui sua pesquisa..."
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
              <div>Listar Categorias</div>
            </div>
          </div>
          <div className="w-1/2 h-full">c</div>
        </div>
      </main>
      <footer className="flex flex-col items-center justify-center w-full">
        <h1>footer</h1>
      </footer>
    </div>
  );
}
