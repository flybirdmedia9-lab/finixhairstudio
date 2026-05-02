import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, User, CalendarCheck, LogOut, Lock, Mail, Eye, EyeOff, ShoppingBag, CreditCard, Settings, ChevronRight, MapPin, Phone, X, Clock, Info, CheckCircle2 } from "lucide-react";
import AnnouncementBar from "@/components/store/AnnouncementBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const Account = () => {
  const { user, login, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("orders");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [userOrders, setUserOrders] = useState<any[]>([]);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Sync orders from localStorage
  useEffect(() => {
    const staticOrders = [
      { id: "FINIX-1042", item: "Mono System", status: "Fitting scheduled", date: "28 Apr 2026", total: "₹12,999", img: "https://images.unsplash.com/photo-1566201012372-bd3d8a5fe60d?auto=format&fit=crop&q=80&w=200&h=200", timeline: [{label: "Order Placed", date: "28 Apr", done: true}, {label: "Shipped", date: "30 Apr", done: true}, {label: "Out for Fitting", date: "02 May", done: false}] },
    ];
    const savedOrders = JSON.parse(localStorage.getItem("finix_orders") || "[]");
    
    const mappedOrders = savedOrders.map((o: any) => ({
      id: o.id,
      item: "Hair System Order",
      status: o.status === "Paid" ? "Processing" : "Awaiting Payment",
      date: o.date,
      total: o.amount,
      img: "https://images.unsplash.com/photo-1590159435017-d861614995f5?auto=format&fit=crop&q=80&w=200&h=200",
      timeline: [{label: "Order Placed", date: o.date, done: true}, {label: "Payment Verified", date: o.date, done: o.status === "Paid"}]
    }));

    setUserOrders([...mappedOrders, ...staticOrders]);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const success = login(email, password);
      if (success) toast.success("Welcome back!");
      else toast.error("Invalid credentials.");
      setIsLoading(false);
    }, 800);
  };

  const bookings = [
    { id: "BK-9921", service: "Professional Refitting", date: "15 May 2026", time: "11:30 AM", status: "Confirmed", studio: "Hyderabad Main Center", therapist: "Vamsi Krishna", instructions: "Please ensure your scalp is clean." },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-charcoal flex flex-col">
        <AnnouncementBar /><Header />
        <div className="flex-1 flex items-center justify-center p-4 py-20">
          <div className="w-full max-w-md bg-background rounded-2xl shadow-2xl border border-gold/20 overflow-hidden">
            <div className="p-8 text-center bg-gold/5 border-b border-border"><h1 className="font-display text-3xl font-bold">Sign In</h1></div>
            <form onSubmit={handleLogin} className="p-8 space-y-6">
              <div className="space-y-2"><label className="text-xs font-bold uppercase text-muted-foreground">Email</label><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-secondary border border-border rounded-lg py-3 px-4" placeholder="user@finixhairstudio.com" /></div>
              <div className="space-y-2"><label className="text-xs font-bold uppercase text-muted-foreground">Password</label><input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-secondary border border-border rounded-lg py-3 px-4" placeholder="••••••" /></div>
              <button type="submit" className="w-full bg-gold text-accent-foreground py-4 rounded-lg font-bold uppercase tracking-widest">Sign In</button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Helper to get a professional display name
  const getDisplayName = () => {
    if (user.email === "admin@finixhairstudio.com") return "Finix Customer";
    return user.email.split('@')[0];
  };

  return (
    <>
      <AnnouncementBar /><Header />
      <main className="bg-off-white min-h-screen pt-10 pb-20">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shadow-lg"><User className="w-8 h-8 text-gold" /></div>
              <div><p className="text-xs text-gold font-bold uppercase tracking-widest">Customer Portal</p><h1 className="font-display text-3xl font-bold capitalize">{getDisplayName()}</h1></div>
            </div>
            <button onClick={logout} className="text-muted-foreground hover:text-red-500 font-bold text-sm bg-secondary px-4 py-2 rounded-lg transition-all">Sign Out</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
            <aside className="bg-background border border-border rounded-xl p-2 sticky top-24 h-fit shadow-sm">
              {[
                { id: "orders", label: "My Orders", icon: ShoppingBag },
                { id: "bookings", label: "Bookings", icon: CalendarCheck },
                { id: "profile", label: "Profile Details", icon: User },
                { id: "settings", label: "Settings", icon: Settings }
              ].map((item) => (
                <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-6 py-4 rounded-lg font-bold text-sm transition-all ${activeTab === item.id ? "bg-gold text-accent-foreground shadow-md" : "hover:bg-secondary text-muted-foreground"}`}><item.icon className="w-4 h-4" />{item.label}</button>
              ))}
            </aside>

            <div className="space-y-8">
              {activeTab === "orders" && (
                <section className="bg-background border border-border rounded-xl overflow-hidden shadow-sm animate-fade-in">
                  <div className="px-8 py-6 border-b border-border flex justify-between items-center"><h2 className="font-display text-2xl font-bold">Recent Orders</h2><Link to="/products" className="text-gold text-xs font-bold uppercase hover:underline">Shop More</Link></div>
                  <div className="divide-y divide-border">
                    {userOrders.map((order) => (
                      <div key={order.id} className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-secondary/10 transition-colors">
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-20 rounded-lg bg-secondary overflow-hidden shrink-0"><img src={order.img} className="w-full h-full object-cover" /></div>
                          <div>
                            <div className="flex items-center gap-2 mb-1"><span className="text-[10px] bg-secondary px-2 py-0.5 rounded font-bold uppercase tracking-widest">{order.id}</span><span className="text-[10px] bg-gold/10 text-gold px-2 py-0.5 rounded font-bold uppercase tracking-widest">{order.status}</span></div>
                            <h3 className="font-bold text-lg">{order.item}</h3><p className="text-sm text-muted-foreground">Order Date: {order.date}</p>
                          </div>
                        </div>
                        <div className="text-right"><p className="text-xl font-bold mb-3">{order.total}</p><button onClick={() => setSelectedOrder(order)} className="bg-gold text-charcoal px-6 py-2.5 rounded-lg text-xs font-bold uppercase hover:bg-gold-dark shadow-sm">Track Order</button></div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activeTab === "bookings" && (
                <section className="bg-background border border-border rounded-xl overflow-hidden shadow-sm animate-fade-in">
                  <div className="px-8 py-6 border-b border-border"><h2 className="font-display text-2xl font-bold">My Bookings</h2></div>
                  <div className="p-8 space-y-4">
                    {bookings.map(b => (
                      <div key={b.id} className="border border-border rounded-xl p-5 flex justify-between items-center bg-secondary/20 hover:border-gold/30 transition-all">
                        <div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center"><CalendarCheck className="w-6 h-6 text-gold" /></div><div><h3 className="font-bold">{b.service}</h3><p className="text-sm text-muted-foreground">{b.date} @ {b.time}</p></div></div>
                        <button onClick={() => setSelectedBooking(b)} className="text-xs font-bold text-gold uppercase underline">View Details</button>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activeTab === "profile" && (
                <section className="bg-background border border-border rounded-xl overflow-hidden shadow-sm animate-fade-in">
                  <div className="px-8 py-6 border-b border-border"><h2 className="font-display text-2xl font-bold">Profile Details</h2></div>
                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-muted-foreground">Full Name</label><div className="flex items-center gap-3 p-4 bg-secondary rounded-lg border border-border"><UserIcon className="w-4 h-4 text-gold" /><span className="text-sm font-semibold">{getDisplayName()}</span></div></div>
                      <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-muted-foreground">Email Address</label><div className="flex items-center gap-3 p-4 bg-secondary rounded-lg border border-border"><Mail className="w-4 h-4 text-gold" /><span className="text-sm font-semibold">{user.email}</span></div></div>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-muted-foreground">Phone Number</label><div className="flex items-center gap-3 p-4 bg-secondary rounded-lg border border-border"><Phone className="w-4 h-4 text-gold" /><span className="text-sm font-semibold">+91 98765 43210</span></div></div>
                      <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-muted-foreground">Address</label><div className="flex items-center gap-3 p-4 bg-secondary rounded-lg border border-border"><MapPin className="w-4 h-4 text-gold" /><span className="text-sm font-semibold">Hyderabad, Telangana</span></div></div>
                    </div>
                  </div>
                </section>
              )}

              {activeTab === "settings" && (
                <section className="bg-background border border-border rounded-xl overflow-hidden shadow-sm animate-fade-in">
                  <div className="px-8 py-6 border-b border-border"><h2 className="font-display text-2xl font-bold">Settings</h2></div>
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center p-6 bg-secondary rounded-xl">
                      <div><h3 className="font-bold">Password</h3><p className="text-xs text-muted-foreground">Secure your account with a new password</p></div>
                      <button onClick={() => setShowPasswordChange(true)} className="bg-gold text-accent-foreground px-6 py-2 rounded-lg text-xs font-bold uppercase">Update</button>
                    </div>
                    <div className="flex justify-between items-center p-6 bg-secondary rounded-xl">
                      <div><h3 className="font-bold">WhatsApp Updates</h3><p className="text-xs text-muted-foreground">Get order updates directly on WhatsApp</p></div>
                      <div className="w-12 h-6 bg-gold rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div></div>
                    </div>
                  </div>
                </section>
              )}

              <div className="bg-charcoal text-background rounded-xl p-8 relative overflow-hidden group border border-gold/10">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                  <div><h3 className="font-display text-2xl font-bold text-gold mb-2">Need Help?</h3><p className="text-sm opacity-70 max-w-md">Our specialists are available Mon-Sat for free consultations and support regarding your hair system.</p></div>
                  <Link to="/contact" className="bg-gold text-charcoal px-8 py-3 rounded-xl font-bold uppercase text-sm hover:scale-105 transition-all shadow-lg">Contact Us</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-background rounded-3xl p-8 border border-gold/20 shadow-2xl">
              <div className="flex justify-between items-center mb-8"><h2 className="font-display text-2xl font-bold">Track Order {selectedOrder.id}</h2><button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-secondary rounded-full transition-colors"><X className="w-6 h-6" /></button></div>
              <div className="space-y-6">
                {selectedOrder.timeline.map((step: any, i: number) => (
                  <div key={i} className="flex gap-4 relative">
                    {i < selectedOrder.timeline.length - 1 && <div className={`absolute left-[11px] top-6 w-0.5 h-10 ${step.done ? "bg-gold" : "bg-border"}`} />}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 shadow-sm ${step.done ? "bg-gold text-accent-foreground" : "bg-border text-muted-foreground"}`}>{step.done ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current" />}</div>
                    <div><p className={`text-sm font-bold ${step.done ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p><p className="text-[10px] text-muted-foreground uppercase">{step.date}</p></div>
                  </div>
                ))}
              </div>
              <button onClick={() => setSelectedOrder(null)} className="w-full mt-10 bg-gold text-accent-foreground py-4 rounded-xl font-bold uppercase shadow-lg hover:bg-gold-dark transition-all">Close</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedBooking && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedBooking(null)} className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-lg bg-background rounded-3xl p-8 border border-gold/20 shadow-2xl">
              <div className="flex justify-between items-center mb-8"><h2 className="font-display text-2xl font-bold">Appointment Details</h2><button onClick={() => setSelectedBooking(null)} className="p-2 hover:bg-secondary rounded-full transition-colors"><X className="w-6 h-6" /></button></div>
              <div className="space-y-4">
                 <div className="flex justify-between border-b border-border py-3"><span className="text-xs uppercase font-bold text-muted-foreground">Service</span><span className="font-bold">{selectedBooking.service}</span></div>
                 <div className="flex justify-between border-b border-border py-3"><span className="text-xs uppercase font-bold text-muted-foreground">Date & Time</span><span className="font-bold">{selectedBooking.date} at {selectedBooking.time}</span></div>
                 <div className="flex justify-between border-b border-border py-3"><span className="text-xs uppercase font-bold text-muted-foreground">Location</span><span className="font-bold">{selectedBooking.studio}</span></div>
                 <div className="p-4 bg-secondary/50 rounded-xl mt-4 border border-border"><p className="text-[10px] font-bold uppercase text-gold mb-1">Pre-Visit Instructions</p><p className="text-sm italic">{selectedBooking.instructions}</p></div>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="w-full mt-10 bg-gold text-accent-foreground py-4 rounded-xl font-bold uppercase shadow-lg hover:bg-gold-dark transition-all">Got it</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer /><CartDrawer />
    </>
  );
};

export default Account;
