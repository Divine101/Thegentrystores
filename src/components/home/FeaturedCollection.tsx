import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/mock-data';

const FeaturedCollection = () => {
  const featured = products.filter(p => p.featured);

  return (
    <section className="py-24 md:py-32 px-4 md:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs font-body tracking-[0.3em] uppercase text-primary mb-3">Curated</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">Featured Collection</h2>
        </motion.div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {featured[0] && (
            <div className="md:col-span-8">
              <ProductCard product={featured[0]} index={0} size="large" />
            </div>
          )}
          <div className="md:col-span-4 flex flex-col gap-4 md:gap-6">
            {featured[1] && <ProductCard product={featured[1]} index={1} />}
            {featured[2] && <ProductCard product={featured[2]} index={2} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
