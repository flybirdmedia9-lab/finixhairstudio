import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, CalendarCheck, Phone, MessageCircle, Clock, Award, Users, Sparkles } from "lucide-react";

const whyUsPoints = [
  {
    icon: Award,
    title: "10+ Years Experience",
    desc: "Trusted by thousands of clients across Hyderabad for premium hair solutions.",
  },
  {
    icon: Users,
    title: "Expert Stylists",
    desc: "Our certified technicians ensure a flawless, undetectable fit every time.",
  },
  {
    icon: Sparkles,
    title: "100% Natural Hair",
    desc: "All our systems use genuine human hair — zero synthetic shortcuts.",
  },
  {
    icon: CheckCircle2,
    title: "Custom Fit Guarantee",
    desc: "Every system is tailored to your head shape and density preference.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    desc: "Same-week appointments available — no long waiting queues.",
  },
];

const WhyUsAppointmentSection = () => (
  <section className="py-16 md:py-20 bg-off-white">
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* Why Us */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-body text-gold text-xs tracking-[0.2em] uppercase font-semibold mb-2">
            Why Choose Us
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase mb-8">
            Why Finix Hair Studio?
          </h2>

          <div className="space-y-5">
            {whyUsPoints.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4.5 h-4.5 text-gold" />
                </div>
                <div>
                  <h3 className="font-body font-bold text-sm mb-0.5">{title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Book Appointment */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-charcoal text-background rounded-xl p-8 shadow-elegant"
        >
          <div className="flex items-center gap-3 mb-2">
            <CalendarCheck className="w-6 h-6 text-gold" />
            <p className="font-body text-gold text-xs tracking-[0.2em] uppercase font-semibold">
              Book Appointment
            </p>
          </div>
          <h3 className="font-display text-2xl font-bold mb-3">
            Visit Finix Hair Studio
          </h3>
          <p className="font-body text-sm text-background/70 leading-relaxed mb-6">
            Step into our Hyderabad studio for a personalized hair system consultation. Our experts will guide you to the perfect solution for your hair goals.
          </p>

          {/* Timing */}
          <div className="bg-background/5 border border-background/10 rounded-lg p-4 mb-6 space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-gold" />
              <span className="font-body text-xs font-bold uppercase tracking-wide text-background/80">
                Studio Timings
              </span>
            </div>
            {[
              { day: "Monday – Saturday", time: "10:00 AM – 8:00 PM" },
              { day: "Sunday", time: "11:00 AM – 6:00 PM" },
            ].map((slot) => (
              <div key={slot.day} className="flex justify-between font-body text-sm">
                <span className="text-background/70">{slot.day}</span>
                <span className="text-gold font-semibold">{slot.time}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Link
              to="/consultation"
              className="flex items-center justify-center gap-2 bg-gold text-accent-foreground px-6 py-3.5 rounded-lg font-body text-sm font-bold uppercase hover:bg-gold-dark transition-colors"
            >
              <CalendarCheck className="w-4 h-4" />
              Book Free Consultation
            </Link>
            <a
              href="https://wa.me/919705060222?text=Hello%2C%20I'd%20like%20to%20book%20an%20appointment%20at%20Finix%20Hair%20Studio."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-background/20 text-background px-6 py-3.5 rounded-lg font-body text-sm font-medium hover:bg-background/10 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-green-400" />
              WhatsApp Us
            </a>
            <a
              href="tel:+919705060222"
              className="flex items-center justify-center gap-2 text-background/60 px-6 py-2.5 font-body text-sm hover:text-gold transition-colors"
            >
              <Phone className="w-4 h-4" />
              +91 9705060222
            </a>
          </div>

          {/* Address */}
          <div className="mt-6 pt-5 border-t border-background/10">
            <p className="font-body text-xs text-background/50 uppercase tracking-widest mb-1">Address</p>
            <p className="font-body text-sm text-background/80">
              Finix Hair Studio, Hyderabad, Telangana, India
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default WhyUsAppointmentSection;
