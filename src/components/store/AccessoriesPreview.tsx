import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";

const AccessoriesPreview = () => {
  const accessories = products.filter((product) => product.category === "Accessories").slice(0, 4);
  return (
    <section className="py-16 md:py-20 bg-off-white">
      <div className="container">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <p className="font-body text-gold text-xs tracking-[0.25em] uppercase mb-3">Accessories</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Everything for secure daily wear</h2>
          </div>
          <Link to="/accessories" className="font-body text-sm text-gold hover:text-gold-dark transition-colors shrink-0">View All →</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {accessories.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
        </div>
      </div>
    </section>
  );
};

export default AccessoriesPreview;
