import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, User, Menu, X, Search, Phone, Instagram, Facebook } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-charcoal/95 backdrop-blur-md py-4 shadow-xl" : "bg-transparent py-6"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <span className="font-display font-bold text-xl text-charcoal">F</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold tracking-tight text-white leading-none">FINIX</span>
            <span className="font-body text-[10px] tracking-[0.3em] text-gold uppercase leading-none mt-1">Hair Studio</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-body text-xs font-bold uppercase tracking-widest transition-colors ${
                location.pathname === link.path ? "text-gold" : "text-white/70 hover:text-gold"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-6">
          <button className="hidden sm:block text-white/70 hover:text-gold transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          <Link to="/account" className="text-white/70 hover:text-gold transition-colors flex items-center gap-2">
            <User className="w-5 h-5" />
            <span className="hidden xl:block font-body text-[10px] font-bold uppercase tracking-widest">
              {/* Force it to say "Account" even if admin is logged in to keep it hidden */}
              Account
            </span>
          </Link>

          <Link to="/checkout" className="relative text-white/70 hover:text-gold transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-charcoal text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {totalItems}
              </span>
            )}
          </Link>

          <Link 
            to="/consultation" 
            className="hidden md:block bg-gold hover:bg-gold-dark text-charcoal px-6 py-2.5 rounded-full font-body text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
          >
            Book Now
          </Link>

          <button 
            className="lg:hidden text-white hover:text-gold transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-charcoal border-t border-white/5 overflow-hidden"
          >
            <div className="container py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="font-display text-2xl font-bold text-white hover:text-gold transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-white/5 flex gap-6">
                <Link to="/account" className="text-white/50 hover:text-gold" onClick={() => setIsMobileMenuOpen(false)}><User className="w-6 h-6" /></Link>
                <Link to="https://instagram.com" className="text-white/50 hover:text-gold"><Instagram className="w-6 h-6" /></Link>
                <Link to="https://facebook.com" className="text-white/50 hover:text-gold"><Facebook className="w-6 h-6" /></Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
