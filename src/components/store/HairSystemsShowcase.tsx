import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, Settings, Crown, Star, Tag, ChevronRight } from "lucide-react";

// ── Extended filter definitions from client sketch ──────────────────────────
const filters = {
  serviceTier: {
    label: "Service Tier",
    options: ["Regular", "Premium"],
  },
  hairColor: {
    label: "Hair Color",
    options: ["Black", "Dark Brown", "Brown", "Grey", "Auburn", "Natural Black"],
  },
  hairDesign: {
    label: "Hair Design",
    options: ["Straight", "Wavy", "Curly", "Kinky", "Bodywave"],
  },
  texture: {
    label: "Texture",
    options: ["Smooth", "Silky", "Coarse"],
  },
  hairDensity: {
    label: "Hair Density",
    options: ["Light", "Medium", "Heavy"],
  },
  baseSize: {
    label: "Base Size",
    options: ["7x5", "8x6", "10x8", "10x10", "Custom"],
  },
  hairType: {
    label: "Base Type",
    options: ["Mono", "Lace", "Silk", "Poly"],
  },
};

type FilterKey = keyof typeof filters;

const posterItems = [
  {
    id: "poster-1",
    label: "🔥 New Arrivals",
    desc: "Fresh stock — book before it sells out",
    link: "/products?filter=new",
    bg: "from-gold/20 to-gold/5",
    icon: Star,
  },
  {
    id: "poster-2",
    label: "💎 Premium Systems",
    desc: "Signature studio-exclusive hair systems",
    link: "/products?tier=Premium",
    bg: "from-charcoal/80 to-charcoal/40",
    icon: Crown,
  },
  {
    id: "poster-3",
    label: "🏷️ Current Offers",
    desc: "Up to 30% off — limited time deals",
    link: "/products?offer=true",
    bg: "from-amber-900/30 to-amber-700/10",
    icon: Tag,
  },
];

interface HairSystemsShowcaseProps {
  isHomePage?: boolean;
}

const HairSystemsShowcase = ({ isHomePage = false }: HairSystemsShowcaseProps) => {
  const [searchParams] = useSearchParams();
  const [selected, setSelected] = useState<Record<FilterKey, string[]>>({
    serviceTier: [],
    hairColor: [],
    hairDesign: [],
    texture: [],
    hairDensity: [],
    baseSize: [],
    hairType: [],
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync with URL params
  useEffect(() => {
    const tier = searchParams.get("tier");
    if (tier && (tier === "Regular" || tier === "Premium")) {
      setSelected(prev => ({ ...prev, serviceTier: [tier] }));
    }
  }, [searchParams]);

  const toggle = (key: FilterKey, value: string) => {
    setSelected((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((item) => item !== value)
        : [...current[key], value],
    }));
  };

  const clearAll = () =>
    setSelected({ serviceTier: [], hairColor: [], hairDesign: [], texture: [], hairDensity: [], baseSize: [], hairType: [] });

  const activeFilterCount = Object.values(selected).flat().length;

  const visibleProducts = useMemo(() => {
    let result = products.filter((p) => p.category === "Hair Systems");

    if (!isHomePage) {
      result = result.filter((p) => {
        const tierMatch = selected.serviceTier.length === 0 || selected.serviceTier.includes(p.serviceTier);
        const colorMatch = selected.hairColor.length === 0 || selected.hairColor.includes(p.color || "");
        const densityMatch = selected.hairDensity.length === 0 || selected.hairDensity.includes(p.density || "");
        const sizeMatch = selected.baseSize.length === 0 || selected.baseSize.includes(p.size || "");
        const typeMatch = selected.hairType.length === 0 || selected.hairType.includes(p.baseType || "");
        return tierMatch && colorMatch && densityMatch && sizeMatch && typeMatch;
      });
    }

    return isHomePage ? result.slice(0, 8) : result;
  }, [selected, isHomePage]);

  return (
    <section className={`py-10 md:py-14 bg-background ${isHomePage ? "border-b border-border/40" : ""}`}>
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-body text-gold text-xs tracking-[0.2em] uppercase font-semibold mb-1">
              Browse Collection
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase">
              {isHomePage ? "Featured Hair Systems" : "New Hair Systems"}
            </h2>
          </div>
          {!isHomePage && (
            <div className="flex items-center gap-3">
              {activeFilterCount > 0 && (
                <button onClick={clearAll} className="font-body text-xs text-gold hover:text-gold-dark flex items-center gap-1">
                  <X className="w-3.5 h-3.5" /> Clear ({activeFilterCount})
                </button>
              )}
              <button className="lg:hidden flex items-center gap-2 border border-border rounded px-3 py-2 font-body text-xs" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <SlidersHorizontal className="w-4 h-4" />
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>
            </div>
          )}
          {isHomePage && (
            <Link to="/products" className="text-gold font-body text-sm font-bold flex items-center gap-1 hover:text-gold-dark transition-colors uppercase tracking-wider">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Layout: Sidebar | Grid | Poster */}
        <div className={`grid gap-6 xl:gap-8 ${isHomePage ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-[220px_1fr_200px]"}`}>

          {/* SIDEBAR (Hidden on Home Page) */}
          {!isHomePage && (
            <aside className={`border border-border rounded-lg p-4 h-fit lg:sticky lg:top-28 bg-background shadow-card ${sidebarOpen ? "block" : "hidden lg:block"}`}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-base font-semibold flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-gold" />
                  Filters
                </h3>
              </div>
              <div className="space-y-5">
                {(Object.entries(filters) as [FilterKey, (typeof filters)[FilterKey]][]).map(([key, { label, options }]) => (
                  <div key={key} className="border-b border-border/50 pb-4 last:border-b-0 last:pb-0">
                    <h4 className="font-body text-xs font-bold uppercase tracking-wide text-foreground mb-2.5">{label}</h4>
                    <div className="space-y-1.5">
                      {options.map((value) => (
                        <label key={value} className="flex items-center gap-2 font-body text-sm text-muted-foreground cursor-pointer hover:text-foreground group">
                          <input type="checkbox" checked={selected[key].includes(value)} onChange={() => toggle(key, value)} className="accent-[hsl(var(--gold))] w-3.5 h-3.5" />
                          <span className="group-hover:text-foreground transition-colors">{value}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-border/50">
                <Link to="/admin" className="flex items-center gap-2 font-body text-xs text-muted-foreground hover:text-gold transition-colors">
                  <Settings className="w-3.5 h-3.5" /> Admin Panel
                </Link>
              </div>
            </aside>
          )}

          {/* GRID */}
          <div>
            <motion.div className={`grid gap-3 md:gap-4 ${isHomePage ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"}`} initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
              {visibleProducts.map((product, i) => (
                <motion.div key={product.id} variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.35 }}>
                  <ProductCard product={product} index={i} />
                </motion.div>
              ))}
            </motion.div>

            {isHomePage && (
              <div className="text-center mt-12">
                <Link to="/products" className="inline-flex items-center gap-2 bg-gold text-accent-foreground px-10 py-4 rounded font-body text-sm font-bold uppercase hover:bg-gold-dark transition-all transform hover:scale-105 shadow-lg">
                  Explore Full Collection <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* RIGHT POSTER (Hidden on Home Page) */}
          {!isHomePage && (
            <aside className="hidden lg:flex flex-col gap-4">
              <div className="mb-1"><p className="font-body text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Featured</p><div className="h-px bg-gold/30" /></div>
              {posterItems.map(({ id, label, desc, link, bg, icon: Icon }) => (
                <Link key={id} to={link} className={`block rounded-lg p-4 bg-gradient-to-br ${bg} border border-border hover:border-gold/40 hover:shadow-md transition-all group`}>
                  <Icon className="w-5 h-5 text-gold mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-body text-xs font-bold text-foreground mb-1 leading-snug">{label}</p>
                  <p className="font-body text-[11px] text-muted-foreground leading-snug">{desc}</p>
                </Link>
              ))}
              <div className="mt-2 rounded-lg border border-border p-4 bg-background">
                <p className="font-body text-xs font-bold uppercase tracking-widest mb-3 text-foreground">Size Guide</p>
                <table className="w-full text-[11px] font-body">
                  <thead><tr className="border-b border-border"><th className="text-left pb-1.5 text-muted-foreground font-semibold">Size</th><th className="text-right pb-1.5 text-muted-foreground font-semibold">Type</th></tr></thead>
                  <tbody className="divide-y divide-border/40">
                    {[{ size: "7×5", type: "Small" }, { size: "8×6", type: "Medium" }, { size: "10×8", type: "Large" }, { size: "10×10", type: "XL" }, { size: "Custom", type: "Studio" }].map((row) => (
                      <tr key={row.size}><td className="py-1.5 text-foreground font-medium">{row.size}</td><td className="py-1.5 text-right text-muted-foreground">{row.type}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
};

export default HairSystemsShowcase;
