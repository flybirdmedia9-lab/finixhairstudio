import AnnouncementBar from "@/components/store/AnnouncementBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import WhatsAppButton from "@/components/store/WhatsAppButton";
import AboutSection from "@/components/store/AboutSection";
import TransformationSection from "@/components/store/TransformationSection";
import FeaturesBar from "@/components/store/FeaturesBar";

const About = () => (
  <>
    <AnnouncementBar />
    <Header />
    <div className="container py-16 text-center">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">About Finixhair Studio</h1>
      <p className="font-body text-muted-foreground max-w-xl mx-auto">
        Hyderabad's premier destination for premium wigs and non-surgical hair solutions.
      </p>
    </div>
    <AboutSection />
    <TransformationSection />
    <FeaturesBar />
    <Footer />
    <CartDrawer />
    <WhatsAppButton />
  </>
);

export default About;
