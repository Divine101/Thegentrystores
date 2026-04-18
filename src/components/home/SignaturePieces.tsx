import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatPrice } from '@/lib/mock-data';
import { useProducts } from '@/hooks/useProducts';

const SignaturePieces = () => {
  const { data: products = [] } = useProducts();
  const signature = products.slice(0, 2);

  return (
    <section className="py-24 md:py-32 px-4 md:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <p className="text-xs font-body tracking-[0.3em] uppercase text-primary mb-3">Iconic</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">Signature Pieces</h2>
        </motion.div>

        <div className="space-y-24">
          {signature.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${
                i % 2 === 1 ? 'md:direction-rtl' : ''
              }`}
            >
              <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                <Link to={`/product/${product.slug}`} className="block overflow-hidden group">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    loading="lazy"
                  />
                </Link>
              </div>
              <div className={`flex flex-col justify-center ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                <p className="text-xs font-body tracking-[0.3em] uppercase text-primary mb-4">
                  {product.collection}
                </p>
                <h3 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                  {product.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 max-w-md">
                  {product.description}
                </p>
                <p className="font-display text-2xl text-primary mb-8">
                  {formatPrice(product.price)}
                </p>
                <Link
                  to={`/product/${product.slug}`}
                  className="inline-flex items-center gap-4 text-xs font-body tracking-[0.2em] uppercase text-foreground hover:text-primary transition-colors group"
                >
                  Discover
                  <span className="w-12 h-px bg-foreground group-hover:bg-primary group-hover:w-20 transition-all duration-500" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignaturePieces;
