import { useParams, Link } from "react-router-dom";
import { useRef, useState } from "react";
import { Star, Minus, Plus, Truck, Shield, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import AnnouncementBar from "@/components/store/AnnouncementBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import WhatsAppButton from "@/components/store/WhatsAppButton";
import ProductCard from "@/components/store/ProductCard";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  if (!product) {
    return (
      <>
        <Header />
        <div className="container py-20 text-center">
          <h1 className="font-display text-2xl mb-4">Product not found</h1>
          <Link to="/products" className="text-gold font-body hover:underline">Back to Products</Link>
        </div>
        <Footer />
      </>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const galleryImages = product.images.length > 0 ? product.images : [product.image];
  const hasMultipleImages = galleryImages.length > 1;
  const [imageScale, setImageScale] = useState(1);
  const [transformOrigin, setTransformOrigin] = useState("center center");
  const pinchStartDistance = useRef<number | null>(null);
  const pinchStartScale = useRef(1);
  const lastTapTime = useRef(0);

  const clampZoom = (value: number) => Math.min(Math.max(value, 1), 3);

  const resetZoom = () => {
    setImageScale(1);
    setTransformOrigin("center center");
  };

  const getTouchDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  };

  const setOriginFromPoint = (clientX: number, clientY: number, target: EventTarget) => {
    if (!(target instanceof HTMLElement)) return;
    const rect = target.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setTransformOrigin(`${Math.min(Math.max(x, 0), 100)}% ${Math.min(Math.max(y, 0), 100)}%`);
  };

  const showPreviousImage = () => {
    resetZoom();
    setSelectedImage((current) => (current === 0 ? galleryImages.length - 1 : current - 1));
  };

  const showNextImage = () => {
    resetZoom();
    setSelectedImage((current) => (current + 1) % galleryImages.length);
  };

  const handleGalleryTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2) {
      pinchStartDistance.current = getTouchDistance(event.touches);
      pinchStartScale.current = imageScale;
      const midX = (event.touches[0].clientX + event.touches[1].clientX) / 2;
      const midY = (event.touches[0].clientY + event.touches[1].clientY) / 2;
      setOriginFromPoint(midX, midY, event.currentTarget);
      setTouchStart(null);
      return;
    }

    if (event.touches.length === 1) {
      const now = Date.now();
      const touch = event.touches[0];
      if (now - lastTapTime.current < 280) {
        setOriginFromPoint(touch.clientX, touch.clientY, event.currentTarget);
        setImageScale((current) => (current > 1 ? 1 : 2.4));
      }
      lastTapTime.current = now;
      setTouchStart(touch.clientX);
    }
  };

  const handleGalleryTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 2 || pinchStartDistance.current === null) return;
    event.preventDefault();
    const nextScale = (getTouchDistance(event.touches) / pinchStartDistance.current) * pinchStartScale.current;
    setImageScale(clampZoom(nextScale));
  };

  const handleTouchEnd = (x: number) => {
    pinchStartDistance.current = null;
    if (touchStart === null || !hasMultipleImages || imageScale > 1) return;
    const distance = touchStart - x;
    if (Math.abs(distance) > 45) {
      distance > 0 ? showNextImage() : showPreviousImage();
    }
    setTouchStart(null);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        variant: Object.values(selectedVariants).join(", ") || undefined,
      });
    }
  };

  return (
    <>
      <AnnouncementBar />
      <Header />
      <div className="container py-6 md:py-8">
        <div className="flex items-center gap-2 text-sm font-body text-muted-foreground mb-8">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-gold transition-colors">Products</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8 lg:gap-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div
              className="relative aspect-square rounded overflow-hidden bg-secondary mb-4 border border-border shadow-card touch-pan-y"
              onDoubleClick={(event) => {
                setOriginFromPoint(event.clientX, event.clientY, event.currentTarget);
                setImageScale((current) => (current > 1 ? 1 : 2.4));
              }}
              onTouchStart={handleGalleryTouchStart}
              onTouchMove={handleGalleryTouchMove}
              onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
            >
              <img
                src={galleryImages[selectedImage]}
                alt={`${product.name} gallery image ${selectedImage + 1}`}
                className="w-full h-full object-cover transition-transform duration-200 ease-out select-none"
                style={{ transform: `scale(${imageScale})`, transformOrigin }}
                draggable={false}
              />
              {hasMultipleImages && (
                <>
                  <button
                    onClick={showPreviousImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-card hover:bg-gold hover:text-accent-foreground transition-colors"
                    aria-label="Previous product image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={showNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-card hover:bg-gold hover:text-accent-foreground transition-colors"
                    aria-label="Next product image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <span className="absolute bottom-3 right-3 bg-foreground/70 text-background px-3 py-1 rounded font-body text-xs font-bold">
                    {selectedImage + 1} / {galleryImages.length}
                  </span>
                </>
              )}
            </div>
            {hasMultipleImages && (
              <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      resetZoom();
                      setSelectedImage(i);
                    }}
                    className={`w-20 h-20 rounded overflow-hidden border-2 transition-colors shrink-0 snap-start ${selectedImage === i ? "border-gold" : "border-border"}`}
                    aria-label={`View product image ${i + 1}`}
                  >
                    <img src={img} alt={`${product.name} thumbnail ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <div className="lg:sticky lg:top-40 lg:self-start">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              {product.badge && (
                <span className="bg-gold text-accent-foreground text-xs font-body font-semibold px-3 py-1 rounded mb-4 inline-block">
                  {product.badge}
                </span>
              )}
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-3 uppercase">{product.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-border"}`} />
                  ))}
                </div>
                <span className="font-body text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <span className="font-display text-3xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="font-body text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
                {product.originalPrice && (
                  <span className="bg-destructive/10 text-destructive text-xs font-body font-semibold px-2 py-1 rounded">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">{product.description}</p>

              {/* Variants */}
              {product.variants?.map((v) => (
                <div key={v.label} className="mb-4">
                  <h3 className="font-body font-semibold text-sm mb-2">{v.label}</h3>
                  <div className="flex gap-2 flex-wrap">
                    {v.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedVariants((prev) => ({ ...prev, [v.label]: opt }))}
                        className={`px-4 py-2 border rounded text-sm font-body transition-colors ${selectedVariants[v.label] === opt ? "border-gold bg-gold/10 text-gold" : "border-border hover:border-gold"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mb-6">
                <h3 className="font-body font-semibold text-sm mb-2">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 border border-border rounded flex items-center justify-center hover:border-gold transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-body font-medium w-8 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 border border-border rounded flex items-center justify-center hover:border-gold transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gold text-accent-foreground py-4 rounded font-body text-sm font-bold uppercase hover:bg-gold-dark transition-colors"
                >
                  Add to Cart
                </button>
                <button onClick={handleAddToCart} className="w-full bg-charcoal text-background py-4 rounded font-body text-sm font-bold uppercase hover:bg-charcoal-light transition-colors">Buy Now</button>
              </div>

              {/* Features */}
              <div className="space-y-3 border-t border-border pt-6 mb-6">
                {product.features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                    <span className="font-body text-sm text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-6 text-xs font-body text-muted-foreground border-t border-border pt-6">
                <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-gold" /> Free Shipping</div>
                <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-gold" /> Secure Payment</div>
                <div className="flex items-center gap-2"><RefreshCw className="w-4 h-4 text-gold" /> Easy Returns</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </>
  );
};

export default ProductDetail;
