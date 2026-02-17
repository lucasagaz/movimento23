import logo from "@/assets/logo.jpeg";

const Footer = () => (
  <footer className="hero-gradient py-8 mt-auto">
    <div className="container mx-auto px-4 flex flex-col items-center gap-4">
      <img src={logo} alt="Movimento 23" className="h-16 w-16 rounded-full object-cover" />
      <p className="font-display text-primary-foreground/80 text-sm uppercase tracking-wider">
        Movimento 23 — Torcida do Avaí F.C.
      </p>
      <p className="text-primary-foreground/50 text-xs">
        © 2025 Movimento 23. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
