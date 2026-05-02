import AnnouncementBar from "@/components/store/AnnouncementBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import WhatsAppButton from "@/components/store/WhatsAppButton";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";

const Contact = () => (
  <>
    <AnnouncementBar />
    <Header />
    <div className="container py-16 max-w-4xl">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">Contact Us</h1>
      <p className="font-body text-muted-foreground text-center mb-12">We'd love to hear from you. Get in touch with us.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h3 className="font-body font-semibold mb-1">Phone</h3>
              <a href="tel:+919705060222" className="font-body text-muted-foreground hover:text-gold transition-colors">+91 9705060222</a>
              <p className="font-body text-sm text-muted-foreground">Contact: Vamsi</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h3 className="font-body font-semibold mb-1">WhatsApp</h3>
              <a href="https://wa.me/919705060222" target="_blank" rel="noopener noreferrer" className="font-body text-gold hover:text-gold-dark transition-colors">
                Chat with Vamsi
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h3 className="font-body font-semibold mb-1">Email</h3>
              <a href="mailto:info@finixhairstudio.com" className="font-body text-muted-foreground hover:text-gold transition-colors">info@finixhairstudio.com</a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h3 className="font-body font-semibold mb-1">Location</h3>
              <p className="font-body text-muted-foreground">Hyderabad, Telangana, India</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h3 className="font-body font-semibold mb-1">Working Hours</h3>
              <p className="font-body text-muted-foreground">Mon - Sat: 10:00 AM - 8:00 PM</p>
              <p className="font-body text-muted-foreground">Sunday: By Appointment</p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-lg overflow-hidden border border-border h-80 md:h-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.31698393936!2d78.24323269999999!3d17.4123487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Finixhair Studio Location"
          />
        </div>
      </div>
    </div>
    <Footer />
    <CartDrawer />
    <WhatsAppButton />
  </>
);

export default Contact;
