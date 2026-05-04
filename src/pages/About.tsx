import { Link } from "react-router-dom";
import AnnouncementBar from "@/components/store/AnnouncementBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import WhatsAppButton from "@/components/store/WhatsAppButton";
import AboutSection from "@/components/store/AboutSection";
import TransformationSection from "@/components/store/TransformationSection";
import FeaturesBar from "@/components/store/FeaturesBar";

import regularPatch from "@/assets/regular-patch.png";
import premiumPatch from "@/assets/premium-patch.png";

const About = () => (
  <>
    <AnnouncementBar />
    <Header />
    
    <div className="container py-16 text-center">
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 uppercase tracking-tight">Expert Hair Solutions</h1>
      <p className="font-body text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
        Hyderabad's premier destination for high-end non-surgical hair restoration and custom grooming services.
      </p>
    </div>

    {/* Patch Work Selection Section */}
    <section className="container pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Regular Patch Work Card */}
        <Link 
          to="/products?tier=Regular" 
          className="group relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl border border-border shadow-lg transition-all duration-500 hover:shadow-gold/20"
        >
          <img 
            src={regularPatch} 
            alt="Regular Patch Work" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="inline-block bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest mb-4">Standard Service</span>
            <h2 className="font-display text-3xl font-bold text-white mb-3 uppercase">Regular Patch Work</h2>
            <p className="font-body text-white/70 text-sm mb-6 max-w-xs">High-quality everyday hair solutions starting from ₹9,999.</p>
            <div className="inline-flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
              Explore Regular Systems →
            </div>
          </div>
        </Link>

        {/* Premium Patch Work Card */}
        <Link 
          to="/products?tier=Premium" 
          className="group relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl border border-gold/30 shadow-lg transition-all duration-500 hover:shadow-gold/40 hover:border-gold"
        >
          <img 
            src={premiumPatch} 
            alt="Premium Patch Work" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="inline-block bg-gold text-charcoal px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest mb-4">Elite Service</span>
            <h2 className="font-display text-3xl font-bold text-gold mb-3 uppercase">Premium Patch Work</h2>
            <p className="font-body text-white/70 text-sm mb-6 max-w-xs">Luxurious undetectable hair systems with priority styling.</p>
            <div className="inline-flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
              View Premium Systems →
            </div>
          </div>
        </Link>
      </div>
    </section>

    <AboutSection />
    <TransformationSection />
    <FeaturesBar />
    <Footer />
    <CartDrawer />
    <WhatsAppButton />
  </>
);

export default About;
