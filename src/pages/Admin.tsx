import { useState, useEffect } from "react";
import { CalendarDays, Package, Users, Plus, LogOut, Lock, Mail, Eye, EyeOff, X, Upload, Save, Trash2, CheckCircle, ChevronRight, Settings, Info, CreditCard, ShoppingBag, Search, MapPin, Phone, User as UserIcon } from "lucide-react";
import AnnouncementBar from "@/components/store/AnnouncementBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import { products } from "@/data/products";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const Admin = () => {
  const { user, isAdmin, login, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("inventory");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Admin State
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  const loadAllOrders = () => {
    const staticOrders = [
      { id: "FINIX-9901", customer: "Rahul Dev", amount: "₹12,999", status: "Paid", method: "Razorpay", date: "Today", email: "rahul@example.com", phone: "9876543210", address: "H.No 4-52, Jubilee Hills, Hyderabad", items: ["Mono System (Qty: 1)"] },
      { id: "FINIX-9895", customer: "Sanjay", amount: "₹1,450", status: "Pending", method: "COD", date: "Yesterday", email: "sanjay@example.com", phone: "9888877777", address: "Plot 12, Gachibowli, Hyderabad", items: ["Maintenance Kit (Qty: 1)"] },
    ];
    const savedOrders = JSON.parse(localStorage.getItem("finix_orders") || "[]");
    
    // Add dummy details for saved orders if missing
    const enrichedSaved = savedOrders.map((o: any) => ({
      ...o,
      email: o.email || "customer@example.com",
      phone: o.phone || "9999988888",
      address: o.address || "Vizag, Andhra Pradesh",
      items: o.items || ["Premium Hair System (Qty: 1)"]
    }));

    setOrders([...enrichedSaved, ...staticOrders]);
  };

  useEffect(() => {
    loadAllOrders();
    const interval = setInterval(loadAllOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const success = login(email, password);
      if (success) toast.success("Welcome, Admin!");
      else toast.error("Invalid credentials.");
      setIsLoading(false);
    }, 800);
  };

  const bookings = [
    { id: "BK-1", name: "Rahul", service: "Hair system fixing", time: "11:00 AM", status: "Waiting" },
    { id: "BK-2", name: "Amit", service: "Maintenance", time: "03:00 PM", status: "Scheduled" },
  ];

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-charcoal flex flex-col">
        <AnnouncementBar /><Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-background rounded-2xl shadow-2xl border border-gold/20 overflow-hidden">
            <div className="bg-gold p-8 text-center"><h1 className="font-display text-2xl font-bold text-charcoal">Admin Portal</h1></div>
            <form onSubmit={handleLogin} className="p-8 space-y-6">
              <div className="space-y-2"><label className="text-xs font-bold uppercase text-muted-foreground">Email</label><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-secondary border border-border rounded-lg py-3 px-4" placeholder="admin@finixhairstudio.com" /></div>
              <div className="space-y-2"><label className="text-xs font-bold uppercase text-muted-foreground">Password</label><input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-secondary border border-border rounded-lg py-3 px-4" placeholder="••••••" /></div>
              <button type="submit" className="w-full bg-gold text-accent-foreground py-4 rounded-lg font-bold uppercase">Login</button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <AnnouncementBar /><Header />
      <main className="container py-10">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-display text-4xl font-bold">Studio Dashboard</h1>
          <div className="flex gap-3">
            <button onClick={() => setShowAddModal(true)} className="bg-gold text-accent-foreground px-5 py-3 rounded-lg font-bold uppercase text-xs">Add Product</button>
            <button onClick={logout} className="text-red-500 font-bold uppercase text-xs">Logout</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[{ label: "Products", value: products.length, icon: Package }, { label: "Bookings", value: 2, icon: CalendarDays }, { label: "Orders", value: orders.length, icon: ShoppingBag }, { label: "Customers", value: 128, icon: Users }].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-background border border-border rounded-xl p-6 shadow-sm"><Icon className="w-6 h-6 mb-4 text-gold" /><p className="text-3xl font-bold">{value}</p><p className="text-xs text-muted-foreground uppercase font-bold">{label}</p></div>
          ))}
        </div>

        <div className="flex gap-1 bg-secondary p-1 rounded-xl w-fit mb-8 border border-border">
          {["inventory", "orders", "bookings"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2.5 rounded-lg text-xs font-bold uppercase ${activeTab === tab ? "bg-background text-gold shadow-sm" : "text-muted-foreground"}`}>{tab}</button>
          ))}
        </div>

        <div className="bg-background border border-border rounded-xl shadow-sm min-h-[500px]">
          {activeTab === "inventory" && (
            <div className="animate-fade-in divide-y divide-border">
              <div className="px-8 py-6 bg-secondary/10 flex justify-between items-center"><h2 className="font-display text-2xl font-bold">Inventory</h2></div>
              {products.map(p => (
                <div key={p.id} className="flex justify-between items-center px-8 py-4">
                  <div className="flex items-center gap-3"><div className="w-10 h-10 rounded bg-secondary overflow-hidden"><img src={p.image} className="w-full h-full object-cover" /></div><span className="font-bold text-sm">{p.name}</span></div>
                  <button onClick={() => setEditingProduct(p)} className="text-gold text-[10px] font-bold uppercase">Edit</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "orders" && (
            <div className="animate-fade-in divide-y divide-border">
              <div className="px-8 py-6 bg-secondary/10"><h2 className="font-display text-2xl font-bold text-green-600">All Payments</h2></div>
              {orders.map(o => (
                <div key={o.id} className="grid grid-cols-[100px_1fr_100px_150px_80px] gap-4 items-center px-8 py-5">
                  <span className="text-xs font-bold text-muted-foreground">{o.id}</span>
                  <div><p className="text-sm font-bold">{o.customer}</p><p className="text-[10px] text-muted-foreground">{o.date}</p></div>
                  <span className="text-sm font-bold text-gold">{o.amount}</span>
                  <div className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${o.status === "Paid" ? "bg-green-500" : "bg-amber-500"}`} /><span className="text-[10px] font-bold uppercase">{o.status} ({o.method})</span></div>
                  <button onClick={() => setSelectedOrder(o)} className="text-[10px] font-bold text-gold underline">View</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "bookings" && (
            <div className="animate-fade-in p-8 space-y-4">
              <h2 className="font-display text-2xl font-bold mb-6">Today's Appointments</h2>
              {bookings.map(b => (
                <div key={b.id} className="flex items-center justify-between p-6 bg-secondary/30 rounded-2xl border border-border">
                  <div className="flex items-center gap-5"><div className="w-14 h-14 bg-background rounded-2xl flex items-center justify-center font-bold text-gold">{b.time.split(":")[0]}h</div><div><p className="font-bold">{b.name}</p><p className="text-sm text-muted-foreground">{b.service}</p></div></div>
                  <span className="text-[10px] font-bold uppercase border border-border px-3 py-1 rounded-full">{b.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl bg-background rounded-[2rem] p-10 border border-gold/20 shadow-2xl overflow-hidden">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full mb-2 inline-block">{selectedOrder.id}</span>
                  <h2 className="font-display text-3xl font-bold">Order Details</h2>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-secondary rounded-full transition-colors"><X className="w-6 h-6" /></button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Customer Info</h3>
                    <div className="flex items-center gap-4"><div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center"><UserIcon className="w-5 h-5 text-gold" /></div><div><p className="font-bold">{selectedOrder.customer}</p><p className="text-xs text-muted-foreground">{selectedOrder.email}</p></div></div>
                    <div className="flex items-center gap-4"><div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center"><Phone className="w-5 h-5 text-gold" /></div><p className="text-sm font-bold">{selectedOrder.phone}</p></div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Shipping Address</h3>
                    <div className="flex gap-4"><MapPin className="w-5 h-5 text-gold shrink-0 mt-1" /><p className="text-sm leading-relaxed">{selectedOrder.address}</p></div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Order Items</h3>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl border border-border"><Package className="w-4 h-4 text-gold" /><span className="text-sm font-semibold">{item}</span></div>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 bg-charcoal rounded-2xl text-background">
                     <div className="flex justify-between items-center mb-4"><span className="text-xs uppercase font-bold opacity-50 tracking-widest">Total Amount</span><span className="text-2xl font-bold text-gold">{selectedOrder.amount}</span></div>
                     <div className="flex justify-between items-center"><span className="text-xs uppercase font-bold opacity-50 tracking-widest">Payment</span><span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${selectedOrder.status === "Paid" ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400"}`}>{selectedOrder.status} ({selectedOrder.method})</span></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 pt-8 border-t border-border flex gap-4">
                <button onClick={() => { toast.success("Order marked as Shipped!"); setSelectedOrder(null); }} className="flex-1 bg-gold text-accent-foreground py-4 rounded-xl font-bold uppercase text-xs tracking-widest shadow-lg">Mark as Shipped</button>
                <button onClick={() => setSelectedOrder(null)} className="px-8 border border-border rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-secondary">Close</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Product Modal */}
      <AnimatePresence>
        {(showAddModal || editingProduct) && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setShowAddModal(false); setEditingProduct(null); }} className="absolute inset-0 bg-charcoal/80" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-lg bg-background rounded-3xl p-8 border border-gold/20">
              <div className="flex justify-between items-center mb-8"><h2 className="font-display text-2xl font-bold">{editingProduct ? "Edit Product" : "Add Product"}</h2><button onClick={() => { setShowAddModal(false); setEditingProduct(null); }}><X className="w-6 h-6" /></button></div>
              <form onSubmit={(e) => { e.preventDefault(); toast.success("Success!"); setShowAddModal(false); setEditingProduct(null); }} className="space-y-6">
                <div className="space-y-2"><label className="text-[10px] font-bold uppercase">Name</label><input defaultValue={editingProduct?.name} required className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm" /></div>
                <div className="space-y-2"><label className="text-[10px] font-bold uppercase">Price</label><input type="number" defaultValue={editingProduct?.price} required className="w-full bg-secondary border border-border rounded-xl py-3 px-4 text-sm" /></div>
                <button type="submit" className="w-full bg-gold text-accent-foreground py-4 rounded-xl font-bold uppercase tracking-widest">Save Changes</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default Admin;
