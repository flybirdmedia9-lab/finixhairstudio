import { Link } from "react-router-dom";
import { Crown, Gem, ShieldCheck } from "lucide-react";
import product6 from "@/assets/product-6.jpg";

const PremiumSection = () => (
  <section className="py-8 bg-background">
    <div className="container">
      <div className="bg-charcoal text-background rounded p-5 md:p-7 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 items-center overflow-hidden">
      <div>
        <p className="font-body text-gold text-xs tracking-[0.25em] uppercase mb-3">Premium Collection</p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          {[{ icon: Gem, label: "100% natural hair" }, { icon: Crown, label: "Premium-quality base" }, { icon: ShieldCheck, label: "Long-lasting hold" }].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="w-5 h-5 text-gold" />
              <span className="font-body text-sm text-background/80">{label}</span>
            </div>
          ))}
          <Link to="/products?category=Hair%20Systems&sub=Premium" className="inline-flex items-center justify-center bg-gold text-accent-foreground px-5 py-3 rounded font-body text-xs font-bold uppercase hover:bg-gold-dark transition-colors">
            View Premium Products
          </Link>
        </div>
      </div>
      <img src={product6} alt="Premium Finix Hair Studio hair system" className="w-full max-h-44 object-cover rounded border border-background/10" loading="lazy" />
      </div>
    </div>
  </section>
);

export default PremiumSection;
