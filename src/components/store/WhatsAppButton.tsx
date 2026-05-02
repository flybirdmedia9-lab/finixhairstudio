import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/919705060222?text=Hello%2C%20I%20have%20a%20query%20regarding%20wigs."
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-40 bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-background w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="w-6 h-6" />
  </a>
);

export default WhatsAppButton;
