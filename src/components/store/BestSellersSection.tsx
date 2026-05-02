import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";

const BestSellersSection = () => {
  const bestSellers = products.filter((p) => p.badge === "Best Seller" || p.badge === "Popular" || p.badge === "Trending").slice(0, 4);

  return (
    <section className="py-20">
      <div className="container">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold">Our Best Sellers</h2>
          <Link to="/products" className="font-body text-sm text-gold hover:text-gold-dark transition-colors">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {bestSellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;
