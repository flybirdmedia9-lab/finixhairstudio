import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const announcements = [
  "Free Shipping on Orders Above ₹10,000",
  "Book a Free Consultation Today!",
  "Upto ₹2000 Off on Your First Order",
];

const AnnouncementBar = () => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="bg-charcoal text-primary-foreground py-2 text-sm font-body relative">
      <div className="container flex items-center justify-center gap-4">
        <button
          onClick={() => setCurrent((p) => (p - 1 + announcements.length) % announcements.length)}
          className="absolute left-4 hover:text-gold transition-colors"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <a href="/products" className="hover:text-gold transition-colors text-center">
          {announcements[current]} →
        </a>
        <button
          onClick={() => setCurrent((p) => (p + 1) % announcements.length)}
          className="absolute right-4 hover:text-gold transition-colors"
          aria-label="Next announcement"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
