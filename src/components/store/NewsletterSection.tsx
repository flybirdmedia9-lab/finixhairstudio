import { useState } from "react";
import { motion } from "framer-motion";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-20 bg-charcoal">
      <div className="container max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl font-bold text-background mb-3">
            Stay Updated – Grab Exclusive Offers!
          </h2>
          <p className="font-body text-background/60 mb-8">
            Be the first one to snag new offers & styles from Finixhair Studio.
          </p>
          {submitted ? (
            <p className="font-body text-gold">Thank you for subscribing!</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-charcoal-light border border-background/20 rounded px-4 py-3 text-background font-body text-sm outline-none focus:border-gold transition-colors"
              />
              <button type="submit" className="bg-gold text-accent-foreground px-6 py-3 rounded font-body font-semibold hover:bg-gold-dark transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
