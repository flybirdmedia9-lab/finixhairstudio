import AnnouncementBar from "@/components/store/AnnouncementBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import CategoryHeader from "@/components/store/CategoryHeader";
import WhatsAppButton from "@/components/store/WhatsAppButton";
import { motion } from "framer-motion";

// Reusing assets
import heroAmbassador1 from "@/assets/hero-ambassador-1.jpg";
import heroTransformationSplit from "@/assets/hero-transformation-split.png";
import heroTransformationSplit2 from "@/assets/hero-transformation-split-2.png";
import heroTransformationSplit3 from "@/assets/hero-transformation-split-3.png";
import heroTechThinskin from "@/assets/hero-tech-thinskin.png";
import heroTechLace from "@/assets/hero-tech-lace.png";
import heroTechMono from "@/assets/hero-tech-mono.png";

const galleryItems = [
  { id: 1, image: heroTransformationSplit, title: "Natural Transformation", category: "Before & After", position: "center" },
  { id: 2, image: heroAmbassador1, title: "Elite Styling", category: "Lifestyle", position: "right" },
  { id: 3, image: heroTransformationSplit2, title: "Volume Restoration", category: "Before & After", position: "center" },
  { id: 5, image: heroTransformationSplit3, title: "Invisible Hairline", category: "Before & After", position: "center" },
  { id: 6, image: heroTechLace, title: "Breathable Lace Base", category: "Technical", position: "center" },
  { id: 7, image: heroTechMono, title: "Durable Mono System", category: "Technical", position: "center" },
];

const Gallery = () => {
  return (
    <>
      <AnnouncementBar />
      <Header />
      
      <CategoryHeader 
        title="Studio Gallery" 
        subtitle="Witness the art of hair restoration and premium grooming"
        image={heroAmbassador1}
        badge="Visual Excellence"
      />

      <main className="bg-background py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-[4/5] overflow-hidden bg-charcoal rounded-sm"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  style={{ objectPosition: (item as any).position || "center" }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                  <span className="text-gold font-body text-[10px] font-bold uppercase tracking-widest mb-2 block">
                    {item.category}
                  </span>
                  <h3 className="text-white font-display text-2xl font-bold uppercase">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <p className="font-body text-muted-foreground text-sm uppercase tracking-widest mb-8">
              Want a transformation like these?
            </p>
            <a 
              href="/consultation" 
              className="inline-block bg-gold text-charcoal px-10 py-4 rounded font-body text-xs font-bold uppercase hover:bg-gold-dark transition-all hover:scale-105"
            >
              Book Your Free Consultation
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Gallery;
