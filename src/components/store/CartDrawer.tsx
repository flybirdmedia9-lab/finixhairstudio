import { Link } from "react-router-dom";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground z-50"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display text-xl font-semibold">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} aria-label="Close cart">
                <X className="w-5 h-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
                <ShoppingBag className="w-16 h-16 text-muted-foreground" />
                <p className="font-body text-muted-foreground">Your cart is empty</p>
                <Link
                  to="/products"
                  onClick={() => setIsCartOpen(false)}
                  className="bg-gold text-accent-foreground px-6 py-3 rounded font-body font-medium hover:bg-gold-dark transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-border pb-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-body text-sm font-medium">{item.name}</h3>
                        {item.variant && <p className="text-xs text-muted-foreground">{item.variant}</p>}
                        <p className="font-body font-semibold text-gold mt-1">₹{item.price.toLocaleString()}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 border border-border rounded flex items-center justify-center hover:border-gold transition-colors">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-body text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 border border-border rounded flex items-center justify-center hover:border-gold transition-colors">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="self-start" aria-label="Remove">
                        <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="p-6 border-t border-border space-y-4">
                  <div className="flex justify-between font-body">
                    <span className="text-muted-foreground">Estimated Total</span>
                    <span className="font-semibold text-lg">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-body">Tax included. Shipping calculated at checkout.</p>
                  <Link
                    to="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="block w-full bg-gold text-accent-foreground text-center py-3 rounded font-body font-semibold hover:bg-gold-dark transition-colors"
                  >
                    Checkout
                  </Link>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="block w-full text-center py-3 border border-border rounded font-body text-sm hover:border-gold transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
