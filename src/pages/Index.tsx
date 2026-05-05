import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Ticket, ShieldCheck, Newspaper, Camera, ChevronLeft, ChevronRight } from "lucide-react";

// Imports das imagens
import heroBg from "@/assets/hero-bg.jpeg";
import logo from "@/assets/logo.jpeg";
import foto1 from "@/assets/galeria1.jpg";
import foto2 from "@/assets/galeria2.jpg";
import foto3 from "@/assets/galeria3.jpg";
import foto4 from "@/assets/galeria4.jpg";

const features = [
  { icon: Users, title: "Comunidade", desc: "Faça parte de uma família que vive e respira Avaí." },
  { icon: Ticket, title: "Caravanas", desc: "Viaje com a torcida para jogos em todo o Brasil." },
  { icon: ShieldCheck, title: "Descontos", desc: "Materiais exclusivos com preços especiais para membros." },
  { icon: Newspaper, title: "Notícias", desc: "Fique por dentro de tudo sobre o Movimento 23." },
];

const Index = () => {
  const galeriaFotos = [foto1, foto2, foto3, foto4];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === galeriaFotos.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? galeriaFotos.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center border-b-8 border-[#0046BE]">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Ressacada" className="w-full h-full object-cover grayscale-[0.5]" />
          <div className="absolute inset-0 bg-[#0046BE]/70 mix-blend-multiply" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20 text-center text-white">
          <motion.img
            src={logo}
            alt="Movimento 23"
            className="mx-auto h-44 w-44 rounded-full object-cover mb-8 border-4 border-white shadow-xl"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          />
          <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-4">
            Movimento 23
          </h1>
          <p className="text-xl md:text-2xl font-light mb-10 uppercase tracking-[0.2em]">
            A essência da arquibancada.
          </p>
          <Link
            to="/cadastro"
            className="inline-block bg-white text-[#0046BE] text-xl font-bold uppercase px-12 py-5 shadow-2xl hover:bg-zinc-100 transition-all"
          >
            Associe-se Agora
          </Link>
        </div>
      </section>

      {/* 2. NOSSA HISTÓRIA */}
      <section className="py-24 bg-white text-[#0046BE]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-black uppercase mb-10 italic underline decoration-4 underline-offset-8">
            Nossa História
          </h2>
          <div className="space-y-6 text-xl font-medium leading-relaxed">
            <p>
              O Movimento 23 nasceu da paixão incondicional pelo Avaí Futebol Clube. Somos uma torcida organizada que acredita no poder da união, da raça e do amor ao manto azul e branco.
            </p>
            <p>
              Desde nossa fundação, estivemos presentes nos momentos mais importantes do clube, sempre apoiando dentro e fora de campo. Nossa missão é fortalecer a torcida avaiana e ser a voz da Ressacada.
            </p>
          </div>
        </div>
      </section>

      {/* 3. POR QUE SER M23 */}
      <section className="py-24 bg-zinc-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center uppercase mb-16 text-[#0046BE] italic">
            Vantagens de ser M23
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div key={f.title} className="border-2 border-[#0046BE] p-8 text-center hover:bg-[#0046BE] hover:text-white transition-all group">
                <f.icon className="mx-auto h-12 w-12 text-[#0046BE] mb-6 group-hover:text-white" />
                <h3 className="text-2xl font-black uppercase mb-3">{f.title}</h3>
                <p className="text-sm font-medium opacity-80">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALERIA (ESTILO CARROSSEL INSTAGRAM) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-12 text-[#0046BE]">
            <Camera className="h-8 w-8" />
            <h2 className="text-4xl font-black uppercase italic">Nossa Pulsação</h2>
          </div>

          <div className="relative max-w-4xl mx-auto group">
            {/* Imagem Principal */}
            <div className="relative h-[300px] md:h-[500px] overflow-hidden rounded-sm shadow-2xl border-4 border-white">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={galeriaFotos[currentIndex]}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Botões de Navegação */}
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-[#0046BE] transition-colors"
              >
                <ChevronLeft size={32} />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-[#0046BE] transition-colors"
              >
                <ChevronRight size={32} />
              </button>
            </div>

            {/* Indicadores (Pontinhos) */}
            <div className="flex justify-center gap-2 mt-6">
              {galeriaFotos.map((_, index) => (
                <div 
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all ${index === currentIndex ? "bg-[#0046BE] w-8" : "bg-zinc-300"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. MÚSICA FINAL */}
      <section className="py-24 bg-[#0046BE] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="border-t-2 border-white/20 pt-16"
          >
            <h3 className="text-3xl md:text-5xl font-black uppercase italic leading-tight">
              "É o time da raça,<br/> 
              vamos em busca da taça,<br/>
              <span className="text-white/50">Avaí é paixão, vamo vamo Leão!"</span>
            </h3>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;