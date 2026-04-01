import { Link } from 'react-router-dom';
import { Instagram, Phone } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/50 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
             <img src={logo} alt="The Gentry" className="h-16 w-auto mb-4 mix-blend-lighten" />
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              Premium fashion for the modern Nigerian man. Quality you can see, style you can feel.
            </p>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-xs font-body tracking-[0.2em] uppercase text-primary mb-6">Collections</h4>
            <div className="flex flex-col gap-3">
              <Link to="/shop?category=senator" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">Senator Wear</Link>
              <Link to="/shop?category=suit" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">Suits</Link>
              <Link to="/shop?category=agbada" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">Agbada</Link>
              <Link to="/shop?category=accessories" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">Accessories</Link>
            </div>
          </div>

          {/* The House */}
          <div>
            <h4 className="text-xs font-body tracking-[0.2em] uppercase text-primary mb-6">The House</h4>
            <div className="flex flex-col gap-3">
              <Link to="/#brand-story" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">Our Story</Link>
              <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">All Pieces</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-body tracking-[0.2em] uppercase text-primary mb-6">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/2348012345678?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20The%20Gentry%20collections."
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body flex items-center gap-2"
              >
                <Phone size={14} />
                WhatsApp Us
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body flex items-center gap-2"
              >
                <Instagram size={14} />
                @thegentry
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-body tracking-wider">
            © {new Date().getFullYear()} THE GENTRY CLOTHING. ALL RIGHTS RESERVED.
          </p>
          <p className="text-xs text-muted-foreground/50 font-display italic">
            Est. MMXXVI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
