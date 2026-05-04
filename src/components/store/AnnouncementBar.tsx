import { motion } from "framer-motion";

const announcements = [
  "Free Shipping on All Hair Systems • ",
  "Book Your Free Consultation Today • ",
  "Special Discount for First-Time Customers • ",
  "Expert Fitting & Styling Included • ",
];

const AnnouncementBar = () => {
  return (
    <div className="bg-gold text-charcoal py-2 overflow-hidden border-b border-gold/20 select-none">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
          className="flex gap-4 items-center"
        >
          {/* Duplicate for seamless loop */}
          {[...announcements, ...announcements, ...announcements, ...announcements].map((text, i) => (
            <span key={i} className="font-body text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
