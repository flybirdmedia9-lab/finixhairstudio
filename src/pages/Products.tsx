import AnnouncementBar from "@/components/store/AnnouncementBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import WhatsAppButton from "@/components/store/WhatsAppButton";
import HairSystemsShowcase from "@/components/store/HairSystemsShowcase";
import CategoryHeader from "@/components/store/CategoryHeader";
import heroAmbassador1 from "@/assets/hero-ambassador-1.jpg";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Products = () => {
  return (
    <>
      <AnnouncementBar />
      <Header />
      
      <CategoryHeader 
        title="Hair Systems" 
        subtitle="Explore our exclusive range of natural-looking hair solutions"
        image={heroAmbassador1}
        badge="Luxury Collection"
      />

      {/* Breadcrumbs */}
      <div className="bg-off-white border-b border-border/40">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-xs font-body text-muted-foreground">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">Hair Systems Collection</span>
          </div>
        </div>
      </div>

      <div className="bg-background">
        {/* Full Products View with Filters */}
        <HairSystemsShowcase isHomePage={false} />
      </div>

      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </>
  );
};

export default Products;
