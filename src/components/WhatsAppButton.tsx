import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/mock-data';

interface WhatsAppButtonProps {
  product?: Product;
  selectedSize?: string;
  className?: string;
  variant?: 'full' | 'icon';
}

const WhatsAppButton = ({ product, selectedSize, className = '', variant = 'full' }: WhatsAppButtonProps) => {
  const phoneNumber = '2348012345678';

  const getMessage = () => {
    if (product) {
      return encodeURIComponent(
        `Hello, I want to order:\n\nProduct: ${product.name}\nSize: ${selectedSize || 'Not selected'}\nPrice: ${formatPrice(product.price)}\n\nPlease assist with my order.`
      );
    }
    return encodeURIComponent('Hello, I would like to inquire about The Gentry collections.');
  };

  const url = `https://wa.me/${phoneNumber}?text=${getMessage()}`;

  if (variant === 'icon') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 luxury-ease ${className}`}
        aria-label="Contact via WhatsApp"
      >
        <WhatsAppIcon size={28} />
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-3 px-8 py-4 border border-primary text-primary font-body text-xs tracking-[0.15em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-500 luxury-ease ${className}`}
    >
      <WhatsAppIcon size={16} />
      Order on WhatsApp
    </a>
  );
};

export default WhatsAppButton;
