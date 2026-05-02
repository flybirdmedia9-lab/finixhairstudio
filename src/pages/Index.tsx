import AnnouncementBar from "@/components/store/AnnouncementBar";
import Header from "@/components/store/Header";
import HeroSection from "@/components/store/HeroSection";
import HairSystemsShowcase from "@/components/store/HairSystemsShowcase";
import PremiumSection from "@/components/store/PremiumSection";
import AccessoriesPreview from "@/components/store/AccessoriesPreview";
import AboutSection from "@/components/store/AboutSection";
import WhyUsAppointmentSection from "@/components/store/WhyUsAppointmentSection";
import TransformationSection from "@/components/store/TransformationSection";
import FeaturesBar from "@/components/store/FeaturesBar";
import ReviewsSection from "@/components/store/ReviewsSection";
import NewsletterSection from "@/components/store/NewsletterSection";
import Footer from "@/components/store/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import WhatsAppButton from "@/components/store/WhatsAppButton";

const Index = () => {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <HeroSection />
      {/* Home page version: simple grid, no filters */}
      <HairSystemsShowcase isHomePage={true} />
      <PremiumSection />
      <AccessoriesPreview />
      <AboutSection />
      <WhyUsAppointmentSection />
      <TransformationSection />
      <FeaturesBar />
      <ReviewsSection />
      <NewsletterSection />
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </>
  );
};

export default Index;
