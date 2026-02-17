import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.jpeg";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/", label: "Início" },
    { to: "/cadastro", label: "Associe-se" },
    { to: "/painel", label: "Meu Painel" },
  ];

  return (
    <header className="sticky top-0 z-50 hero-gradient border-b border-secondary/20">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Movimento 23" className="h-12 w-12 rounded-full object-cover" />
          <span className="font-display text-xl font-bold uppercase tracking-wider text-primary-foreground">
            Movimento 23
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-display text-sm uppercase tracking-wider transition-colors hover:text-accent ${
                location.pathname === link.to ? "text-accent" : "text-primary-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-primary-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden hero-gradient border-t border-secondary/20 px-4 pb-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 font-display text-sm uppercase tracking-wider ${
                location.pathname === link.to ? "text-accent" : "text-primary-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
