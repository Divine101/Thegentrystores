import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import { formatPrice } from '@/lib/mock-data';
import { useProductBySlug, useProducts } from '@/hooks/useProducts';
import { Loader2 } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

const ProductDetail = () => {
  const { slug } = useParams();
  const { data: product, isLoading: isProductLoading } = useProductBySlug(slug);
  const { data: products = [], isLoading: isProductsLoading } = useProducts();
  const [selectedSize, setSelectedSize] = useState('');
  const [imageZoom, setImageZoom] = useState(false);
  const { addItem } = useCart();

  if (isProductLoading || isProductsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Header />
        <div className="pt-20">
          <Loader2 className="animate-spin text-muted-foreground w-8 h-8" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Header />
        <div className="text-center pt-20">
          <h1 className="font-display text-4xl text-foreground mb-4">Piece Not Found</h1>
          <Link to="/shop" className="text-primary font-body text-sm hover:underline">
            Return to Collection
          </Link>
        </div>
      </div>
    );
  }

  const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addItem(product, selectedSize);
    toast.success(`${product.name} added to your selection`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 md:px-8 py-6">
          <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-body tracking-[0.1em] uppercase text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft size={14} />
            Back to Collection
          </Link>
        </div>

        {/* Product */}
        <div className="container mx-auto px-4 md:px-8 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden cursor-zoom-in"
              onClick={() => setImageZoom(!imageZoom)}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className={`w-full aspect-[3/4] object-cover transition-transform duration-700 ${
                  imageZoom ? 'scale-150' : 'scale-100'
                }`}
              />
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-center"
            >
              <p className="text-xs font-body tracking-[0.3em] uppercase text-primary mb-3">
                {product.collection}
              </p>
              <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
                {product.name}
              </h1>
              <p className="font-display text-3xl text-primary mb-8">
                {formatPrice(product.price)}
              </p>

              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8 max-w-lg">
                {product.description}
              </p>

              {/* Fabric */}
              {product.fabric && (
                <div className="mb-8 pb-8 border-b border-border/50">
                  <p className="text-xs font-body tracking-[0.15em] uppercase text-muted-foreground mb-2">Fabric & Craftsmanship</p>
                  <p className="font-body text-sm text-foreground">{product.fabric}</p>
                </div>
              )}

              {/* Size selector */}
              <div className="mb-8">
                <p className="text-xs font-body tracking-[0.15em] uppercase text-muted-foreground mb-4">Select Size</p>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 font-body text-sm tracking-wider border transition-all duration-300 ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-8 py-4 bg-primary text-primary-foreground font-body text-xs tracking-[0.15em] uppercase hover:bg-primary/90 transition-all duration-500 luxury-ease gold-glow"
                >
                  Add to Cart
                </button>
                <WhatsAppButton product={product} selectedSize={selectedSize} className="flex-1" />
              </div>

              {/* Stock */}
              <p className="mt-4 text-xs font-body text-muted-foreground">
                {product.stock <= 5 ? `Only ${product.stock} remaining` : 'In Stock'}
              </p>
            </motion.div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-24 md:mt-32">
              <h2 className="font-display text-3xl text-foreground text-center mb-12">You May Also Desire</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {related.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
