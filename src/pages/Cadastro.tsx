import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { User, CreditCard, ArrowRight, CheckCircle2 } from "lucide-react";

// --- IMPORTAÇÕES DO FIREBASE ---
import { db } from "../firebaseConfig"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Cadastro = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [planoSelecionado, setPlanoSelecionado] = useState(1);
  
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    nascimento: "",
  });

  const planos = [
    { id: 1, meses: 1, desconto: 0, valor: 30 },
    { id: 3, meses: 3, desconto: 5, valor: 85.5 },
    { id: 6, meses: 6, desconto: 10, valor: 162 },
    { id: 12, meses: 12, desconto: 20, valor: 288 },
  ];

  const planoAtual = planos.find((p) => p.meses === planoSelecionado) || planos[0];

  // --- MÁSCARAS ---
  const formatCPF = (v: string) => {
    const nums = v.replace(/\D/g, "").slice(0, 11);
    return nums
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const formatPhone = (v: string) => {
    const nums = v.replace(/\D/g, "").slice(0, 11);
    if (nums.length <= 10) return nums.replace(/(\d{2})(\d{4})(\d+)/, "($1) $2-$3");
    return nums.replace(/(\d{2})(\d{5})(\d+)/, "($1) $2-$3");
  };

  const handleChange = (field: string, value: string) => {
    if (field === "cpf") value = formatCPF(value);
    if (field === "telefone") value = formatPhone(value);
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // --- SUBMISSÃO ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const cpfClean = form.cpf.replace(/\D/g, "");
    if (cpfClean.length !== 11) {
      toast({ title: "CPF inválido", description: "Digite um CPF com 11 dígitos.", variant: "destructive" });
      return;
    }
    if (!form.email.includes("@")) {
      toast({ title: "E-mail inválido", variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, "socios"), {
        ...form,
        cpfLimpo: cpfClean,
        planoId: planoAtual.id,
        valorPlano: planoAtual.valor,
        status: "pendente",
        ativo: false,
        criadoEm: serverTimestamp(),
      });

      localStorage.setItem("m23_member_id", docRef.id);
      
      toast({
        title: "Cadastro realizado!",
        description: "Seus dados foram salvos. Redirecionando...",
      });

      // AJUSTADO: Voltando para a Home até termos a integração do Mercado Pago
      navigate("/painel");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast({
        title: "Erro no servidor",
        description: "Não foi possível salvar seus dados.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-black text-secondary uppercase tracking-tighter italic">
            Faça parte do <span className="text-primary">Movimento 23</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Sua jornada como sócio oficial começa aqui.</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8 items-start">
          <Card className="lg:col-span-2 p-8 shadow-xl border-none bg-white/90 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-8 border-b pb-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <User className="text-primary w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-secondary uppercase italic">1. Dados do Sócio</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nome" className="font-bold text-[10px] uppercase text-slate-400 ml-1">Nome Completo</Label>
                <Input 
                  id="nome" 
                  value={form.nome}
                  onChange={(e) => handleChange("nome", e.target.value)}
                  required
                  placeholder="Ex: Lucas Aguiar" 
                  className="bg-slate-50 border-slate-200 h-12" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf" className="font-bold text-[10px] uppercase text-slate-400 ml-1">CPF</Label>
                <Input 
                  id="cpf" 
                  value={form.cpf}
                  onChange={(e) => handleChange("cpf", e.target.value)}
                  required
                  placeholder="000.000.000-00" 
                  className="bg-slate-50 border-slate-200 h-12" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-bold text-[10px] uppercase text-slate-400 ml-1">E-mail</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  placeholder="seu@email.com" 
                  className="bg-slate-50 border-slate-200 h-12" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone" className="font-bold text-[10px] uppercase text-slate-400 ml-1">Telefone (Celular)</Label>
                <Input 
                  id="telefone" 
                  value={form.telefone}
                  onChange={(e) => handleChange("telefone", e.target.value)}
                  required
                  placeholder="(48) 99999-9999" 
                  className="bg-slate-50 border-slate-200 h-12" 
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="nascimento" className="font-bold text-[10px] uppercase text-slate-400 ml-1">Data de Nascimento</Label>
                <Input 
                  id="nascimento" 
                  type="date"
                  value={form.nascimento}
                  onChange={(e) => handleChange("nascimento", e.target.value)}
                  required
                  className="bg-slate-50 border-slate-200 h-12" 
                />
              </div>
            </div>

            <div className="mt-12 flex items-center gap-2 mb-8 border-b pb-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <CreditCard className="text-primary w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-secondary uppercase italic">2. Selecione sua Adesão</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {planos.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlanoSelecionado(p.meses)}
                  className={`relative p-5 rounded-2xl border-2 transition-all duration-300 text-center flex flex-col items-center justify-center gap-1 ${
                    planoSelecionado === p.meses 
                    ? "border-primary bg-primary/5 shadow-lg scale-105" 
                    : "border-slate-100 bg-white hover:border-slate-300"
                  }`}
                >
                  {p.desconto > 0 && (
                    <span className="absolute -top-3 bg-yellow-400 text-[9px] font-black px-2 py-1 rounded-full text-secondary uppercase italic">
                      -{p.desconto}% OFF
                    </span>
                  )}
                  <span className="text-3xl font-black text-secondary leading-none">{p.meses}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.meses === 1 ? 'Mês' : 'Meses'}</span>
                  {planoSelecionado === p.meses && <CheckCircle2 className="w-4 h-4 text-primary mt-1" />}
                </button>
              ))}
            </div>
          </Card>

          <div className="space-y-6 sticky top-8">
            <Card className="p-6 shadow-2xl border-none bg-secondary text-white overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-lg font-bold uppercase italic border-b border-white/10 pb-4 mb-6">Resumo do Pedido</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Plano Selecionado:</span>
                    <span className="font-bold underline decoration-primary underline-offset-4">
                      {planoAtual.meses} {planoAtual.meses === 1 ? 'Mês' : 'Meses'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Valor mensal:</span>
                    <span className="font-medium text-slate-200 italic">R$ 30,00</span>
                  </div>
                  {planoAtual.desconto > 0 && (
                    <div className="flex justify-between text-sm bg-green-500/10 p-2 rounded-lg text-green-400 border border-green-500/20">
                      <span>Economia:</span>
                      <span className="font-black">-{planoAtual.desconto}%</span>
                    </div>
                  )}
                  <div className="pt-6 mt-6 border-t border-white/10 flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Total a investir:</span>
                    <span className="text-4xl font-black text-primary italic leading-none">
                      R$ {planoAtual.valor.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Button 
              type="submit"
              disabled={loading}
              className="w-full h-16 bg-primary hover:bg-primary/90 text-secondary font-black text-xl uppercase italic shadow-lg group transition-all"
            >
              {loading ? "Gravando Dados..." : (
                <span className="flex items-center gap-2">
                  Finalizar Cadastro
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;