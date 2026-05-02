import { useState } from "react";
import AnnouncementBar from "@/components/store/AnnouncementBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import WhatsAppButton from "@/components/store/WhatsAppButton";
import { CheckCircle, MessageCircle, CalendarDays } from "lucide-react";

const services = ["Hair system fixing", "Maintenance", "Hair system removal", "Consultation"];
const times = ["10:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM", "06:00 PM"];

const Consultation = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ service: "Hair system fixing", date: "", time: "11:00 AM", name: "", phone: "", email: "", location: "", message: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  if (submitted) {
    return (
      <><AnnouncementBar /><Header /><div className="container py-20 text-center max-w-lg mx-auto"><CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" /><h1 className="font-display text-3xl font-bold mb-4">Booking Confirmed!</h1><p className="font-body text-muted-foreground mb-6">Your {form.service.toLowerCase()} slot is requested for {form.date} at {form.time}. Vamsi will contact you shortly.</p><a href="https://wa.me/919705060222?text=Hi%20Vamsi,%20I%20just%20confirmed%20a%20booking." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gold text-accent-foreground px-6 py-3 rounded font-body font-semibold hover:bg-gold-dark transition-colors"><MessageCircle className="w-4 h-4" /> Chat on WhatsApp</a></div><Footer /></>
    );
  }

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="container py-8 md:py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold uppercase mb-4">Book Consultation</h1>
          <p className="font-body text-sm text-muted-foreground">Select a service, choose a date and time, and confirm your details.</p>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          <section className="border border-border rounded p-6">
            <h2 className="font-display text-xl font-bold mb-5 uppercase">Select Service</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {services.map((service) => <label key={service} className={`border rounded p-4 cursor-pointer font-body text-sm transition-colors ${form.service === service ? "border-gold bg-gold/5" : "border-border hover:border-gold"}`}><input type="radio" name="service" value={service} checked={form.service === service} onChange={handleChange} className="mr-2 accent-[hsl(var(--gold))]" />{service}</label>)}
            </div>
            <h2 className="font-display text-xl font-bold mb-5 uppercase">Select Date & Time</h2>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_220px] gap-4">
              <div><label className="font-body text-sm font-medium mb-1 block">Date *</label><input name="date" type="date" required value={form.date} onChange={handleChange} className="w-full border border-border rounded px-4 py-3 text-sm font-body outline-none focus:border-gold bg-background" /></div>
              <div><label className="font-body text-sm font-medium mb-1 block">Time *</label><select name="time" value={form.time} onChange={handleChange} className="w-full border border-border rounded px-4 py-3 text-sm font-body outline-none focus:border-gold bg-background">{times.map((time) => <option key={time} value={time}>{time}</option>)}</select></div>
            </div>
          </section>
          <section className="border border-border rounded p-6 h-fit">
            <CalendarDays className="w-7 h-7 text-gold mb-4" />
            <h2 className="font-display text-xl font-bold mb-5 uppercase">Your Details</h2>
            <div className="space-y-4">
              <input name="name" required placeholder="Full name *" value={form.name} onChange={handleChange} className="w-full border border-border rounded px-4 py-3 text-sm font-body outline-none focus:border-gold bg-background" />
              <input name="phone" type="tel" required placeholder="Phone number *" value={form.phone} onChange={handleChange} className="w-full border border-border rounded px-4 py-3 text-sm font-body outline-none focus:border-gold bg-background" />
              <input name="email" type="email" placeholder="Email address" value={form.email} onChange={handleChange} className="w-full border border-border rounded px-4 py-3 text-sm font-body outline-none focus:border-gold bg-background" />
              <input name="location" placeholder="Location / city" value={form.location} onChange={handleChange} className="w-full border border-border rounded px-4 py-3 text-sm font-body outline-none focus:border-gold bg-background" />
              <textarea name="message" rows={4} placeholder="Additional notes" value={form.message} onChange={handleChange} className="w-full border border-border rounded px-4 py-3 text-sm font-body outline-none focus:border-gold bg-background resize-none" />
              <button type="submit" className="w-full bg-gold text-accent-foreground py-4 rounded font-body font-semibold hover:bg-gold-dark transition-colors">Confirm Booking</button>
            </div>
          </section>
        </form>
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </>
  );
};

export default Consultation;
