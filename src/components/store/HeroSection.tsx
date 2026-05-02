import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import heroAmbassador1 from "@/assets/hero-ambassador-1.jpg";
import heroAmbassador2 from "@/assets/hero-ambassador-2.jpg";
import heroAmbassador3 from "@/assets/hero-ambassador-3.jpg";
import { motion } from "framer-motion";
import { Clock, MapPin, Phone, ChevronRight } from "lucide-react";

const trustBadges = ["Studio Expert Fit", "Natural Finish", "Trusted by South Customers"];

const heroSlides = [
  { image: heroAmbassador1, eyebrow: "Celebrity Style Finish", title: "South Star Confidence", offer: "Up To 30% Off", copy: "Premium hair systems with natural density" },
  { image: heroAmbassador2, eyebrow: "Studio Perfect Hair", title: "Camera Ready Look", offer: "Book & Save Today", copy: "Custom fitting for a flawless everyday style" },
  { image: heroAmbassador3, eyebrow: "Realistic Transformation", title: "Luxury Hair Studio", offer: "Premium Systems", copy: "Natural-looking results by expert stylists" },
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
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  const slide = heroSlides[activeSlide];

  return (
    <>
      {/* Hero Slider */}
      <section className="relative h-[520px] md:h-[580px] overflow-hidden bg-charcoal">
        {heroSlides.map((item, index) => (
          <img
            key={item.title}
            src={item.image}
            alt={`${item.title} promoting Finix Hair Studio products`}
            width={1600}
            height={900}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === activeSlide ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/75 to-foreground/10" />
        <div className="container relative h-full flex items-center">
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl"
          >
            <span className="inline-flex bg-gold text-accent-foreground px-4 py-2 rounded font-body text-xs font-bold uppercase tracking-wide mb-5">
              {slide.eyebrow}
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-background leading-tight mb-4">
              {slide.title}
            </h1>
            <p className="font-display text-2xl md:text-4xl text-gold font-bold uppercase mb-2">{slide.offer}</p>
            <p className="font-body text-background/90 text-sm md:text-lg uppercase tracking-wide mb-8">
              {slide.copy}
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                to="/products"
                className="bg-gold text-accent-foreground px-8 py-3 rounded font-body text-xs font-bold uppercase hover:bg-gold-dark transition-colors"
              >
                Shop Now
              </Link>
              <Link
                to="/about"
                className="flex items-center gap-2 border border-background/30 text-background px-8 py-3 rounded font-body font-medium hover:bg-background/10 transition-colors"
              >
                About Us <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/consultation"
                className="border border-gold/60 text-gold px-8 py-3 rounded font-body font-medium hover:bg-gold/10 transition-colors"
              >
                Book Consultation
              </Link>
            </div>
            <div className="mt-8 flex gap-2" aria-label="Hero slides">
              {heroSlides.map((item, index) => (
                <button
                  key={item.title}
                  onClick={() => setActiveSlide(index)}
                  className={`h-1.5 rounded-full transition-all ${index === activeSlide ? "w-10 bg-gold" : "w-5 bg-background/40 hover:bg-background/70"}`}
                  aria-label={`Show ${item.title}`}
                />
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center border border-gold/40 bg-foreground/35 px-3 py-2 rounded font-body text-[11px] font-bold uppercase tracking-wide text-background backdrop-blur-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Availability Timing Bar */}
      <section className="bg-charcoal border-t border-gold/20">
        <div className="container py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Studio Timing */}
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold shrink-0" />
                <span className="font-body text-xs font-bold text-background/70 uppercase tracking-widest">
                  Available Timing
                </span>
              </div>
              {availabilitySlots.map((slot) => (
                <div key={slot.day} className="flex items-center gap-2">
                  <span className="font-body text-xs text-gold font-semibold">{slot.day}</span>
                  <span className="font-body text-xs text-background/60">→</span>
                  <span className="font-body text-xs text-background/80">{slot.time}</span>
                </div>
              ))}
            </div>

            {/* Address + Phone quick links */}
            <div className="flex items-center gap-6 flex-wrap">
              <a
                href="tel:+919705060222"
                className="flex items-center gap-2 font-body text-xs text-background/70 hover:text-gold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-gold" />
                +91 9705060222
              </a>
              <div className="flex items-center gap-2 font-body text-xs text-background/70">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                Hyderabad, Telangana
              </div>
              <Link
                to="/about"
                className="font-body text-xs text-gold font-semibold hover:text-gold-light transition-colors underline underline-offset-2"
              >
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
