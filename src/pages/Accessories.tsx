import AnnouncementBar from "@/components/store/AnnouncementBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import WhatsAppButton from "@/components/store/WhatsAppButton";
import ProductCard from "@/components/store/ProductCard";
import { products } from "@/data/products";

const Accessories = () => {
  const accessories = products.filter((product) => product.category === "Accessories");
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="container py-8 md:py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold uppercase mb-4">Accessories</h1>
          <p className="font-body text-sm text-muted-foreground max-w-2xl">Professional glue, tape, clips, remover and scalp care essentials.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {accessories.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
        </div>
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </>
  );
};

export default Accessories;
