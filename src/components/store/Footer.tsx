import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-charcoal text-background/80 pt-16 pb-8">
    <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
      {/* Brand */}
      <div>
        <Link to="/" className="flex items-center gap-3 mb-4">
          <img src={logo} alt="Finixhair Studio" className="h-10 w-auto invert" />
          <span className="font-display text-lg font-bold text-background">Finixhair Studio</span>
        </Link>
        <p className="font-body text-sm text-background/60 leading-relaxed">
          Premium wigs and non-surgical hair solutions in Hyderabad. Restoring confidence, one strand at a time.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="font-display font-semibold text-background mb-4">Quick Links</h3>
        <div className="space-y-2">
          {[{ label: "Home", to: "/" }, { label: "About", to: "/about" }, { label: "All Products", to: "/products" }, { label: "Contact", to: "/contact" }, { label: "Book Consultation", to: "/consultation" }].map((l) => (
            <Link key={l.to} to={l.to} className="block font-body text-sm text-background/60 hover:text-gold transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-display font-semibold text-background mb-4">Categories</h3>
        <div className="space-y-2">
          {["Human Hair Wigs", "Synthetic Wigs", "Hair Systems", "Accessories", "Care Kits"].map((c) => (
            <Link key={c} to="/products" className="block font-body text-sm text-background/60 hover:text-gold transition-colors">
              {c}
            </Link>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div>
        <h3 className="font-display font-semibold text-background mb-4">Contact Us</h3>
        <div className="space-y-3">
          <a href="tel:+919705060222" className="flex items-center gap-3 font-body text-sm text-background/60 hover:text-gold transition-colors">
            <Phone className="w-4 h-4 text-gold" /> +91 9705060222
          </a>
          <a href="mailto:info@finixhairstudio.com" className="flex items-center gap-3 font-body text-sm text-background/60 hover:text-gold transition-colors">
            <Mail className="w-4 h-4 text-gold" /> info@finixhairstudio.com
          </a>
          <div className="flex items-start gap-3 font-body text-sm text-background/60">
            <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
            <span>Hyderabad, Telangana, India</span>
          </div>
          <a
            href="https://wa.me/919705060222?text=Hello%2C%20I%20have%20a%20query%20regarding%20wigs."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 font-body text-sm text-gold hover:text-gold-light transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp Expert – Vamsi
          </a>
        </div>
      </div>
    </div>

    <div className="container border-t border-background/10 pt-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-body text-xs text-background/40">© 2026 Finixhair Studio. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="font-body text-xs text-background/40 hover:text-gold transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="font-body text-xs text-background/40 hover:text-gold transition-colors">Terms of Service</Link>
          <Link to="/shipping" className="font-body text-xs text-background/40 hover:text-gold transition-colors">Shipping Policy</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
