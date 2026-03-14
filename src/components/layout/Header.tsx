import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/cart-context';
import logo from '@/assets/logo.png';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Collections' },
  { to: '/shop?category=senator', label: 'Senator' },
  { to: '/shop?category=suit', label: 'Suits' },
  { to: '/shop?category=agbada', label: 'Agbada' },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-foreground p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.slice(0, 3).map(link => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`text-xs font-body tracking-[0.2em] uppercase transition-colors duration-300 luxury-ease ${
                    location.pathname === link.to
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <img src={logo} alt="The Gentry" className="h-14 w-auto" />
            </Link>

            {/* Right nav */}
            <div className="flex items-center gap-8">
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.slice(3).map(link => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-xs font-body tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 luxury-ease"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <Link to="/checkout" className="relative p-2 text-foreground hover:text-primary transition-colors">
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-body font-semibold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-background pt-20"
          >
            <nav className="flex flex-col items-center gap-8 pt-12">
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-display tracking-[0.15em] uppercase text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
