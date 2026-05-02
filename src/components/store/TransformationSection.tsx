import transformation from "@/assets/transformation.jpg";
import { motion } from "framer-motion";

const TransformationSection = () => (
  <section className="py-20 bg-off-white">
    <div className="container">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">
          Real Transformations
        </h2>
        <div className="rounded-lg overflow-hidden shadow-card max-w-4xl mx-auto">
          <img
            src={transformation}
            alt="Customer transformation with Finixhair Studio"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </motion.div>
    </div>
  </section>
);

export default TransformationSection;
