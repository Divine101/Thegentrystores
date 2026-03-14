import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatPrice } from '@/lib/mock-data';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index?: number;
  size?: 'default' | 'large';
}

const ProductCard = ({ product, index = 0, size = 'default' }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/product/${product.slug}`} className="group block">
        <div className={`relative overflow-hidden bg-card ${size === 'large' ? 'aspect-[3/4]' : 'aspect-[3/4]'}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {product.featured && (
            <span className="absolute top-4 left-4 text-[10px] font-body tracking-[0.2em] uppercase text-primary bg-background/80 backdrop-blur-sm px-3 py-1">
              Featured
            </span>
          )}
        </div>
        <div className="pt-4 pb-2">
          <p className="text-[10px] font-body tracking-[0.2em] uppercase text-muted-foreground mb-1">
            {product.collection || product.category}
          </p>
          <h3 className="font-display text-lg md:text-xl text-foreground group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
          <p className="font-body text-sm text-primary mt-1">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
