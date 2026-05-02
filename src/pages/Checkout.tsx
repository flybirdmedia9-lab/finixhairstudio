import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import AnnouncementBar from "@/components/store/AnnouncementBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import WhatsAppButton from "@/components/store/WhatsAppButton";
import { CheckCircle, CreditCard, ShieldCheck, Truck, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RAZORPAY_KEY = "rzp_test_ScyUzavPlmmDkj";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", pincode: "",
    paymentMethod: "online", 
  });

  const finalAmount = totalPrice + (totalPrice >= 10000 ? 0 : 150);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Improved: Save order IMMEDIATELY so admin can see it
  const saveOrderToHistory = (status: "Paid" | "Pending" | "Awaiting Payment", method: string) => {
    const orderId = "FINIX-" + Math.floor(1000 + Math.random() * 9000);
    setCurrentOrderId(orderId);
    
    const newOrder = {
      id: orderId,
      customer: `${form.firstName} ${form.lastName}`,
      amount: "₹" + finalAmount.toLocaleString(),
      status: status,
      method: method,
      date: "Just Now"
    };
    
    const existingOrders = JSON.parse(localStorage.getItem("finix_orders") || "[]");
    localStorage.setItem("finix_orders", JSON.stringify([newOrder, ...existingOrders]));
    return orderId;
  };

  // Update an existing order status (e.g. from Awaiting to Paid)
  const updateOrderStatus = (orderId: string, newStatus: "Paid") => {
    const existingOrders = JSON.parse(localStorage.getItem("finix_orders") || "[]");
    const updated = existingOrders.map((o: any) => o.id === orderId ? { ...o, status: newStatus } : o);
    localStorage.setItem("finix_orders", JSON.stringify(updated));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    // 1. Create order in admin panel immediately as "Awaiting"
    const orderId = saveOrderToHistory("Awaiting Payment", "Razorpay");
    toast.info("Order initialized in Admin Panel");

    if (!window.Razorpay) {
      const res = await loadRazorpayScript();
      if (!res) {
        toast.error("Razorpay SDK failed to load.");
        setIsProcessing(false);
        return;
      }
    }

    try {
      const options = {
        key: RAZORPAY_KEY,
        amount: finalAmount * 100,
        currency: "INR",
        name: "Finix Hair Studio",
        description: `Order for ${items.length} item(s)`,
        handler: function (response: any) {
          // 2. Update status to Paid once successful
          updateOrderStatus(orderId, "Paid");
          toast.success("Payment Successful!");
          setOrderPlaced(true);
          clearCart();
        },
        prefill: {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#C5A36A" },
        modal: { ondismiss: () => setIsProcessing(false) }
      };
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (res: any) => {
        toast.error("Payment Failed: " + res.error.description);
        setIsProcessing(false);
      });
      rzp.open();
    } catch (error) {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (form.paymentMethod === "online") {
      handleRazorpayPayment();
    } else {
      setTimeout(() => {
        saveOrderToHistory("Pending", "COD");
        setOrderPlaced(true);
        clearCart();
        setIsProcessing(false);
      }, 1500);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex flex-col animate-fade-in">
        <AnnouncementBar /><Header />
        <div className="flex-1 flex items-center justify-center p-4 py-20">
          <div className="container text-center max-w-lg mx-auto bg-white p-10 rounded-3xl shadow-2xl border border-gold/10">
            <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10 text-gold" /></div>
            <h1 className="font-display text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="font-body text-muted-foreground mb-8">Thank you for choosing Finix Hair Studio. We'll contact you at <strong>{form.phone}</strong> shortly.</p>
            <div className="flex flex-col gap-3">
              <Link to="/products" className="bg-gold text-accent-foreground px-8 py-4 rounded-xl font-body font-bold uppercase tracking-widest hover:bg-gold-dark shadow-lg">Continue Shopping</Link>
              <Link to="/admin" className="text-gold font-body text-sm font-bold uppercase tracking-widest hover:underline">Check Admin Panel (Order Status)</Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <><AnnouncementBar /><Header />
        <div className="container py-40 text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
          <h1 className="font-display text-3xl font-bold mb-4">Your cart is empty</h1>
          <Link to="/products" className="inline-flex items-center gap-2 bg-gold text-accent-foreground px-8 py-3 rounded-lg font-body font-bold hover:bg-gold-dark transition-all">Browse Hair Systems</Link>
        </div><Footer /><CartDrawer />
      </>
    );
  }

  return (
    <><AnnouncementBar /><Header />
      <div className="bg-off-white min-h-screen pb-20">
        <div className="container py-10">
          <h1 className="font-display text-4xl font-bold mb-10">Secure Checkout</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">
            <div className="space-y-8 animate-fade-in">
              <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
                <div className="px-8 py-6 border-b border-border bg-secondary/30 flex items-center gap-3"><Truck className="w-5 h-5 text-gold" /><h2 className="font-display text-xl font-bold uppercase tracking-tight">Shipping Details</h2></div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2"><label className="font-body text-xs font-bold uppercase text-muted-foreground">First Name</label><input name="firstName" required value={form.firstName} onChange={handleChange} className="w-full border border-border rounded-lg px-4 py-3 text-sm font-body outline-none focus:border-gold bg-secondary/20" /></div>
                  <div className="space-y-2"><label className="font-body text-xs font-bold uppercase text-muted-foreground">Last Name</label><input name="lastName" required value={form.lastName} onChange={handleChange} className="w-full border border-border rounded-lg px-4 py-3 text-sm font-body outline-none focus:border-gold bg-secondary/20" /></div>
                  <div className="space-y-2"><label className="font-body text-xs font-bold uppercase text-muted-foreground">Email</label><input name="email" type="email" required value={form.email} onChange={handleChange} className="w-full border border-border rounded-lg px-4 py-3 text-sm font-body outline-none focus:border-gold bg-secondary/20" /></div>
                  <div className="space-y-2"><label className="font-body text-xs font-bold uppercase text-muted-foreground">Phone</label><input name="phone" type="tel" required value={form.phone} onChange={handleChange} className="w-full border border-border rounded-lg px-4 py-3 text-sm font-body outline-none focus:border-gold bg-secondary/20" /></div>
                  <div className="md:col-span-2 space-y-2"><label className="font-body text-xs font-bold uppercase text-muted-foreground">Address</label><input name="address" required value={form.address} onChange={handleChange} className="w-full border border-border rounded-lg px-4 py-3 text-sm font-body outline-none focus:border-gold bg-secondary/20" /></div>
                  <div className="grid grid-cols-3 md:col-span-2 gap-4">
                    <div className="space-y-2"><label className="font-body text-xs font-bold uppercase text-muted-foreground">City</label><input name="city" required value={form.city} onChange={handleChange} className="w-full border border-border rounded-lg px-4 py-3 text-sm font-body outline-none focus:border-gold bg-secondary/20" /></div>
                    <div className="space-y-2"><label className="font-body text-xs font-bold uppercase text-muted-foreground">State</label><input name="state" required value={form.state} onChange={handleChange} className="w-full border border-border rounded-lg px-4 py-3 text-sm font-body outline-none focus:border-gold bg-secondary/20" /></div>
                    <div className="space-y-2"><label className="font-body text-xs font-bold uppercase text-muted-foreground">Pincode</label><input name="pincode" required value={form.pincode} onChange={handleChange} className="w-full border border-border rounded-lg px-4 py-3 text-sm font-body outline-none focus:border-gold bg-secondary/20" /></div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
                <div className="px-8 py-6 border-b border-border bg-secondary/30 flex items-center gap-3"><CreditCard className="w-5 h-5 text-gold" /><h2 className="font-display text-xl font-bold uppercase tracking-tight">Payment Method</h2></div>
                <div className="p-8 space-y-4">
                  {[{ value: "online", label: "Pay Online (Razorpay)", icon: ShieldCheck }, { value: "cod", label: "Cash on Delivery", icon: Truck }].map((method) => (
                    <label key={method.value} className={`flex items-center justify-between p-5 border rounded-xl cursor-pointer transition-all ${form.paymentMethod === method.value ? "border-gold bg-gold/5 shadow-md" : "border-border hover:border-gold/30"}`}>
                      <div className="flex items-center gap-4"><input type="radio" name="paymentMethod" value={method.value} checked={form.paymentMethod === method.value} onChange={handleChange} className="accent-[hsl(var(--gold))] w-5 h-5" />
                        <div><p className="font-body font-bold text-sm">{method.label}</p></div></div><method.icon className={`w-5 h-5 ${form.paymentMethod === method.value ? "text-gold" : "text-muted-foreground/30"}`} />
                    </label>))}
                </div>
              </div>
            </div>
            <aside className="lg:sticky lg:top-24">
              <div className="bg-charcoal text-background rounded-2xl shadow-2xl p-8 border border-gold/20">
                <h2 className="font-display text-2xl font-bold mb-6 text-gold">Order Summary</h2>
                <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-16 h-16 rounded-lg bg-white/10 border border-white/10 overflow-hidden shrink-0"><img src={item.image} className="w-full h-full object-cover" /></div>
                      <div className="flex-1"><p className="font-body text-sm font-bold text-background group-hover:text-gold transition-colors">{item.name}</p><div className="flex justify-between mt-1"><p className="text-xs text-background/50">Qty: {item.quantity}</p><p className="text-sm font-bold text-gold">₹{(item.price * item.quantity).toLocaleString()}</p></div></div>
                    </div>))}
                </div>
                <div className="space-y-3 border-t border-white/10 pt-6">
                  <div className="flex justify-between text-sm text-background/60"><span>Subtotal</span><span>₹{totalPrice.toLocaleString()}</span></div>
                  <div className="flex justify-between text-2xl font-bold text-gold pt-4"><span>Total</span><span>₹{finalAmount.toLocaleString()}</span></div>
                </div>
                <button type="submit" disabled={isProcessing} className="w-full bg-gold text-accent-foreground py-5 rounded-xl font-body font-bold uppercase tracking-widest mt-10 hover:bg-gold-dark transition-all shadow-xl disabled:opacity-70">
                  {isProcessing ? "Opening Razorpay..." : form.paymentMethod === "online" ? "Pay with Razorpay" : "Confirm COD Order"}
                </button>
              </div>
            </aside>
          </form>
        </div>
      </div><Footer /><CartDrawer /><WhatsAppButton />
    </>
  );
};

export default Checkout;
