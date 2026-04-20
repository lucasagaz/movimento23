import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// --- IMPORTAÇÕES DO FIREBASE ---
import { db } from "../firebaseConfig"; // Ajuste o caminho se seu arquivo estiver em outra pasta
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Cadastro = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false); // Estado para o botão de carregar
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    nascimento: "",
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações originais
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
      // --- SALVAMENTO REAL NO FIREBASE ---
      const docRef = await addDoc(collection(db, "socios"), {
        ...form,
        cpfLimpo: cpfClean,
        status: "pendente",
        ativo: false,
        criadoEm: serverTimestamp(),
      });

      // Salva no localStorage apenas para controle da sessão atual, se precisar
      localStorage.setItem("m23_member_id", docRef.id);
      
      toast({
        title: "Cadastro realizado!",
        description: "Seus dados foram salvos. Vamos para o pagamento.",
      });

      navigate("/pagamento");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast({
        title: "Erro no servidor",
        description: "Não foi possível salvar seus dados. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-lg">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl font-bold uppercase text-center mb-2 text-foreground">
            Associe-se
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Preencha seus dados para fazer parte do Movimento 23
          </p>

          <form onSubmit={handleSubmit} className="bg-card rounded-lg p-6 blue-glow space-y-5">
            <div>
              <Label htmlFor="nome" className="font-display uppercase text-sm">Nome Completo</Label>
              <Input
                id="nome"
                value={form.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                required
                placeholder="Seu nome completo"
                className="mt-1"
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="cpf" className="font-display uppercase text-sm">CPF</Label>
              <Input
                id="cpf"
                value={form.cpf}
                onChange={(e) => handleChange("cpf", e.target.value)}
                required
                placeholder="000.000.000-00"
                className="mt-1"
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="email" className="font-display uppercase text-sm">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                placeholder="seu@email.com"
                className="mt-1"
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="telefone" className="font-display uppercase text-sm">Telefone (Celular)</Label>
              <Input
                id="telefone"
                value={form.telefone}
                onChange={(e) => handleChange("telefone", e.target.value)}
                required
                placeholder="(48) 99999-9999"
                className="mt-1"
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="nascimento" className="font-display uppercase text-sm">Data de Nascimento</Label>
              <Input
                id="nascimento"
                type="date"
                value={form.nascimento}
                onChange={(e) => handleChange("nascimento", e.target.value)}
                required
                className="mt-1"
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary text-secondary-foreground font-display uppercase tracking-wider text-lg py-6 hover:brightness-110"
            >
              {loading ? "Processando..." : "Continuar para Pagamento"}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Cadastro;