import { motion } from "framer-motion";

interface CategoryHeaderProps {
  title: string;
  subtitle?: string;
  image: string;
  badge?: string;
}

const CategoryHeader = ({ title, subtitle, image, badge }: CategoryHeaderProps) => {
  return (
    <section className="relative h-[300px] md:h-[400px] overflow-hidden bg-charcoal">
      {/* Background Image */}
      <img 
        src={image} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
      
      {/* Content */}
      <div className="container relative h-full flex flex-col justify-center items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {badge && (
            <span className="inline-block bg-gold text-charcoal px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest mb-4">
              {badge}
            </span>
          )}
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white uppercase mb-4 tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="font-body text-white/70 text-sm md:text-lg uppercase tracking-[0.2em] max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryHeader;
