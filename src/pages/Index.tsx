import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Ticket, ShieldCheck, Newspaper } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpeg";
import logo from "@/assets/logo.jpeg";

const features = [
  { icon: Users, title: "Comunidade", desc: "Faça parte de uma família que vive e respira Avaí." },
  { icon: Ticket, title: "Caravanas", desc: "Viaje com a torcida para jogos em todo o Brasil." },
  { icon: ShieldCheck, title: "Descontos", desc: "Materiais exclusivos com preços especiais para membros." },
  { icon: Newspaper, title: "Notícias", desc: "Fique por dentro de tudo sobre o Movimento 23." },
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Movimento 23 background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-gradient opacity-85" />
        </div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <motion.img
            src={logo}
            alt="Movimento 23"
            className="mx-auto h-40 w-40 rounded-full object-cover mb-8 border-4 border-accent animate-pulse-glow"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
          <motion.h1
            className="font-display text-5xl md:text-7xl font-bold uppercase text-primary-foreground mb-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Movimento 23
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            A torcida que não para! Unidos pela paixão ao Avaí F.C., somos a voz que ecoa nas arquibancadas.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link
              to="/cadastro"
              className="inline-block bg-accent text-accent-foreground font-display text-lg uppercase tracking-wider px-8 py-4 rounded-lg hover:brightness-110 transition-all gold-glow"
            >
              Associe-se Agora
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center uppercase mb-12 text-foreground">
            Por que ser <span className="text-secondary">Movimento 23</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="bg-card rounded-lg p-6 text-center blue-glow hover:scale-105 transition-transform"
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <f.icon className="mx-auto h-10 w-10 text-secondary mb-4" />
                <h3 className="font-display text-xl font-bold uppercase mb-2 text-foreground">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* História */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase mb-8 text-primary-foreground">
            Nossa História
          </h2>
          <p className="text-primary-foreground/80 leading-relaxed mb-6">
            O Movimento 23 nasceu da paixão incondicional pelo Avaí Futebol Clube. Somos uma torcida organizada que acredita no poder da união, da raça e do amor ao manto azul e branco. Nosso nome carrega o número que representa nossa identidade — o 23, símbolo de garra e determinação.
          </p>
          <p className="text-primary-foreground/80 leading-relaxed mb-8">
            Desde nossa fundação, estivemos presentes nos momentos mais importantes do clube, sempre apoiando dentro e fora de campo. Nossa missão é fortalecer a torcida avaiana e levar o nome do Leão da Ilha a todos os cantos.
          </p>
          <Link
            to="/cadastro"
            className="inline-block border-2 border-accent text-accent font-display uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all"
          >
            Faça Parte Dessa História
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
