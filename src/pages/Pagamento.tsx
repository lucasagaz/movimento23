import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, QrCode, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const MONTHLY_PRICE = 30;

const plans = [
  { months: 1, discount: 0 },
  { months: 3, discount: 5 },
  { months: 6, discount: 10 },
  { months: 12, discount: 20 },
];

const paymentMethods = [
  { id: "pix", label: "PIX", icon: QrCode },
  { id: "credito", label: "Cartão de Crédito", icon: CreditCard },
  { id: "debito", label: "Débito", icon: Building },
];

const Pagamento = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState("");

  const plan = plans[selectedPlan];
  const totalOriginal = MONTHLY_PRICE * plan.months;
  const totalFinal = totalOriginal * (1 - plan.discount / 100);

  const handlePay = () => {
    if (!selectedMethod) {
      toast({ title: "Selecione uma forma de pagamento", variant: "destructive" });
      return;
    }
    // Update member with payment info
    const member = JSON.parse(localStorage.getItem("m23_member") || "{}");
    member.plano = plan.months;
    member.valorPago = totalFinal;
    member.metodoPagamento = selectedMethod;
    member.pagamentoEm = new Date().toISOString();
    localStorage.setItem("m23_member", JSON.stringify(member));
    toast({ title: "Pagamento realizado com sucesso! 🎉" });
    navigate("/painel");
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="font-display text-4xl font-bold uppercase text-center mb-2 text-foreground">
            Pagamento
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Escolha seu plano e forma de pagamento
          </p>

          {/* Plans */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {plans.map((p, i) => (
              <button
                key={p.months}
                onClick={() => setSelectedPlan(i)}
                className={`rounded-lg p-4 text-center transition-all border-2 ${
                  selectedPlan === i
                    ? "border-accent bg-primary text-primary-foreground blue-glow"
                    : "border-border bg-card text-foreground hover:border-secondary"
                }`}
              >
                <div className="font-display text-3xl font-bold">{p.months}</div>
                <div className="font-display text-xs uppercase tracking-wider">
                  {p.months === 1 ? "mês" : "meses"}
                </div>
                {p.discount > 0 && (
                  <div className="mt-2 bg-accent text-accent-foreground text-xs font-bold rounded-full px-2 py-0.5 inline-block">
                    -{p.discount}%
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Price summary */}
          <div className="bg-card rounded-lg p-6 mb-8 blue-glow">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Valor mensal</span>
              <span className="font-display text-lg text-foreground">R$ {MONTHLY_PRICE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Período</span>
              <span className="font-display text-foreground">{plan.months} {plan.months === 1 ? "mês" : "meses"}</span>
            </div>
            {plan.discount > 0 && (
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Desconto</span>
                <span className="font-display text-accent font-bold">-{plan.discount}%</span>
              </div>
            )}
            <div className="border-t border-border mt-4 pt-4 flex justify-between items-center">
              <span className="font-display text-lg uppercase text-foreground">Total</span>
              <div className="text-right">
                {plan.discount > 0 && (
                  <div className="text-muted-foreground line-through text-sm">R$ {totalOriginal.toFixed(2)}</div>
                )}
                <div className="font-display text-3xl font-bold text-secondary">
                  R$ {totalFinal.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Payment methods */}
          <h2 className="font-display text-xl uppercase mb-4 text-foreground">Forma de Pagamento</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {paymentMethods.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMethod(m.id)}
                className={`flex items-center gap-3 rounded-lg p-4 border-2 transition-all ${
                  selectedMethod === m.id
                    ? "border-accent bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-secondary"
                }`}
              >
                <m.icon className="h-6 w-6" />
                <span className="font-display text-sm uppercase tracking-wider">{m.label}</span>
              </button>
            ))}
          </div>

          <Button
            onClick={handlePay}
            className="w-full bg-accent text-accent-foreground font-display uppercase tracking-wider text-lg py-6 hover:brightness-110 gold-glow"
          >
            Finalizar Pagamento
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Pagamento;
