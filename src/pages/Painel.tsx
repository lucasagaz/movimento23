import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Download, 
  MessageCircle, 
  ChevronRight,
  ShieldCheck,
  Calendar,
  LayoutDashboard
} from "lucide-react";

// IMPORTANDO AS IMAGENS CORRETAMENTE DA PASTA ASSETS
import camisetaImg from "../assets/camiseta-news.jpeg";
import logoImg from "../assets/logo.jpeg";

const Painel = () => {
  const [socio] = useState({
    nome: "LUCAS SAGAZ DA SILVA",
    cpf: "111.111.111-11",
    plano: "Plano Mensal",
    inicio: "13/04/2026",
    status: "Ativo"
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* HEADER DO PAINEL */}
      <div className="bg-secondary text-white py-12 px-4 shadow-xl">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-2xl border border-white/20">
                <LayoutDashboard className="text-white w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-black uppercase italic tracking-tighter">
                  Meu <span className="text-white opacity-90">Painel</span>
                </h1>
                <p className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">Área exclusiva do associado</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm">
              <div className="bg-white rounded-full p-2">
                <ShieldCheck className="text-secondary w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-300 leading-none">Status</p>
                <p className="text-lg font-black text-white uppercase italic">Sócio Ativo</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-8 grid lg:grid-cols-3 gap-8">
        
        {/* COLUNA ESQUERDA: CARTEIRINHA E DADOS */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative bg-secondary rounded-[25px] p-8 shadow-[0_20px_50px_rgba(30,41,59,0.3)] overflow-hidden border-2 border-white/10"
          >
            <div className="absolute -right-10 -bottom-10 opacity-10 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-10">
                <div className="bg-white p-2 rounded-xl">
                   {/* Usando a logo importada */}
                   <img src={logoImg} alt="M23" className="w-12 h-12 object-contain" />
                </div>
                <Badge className="bg-white text-secondary font-black italic uppercase text-[10px] px-3">Membro 23</Badge>
              </div>

              <div className="space-y-1 mb-10">
                <p className="text-[9px] uppercase font-bold text-white/50 tracking-[0.3em]">Nome do Sócio</p>
                <h2 className="text-2xl font-black text-white italic tracking-tight uppercase">{socio.nome}</h2>
              </div>

              <div className="flex justify-between items-end border-t border-white/10 pt-6">
                <div>
                  <p className="text-[9px] uppercase font-bold text-white/40 leading-none mb-1">Membro desde</p>
                  <p className="text-sm font-bold text-white">{socio.inicio}</p>
                </div>
                <div className="text-right">
                   <p className="text-[9px] uppercase font-bold text-white/40 leading-none mb-1">Categoria</p>
                   <p className="text-sm font-black text-white uppercase italic">{socio.plano}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <Card className="p-6 border-none shadow-xl bg-white/90">
            <h3 className="font-black uppercase italic text-secondary mb-4 flex items-center gap-2 border-b pb-2">
              <User className="w-4 h-4 text-secondary" /> Informações
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex flex-col">
                <span className="text-slate-400 font-bold uppercase text-[9px]">CPF</span>
                <span className="font-bold text-secondary">{socio.cpf}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 font-bold uppercase text-[9px]">Nascimento</span>
                <span className="font-bold text-secondary">04/04/2005</span>
              </div>
              <button className="w-full py-3 rounded-xl bg-slate-100 text-secondary font-black text-[10px] uppercase hover:bg-slate-200 transition-colors mt-2">
                Solicitar alteração
              </button>
            </div>
          </Card>
        </div>

        {/* COLUNA DIREITA */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center justify-between p-6 bg-secondary text-white rounded-2xl shadow-xl hover:translate-y-[-4px] transition-all group">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-black uppercase italic leading-none">Comunidade M23</p>
                  <p className="text-[10px] text-white/50 uppercase mt-1">Acessar WhatsApp</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/30" />
            </button>

            <button className="flex items-center justify-between p-6 bg-white text-secondary rounded-2xl shadow-xl border border-slate-100 hover:translate-y-[-4px] transition-all group">
              <div className="flex items-center gap-4">
                <div className="bg-secondary/5 p-3 rounded-xl">
                  <Download className="w-6 h-6 text-secondary" />
                </div>
                <div className="text-left">
                  <p className="font-black uppercase italic leading-none">Downloads</p>
                  <p className="text-[10px] text-slate-400 uppercase mt-1">Kit Digital do Sócio</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-secondary/30" />
            </button>
          </div>

          {/* MURAL DE NOVIDADES */}
          <div className="space-y-6 mt-8">
            <h3 className="text-xl font-black uppercase italic text-secondary flex items-center gap-2">
               <Calendar className="text-secondary w-6 h-6" /> Notícias e Avisos
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="group overflow-hidden border-none shadow-2xl cursor-pointer bg-white">
                <div className="relative overflow-hidden aspect-video flex items-center justify-center bg-slate-100">
                  {/* Usando a variável importada */}
                  <img 
                    src={camisetaImg} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt="Nova Camiseta"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white text-secondary font-black italic uppercase text-[9px] shadow-md">Loja Oficial</Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-black uppercase italic text-secondary leading-tight mb-2 group-hover:text-blue-600 transition-colors">Nova Camiseta Movimento 23</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Garanta já a camiseta oficial do Movimento 23 por apenas R$70,00!</p>
                </div>
              </Card>

              <Card className="group overflow-hidden border-none shadow-2xl cursor-pointer bg-white">
                <div className="relative overflow-hidden aspect-video flex items-center justify-center bg-slate-100">
                  {/* Usando a variável importada */}
                  <img 
                    src={logoImg} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt="Assembleia"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-secondary text-white font-black italic uppercase text-[9px] shadow-md">Institucional</Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-black uppercase italic text-secondary leading-tight mb-2 group-hover:text-blue-600 transition-colors">Assembleia Geral dos Membros</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Participe da próxima assembleia e tenha voz na torcida.</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Painel;