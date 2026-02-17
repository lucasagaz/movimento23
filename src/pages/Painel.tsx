import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, CalendarDays, CheckCircle, XCircle } from "lucide-react";
import logo from "@/assets/logo.jpeg";
import camisetaNews from "@/assets/camiseta-news.jpeg";

interface Member {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  nascimento: string;
  associadoEm: string;
  ativo: boolean;
  plano?: number;
  valorPago?: number;
}

const news = [
  {
    title: "Nova Camiseta Movimento 23",
    desc: "Garanta já a camiseta oficial do Movimento 23 por apenas R$70,00!",
    image: camisetaNews,
  },
  {
    title: "Caravana para o próximo jogo",
    desc: "Ônibus saindo de Florianópolis para a partida fora de casa. Inscreva-se!",
    image: null,
  },
  {
    title: "Assembleia Geral dos Membros",
    desc: "Participe da próxima assembleia e tenha voz na torcida.",
    image: null,
  },
];

const Painel = () => {
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("m23_member");
    if (data) setMember(JSON.parse(data));
  }, []);

  if (!member) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl mb-4 text-foreground">Você ainda não é associado</h2>
          <Link
            to="/cadastro"
            className="inline-block bg-secondary text-secondary-foreground font-display uppercase px-6 py-3 rounded-lg"
          >
            Associe-se
          </Link>
        </div>
      </div>
    );
  }

  const dataAssociacao = new Date(member.associadoEm).toLocaleDateString("pt-BR");

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="font-display text-4xl font-bold uppercase text-center mb-8 text-foreground">
            Meu Painel
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Digital Card */}
            <div className="relative overflow-hidden rounded-2xl hero-gradient p-6 min-h-[240px] flex flex-col justify-between blue-glow">
              <img
                src={logo}
                alt="bg"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-10 object-contain"
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-xs uppercase tracking-[0.2em] text-primary-foreground/60">
                    Carteirinha Digital
                  </span>
                  <img src={logo} alt="Movimento 23" className="h-10 w-10 rounded-full object-cover" />
                </div>
                <h3 className="font-display text-2xl font-bold text-primary-foreground uppercase">
                  {member.nome}
                </h3>
              </div>
              <div className="relative z-10 flex items-center justify-between mt-4">
                <div>
                  <div className="text-primary-foreground/60 text-xs uppercase">Associado em</div>
                  <div className="text-primary-foreground font-display">{dataAssociacao}</div>
                </div>
                <div className="flex items-center gap-2">
                  {member.ativo ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-accent" />
                      <span className="font-display text-sm uppercase text-accent font-bold">Ativa</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-destructive" />
                      <span className="font-display text-sm uppercase text-destructive font-bold">Inativa</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Member Info */}
            <div className="bg-card rounded-lg p-6 blue-glow">
              <h3 className="font-display text-lg uppercase mb-4 text-foreground flex items-center gap-2">
                <User className="h-5 w-5 text-secondary" /> Meus Dados
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nome</span>
                  <span className="text-foreground font-medium">{member.nome}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CPF</span>
                  <span className="text-foreground font-medium">{member.cpf}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">E-mail</span>
                  <span className="text-foreground font-medium">{member.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Telefone</span>
                  <span className="text-foreground font-medium">{member.telefone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nascimento</span>
                  <span className="text-foreground font-medium">{member.nascimento}</span>
                </div>
                {member.plano && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plano</span>
                    <span className="text-foreground font-medium">{member.plano} {member.plano === 1 ? "mês" : "meses"}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* News */}
          <h2 className="font-display text-2xl uppercase mb-6 text-foreground flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-secondary" /> Notícias e Novidades
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((n, i) => (
              <motion.div
                key={n.title}
                className="bg-card rounded-lg overflow-hidden blue-glow hover:scale-105 transition-transform"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                {n.image && (
                  <img src={n.image} alt={n.title} className="w-full h-48 object-cover" />
                )}
                {!n.image && (
                  <div className="w-full h-48 hero-gradient flex items-center justify-center">
                    <img src={logo} alt="Movimento 23" className="h-20 w-20 opacity-30" />
                  </div>
                )}
                <div className="p-4">
                  <h4 className="font-display text-lg font-bold uppercase mb-2 text-foreground">{n.title}</h4>
                  <p className="text-muted-foreground text-sm">{n.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Painel;
