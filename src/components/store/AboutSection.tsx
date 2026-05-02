import { motion } from "framer-motion";

const AboutSection = () => (
  <section className="py-20">
    <div className="container max-w-4xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">About Us</h2>
        <p className="font-body text-muted-foreground leading-relaxed mb-4">
          Finixhair Studio is one of the best wig and hair system brands in Hyderabad. We develop 100% human hair products for the premium market, 
          pre-styled synthetic hair extensions for the economical segment, and other hair care solutions for the modern individual.
        </p>
        <p className="font-body text-muted-foreground leading-relaxed">
          We are pioneers in introducing smart hair systems where innovation and technology are brought into the realm of hair restoration solutions. 
          Finixhair Studio is not just a brand — it's a testament to excellence in the field of hair solutions.
        </p>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
