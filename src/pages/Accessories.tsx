import AnnouncementBar from "@/components/store/AnnouncementBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import WhatsAppButton from "@/components/store/WhatsAppButton";
import ProductCard from "@/components/store/ProductCard";
import CategoryHeader from "@/components/store/CategoryHeader";
import productAccessoryKit from "@/assets/product-accessory-kit.jpg";
import { products } from "@/data/products";

const Accessories = () => {
  const accessories = products.filter((product) => product.category === "Accessories");
  return (
    <>
      <AnnouncementBar />
      <Header />
      <CategoryHeader 
        title="Maintenance & Accessories" 
        subtitle="Professional glue, tape, clips, remover and scalp care essentials"
        image={productAccessoryKit}
        badge="Essential Care"
      />
      <main className="container py-12 md:py-16">
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
