import { Link } from "react-router-dom";
import product1 from "@/assets/product-1.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import { motion } from "framer-motion";

const collections = [
  { name: "Wigs", image: product1, link: "/products?category=Wigs" },
  { name: "Hair Systems", image: product6, link: "/products?category=Hair Systems" },
  { name: "Accessories", image: product7, link: "/products?category=Accessories" },
];

const CollectionsSection = () => (
  <section className="py-20 bg-off-white">
    <div className="container">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">Shop by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((col, i) => (
          <motion.div
            key={col.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <Link to={col.link} className="group block relative overflow-hidden rounded-lg aspect-[4/5]">
              <img src={col.image} alt={col.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="font-display text-2xl font-bold text-background">{col.name}</h3>
                <span className="font-body text-sm text-gold mt-1 inline-block">Shop Now →</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CollectionsSection;
