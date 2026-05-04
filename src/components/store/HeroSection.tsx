import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, Phone, ChevronRight } from "lucide-react";

import heroAmbassador1 from "@/assets/hero-ambassador-1.jpg";
import heroTransformationSplit from "@/assets/hero-transformation-split.png";
import heroTransformationSplit2 from "@/assets/hero-transformation-split-2.png";
import heroTransformationSplit3 from "@/assets/hero-transformation-split-3.png";

const trustBadges = ["Studio Expert Fit", "Natural Finish", "Trusted by South Customers"];

const heroSlides = [
  { image: heroAmbassador1, eyebrow: "Celebrity Style", title: "Finix Hair Studio", offer: "Premium Grooming", copy: "Hyderabad's destination for elite hair solutions", layout: "full", position: "center" },
  { image: heroTransformationSplit, eyebrow: "Natural Results", title: "Before & After", offer: "Expert Transformation", copy: "Perfectly blended hair replacement results by experts", layout: "split", position: "top" },
  { image: heroTransformationSplit2, eyebrow: "Studio Quality", title: "Transformation", offer: "Confident Look", copy: "Restoring volume and confidence with custom systems", layout: "split", position: "center" },
];

const availabilitySlots = [
  { day: "Mon – Sat", time: "10:00 AM – 8:00 PM" },
  { day: "Sunday", time: "11:00 AM – 6:00 PM" },
];

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const slide = heroSlides[activeSlide];
  const isSplit = slide.layout === "split";

  return (
    <>
      <section className="relative h-[550px] md:h-[650px] overflow-hidden bg-charcoal">
        {isSplit ? (
          /* Split Layout: Text on Left, Image on Right */
          <div className="flex h-full flex-col lg:flex-row">
            {/* Content Side (Left) */}
            <div className="w-full lg:w-[40%] flex items-center z-10 bg-charcoal relative border-r border-white/5">
              <div className="container py-12 lg:py-0 lg:px-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-xl text-left"
                  >
                    <span className="inline-flex bg-gold text-charcoal px-4 py-2 rounded font-body text-[10px] font-bold uppercase tracking-widest mb-6">
                      {slide.eyebrow}
                    </span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-6 uppercase">
                      {slide.title}
                    </h1>
                    <p className="font-display text-2xl md:text-3xl text-gold font-bold uppercase mb-4">{slide.offer}</p>
                    <p className="font-body text-white/70 text-sm md:text-base uppercase tracking-widest mb-10 leading-relaxed">
                      {slide.copy}
                    </p>
                    
                    <div className="flex gap-4 flex-wrap mb-10 justify-start">
                      <Link to="/products" className="bg-gold text-charcoal px-8 py-3.5 rounded font-body text-xs font-bold uppercase hover:bg-gold-dark transition-all hover:scale-105 shadow-xl shadow-gold/20">
                        Shop Now
                      </Link>
                      <Link to="/consultation" className="border border-gold text-gold px-8 py-3.5 rounded font-body text-xs font-bold uppercase hover:bg-gold/10 transition-all">
                        Book Consultation
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Image Side (Right) */}
            <div className="w-full lg:w-[60%] relative h-[300px] lg:h-full overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeSlide}
                  src={slide.image}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: (slide as any).position || "center" }}
                  alt={slide.title}
                />
              </AnimatePresence>
              {/* Split Image Line */}
              <div className="absolute inset-y-0 left-0 w-px bg-white/20 z-20" />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-transparent to-transparent" />
            </div>
          </div>
        ) : (
          /* Full Layout: Text on Left, Background Image */
          <div className="h-full relative">
            <div className="absolute inset-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeSlide}
                  src={slide.image}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: (slide as any).position || "center" }}
                  alt={slide.title}
                />
              </AnimatePresence>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            
            <div className="container relative h-full flex items-center z-10">
              <div className="w-full lg:w-1/2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-xl"
                  >
                    <span className="inline-flex bg-gold text-charcoal px-4 py-2 rounded font-body text-[10px] font-bold uppercase tracking-widest mb-6">
                      {slide.eyebrow}
                    </span>
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-6 uppercase">
                      {slide.title}
                    </h1>
                    <p className="font-display text-2xl md:text-4xl text-gold font-bold uppercase mb-4">{slide.offer}</p>
                    <p className="font-body text-white/95 text-sm md:text-lg uppercase tracking-widest mb-10 leading-relaxed max-w-md">
                      {slide.copy}
                    </p>
                    
                    <div className="flex gap-4 flex-wrap mb-10">
                      <Link to="/products" className="bg-gold text-charcoal px-8 py-3.5 rounded font-body text-xs font-bold uppercase hover:bg-gold-dark transition-all hover:scale-105 shadow-xl shadow-gold/20">
                        Shop Now
                      </Link>
                      <Link to="/consultation" className="border border-gold text-gold px-8 py-3.5 rounded font-body text-xs font-bold uppercase hover:bg-gold/10 transition-all backdrop-blur-md bg-black/10">
                        Book Consultation
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-20 flex gap-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${index === activeSlide ? "w-12 bg-gold" : "w-6 bg-white/30 hover:bg-white/50"}`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Quick Access Bar */}
      <section className="bg-charcoal border-t border-white/5">
        <div className="container py-5">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-8 flex-wrap">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold" />
                <span className="font-body text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">
                  Studio Hours
                </span>
              </div>
              {availabilitySlots.map((slot) => (
                <div key={slot.day} className="flex items-center gap-3">
                  <span className="font-body text-xs text-gold font-bold">{slot.day}</span>
                  <span className="font-body text-xs text-white/40 tracking-widest">{slot.time}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-8 flex-wrap">
              <a href="tel:+919705060222" className="flex items-center gap-2 font-body text-xs text-white/60 hover:text-gold transition-colors">
                <Phone className="w-3.5 h-3.5 text-gold" />
                +91 9705060222
              </a>
              <div className="flex items-center gap-2 font-body text-xs text-white/60">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                Hyderabad, Telangana
              </div>
              <Link to="/about" className="font-body text-xs text-gold font-bold hover:text-gold-light transition-colors underline underline-offset-4">
                About Us →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
