import { Link } from "react-router-dom";
import { Star, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative bg-background border border-border rounded p-3 shadow-card hover:shadow-card-hover transition-shadow"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded bg-secondary aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-gold text-accent-foreground text-xs font-body font-semibold px-3 py-1 rounded">
              {product.badge}
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
            }}
            className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gold hover:text-accent-foreground shadow-card"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </Link>
      <div className="mt-3 space-y-1 text-center">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-body text-xs font-bold uppercase hover:text-gold transition-colors line-clamp-2 min-h-8">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-center gap-1">
          <Star className="w-3 h-3 fill-gold text-gold" />
          <span className="text-xs font-body text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="font-body text-xs font-semibold text-foreground">From ₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="font-body text-sm text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
