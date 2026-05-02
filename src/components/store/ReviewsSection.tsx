import { Star } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  { name: "Rajesh K.", rating: 5, text: "Absolutely amazing quality! The hair system looks so natural. Nobody can tell it's not my real hair. Vamsi was very helpful throughout.", date: "2 weeks ago" },
  { name: "Priya M.", rating: 5, text: "Best wig I've ever purchased. The silk mirage is worth every penny. Shipping to Hyderabad was super fast.", date: "1 month ago" },
  { name: "Anil S.", rating: 4, text: "Great product and excellent customer support. The consultation helped me choose the perfect hair system for my needs.", date: "3 weeks ago" },
  { name: "Kavitha R.", rating: 5, text: "The transformation is unbelievable! I feel so much more confident now. Thank you Finixhair Studio!", date: "1 week ago" },
];

const ReviewsSection = () => (
  <section className="py-20 bg-off-white">
    <div className="container">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">Customer Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-background p-6 rounded-lg shadow-card"
          >
            <div className="flex gap-1 mb-3">
              {Array.from({ length: r.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed">"{r.text}"</p>
            <div className="flex justify-between items-center">
              <span className="font-body font-semibold text-sm">{r.name}</span>
              <span className="font-body text-xs text-muted-foreground">{r.date}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ReviewsSection;
