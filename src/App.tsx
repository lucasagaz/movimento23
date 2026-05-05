import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Cadastro from "./pages/Cadastro";
import Pagamento from "./pages/Pagamento";
import Painel from "./pages/Painel";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/movimento23">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              {/* Página Principal com o novo design de torcida */}
              <Route path="/" element={<Index />} />
              
              {/* Rotas de Fluxo do Sócio */}
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/pagamento" element={<Pagamento />} />
              <Route path="/painel" element={<Painel />} />
              
              {/* Painel Administrativo Oculto */}
              <Route path="/admin-m23-secreto-99" element={<Admin />} />
              
              {/* Rota de Erro (sempre por último) */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;