import { Truck, Shield, RefreshCw, Star } from "lucide-react";

const features = [
  { icon: Truck, title: "Super Fast Delivery", desc: "Multiple shipping options available" },
  { icon: Shield, title: "Best Price Guarantee", desc: "Best prices on all fresh stock items" },
  { icon: RefreshCw, title: "Hassle-Free Exchange", desc: "100% hassle-free exchange policy" },
  { icon: Star, title: "Assured Satisfaction", desc: "5 Star ratings across products" },
];

const FeaturesBar = () => (
  <section className="bg-off-white py-12">
    <div className="container grid grid-cols-2 md:grid-cols-4 gap-6">
      {features.map((f) => (
        <div key={f.title} className="flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
            <f.icon className="w-5 h-5 text-gold" />
          </div>
          <h3 className="font-body font-semibold text-sm">{f.title}</h3>
          <p className="font-body text-xs text-muted-foreground">{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturesBar;
