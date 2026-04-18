import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';

const NewArrivals = () => {
  const { data: products = [] } = useProducts();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 md:py-32 bg-card/50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-body tracking-[0.3em] uppercase text-primary mb-3">Just In</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">New Arrivals</h2>
          </motion.div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-4 md:px-8 pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {products.map((product, i) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[280px] md:w-[340px]"
            style={{ scrollSnapAlign: 'start' }}
          >
            <ProductCard product={product} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
