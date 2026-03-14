import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import { products, categories } from '@/lib/mock-data';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');

  const filtered = useMemo(() => {
    let result = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);
    switch (sortBy) {
      case 'price-asc': return [...result].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...result].sort((a, b) => b.price - a.price);
      case 'newest': return [...result].reverse();
      default: return result;
    }
  }, [activeCategory, sortBy]);

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
    if (value === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', value);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24 px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-body tracking-[0.3em] uppercase text-primary mb-3">The Collection</p>
            <h1 className="font-display text-5xl md:text-6xl text-foreground">
              {activeCategory === 'all' ? 'All Pieces' : categories.find(c => c.value === activeCategory)?.label}
            </h1>
          </motion.div>
        </section>

        {/* Filters */}
        <div className="container mx-auto px-4 md:px-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-y border-border/50 py-4">
            <div className="flex flex-wrap items-center gap-4 md:gap-8">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`text-xs font-body tracking-[0.15em] uppercase transition-colors duration-300 pb-1 ${
                    activeCategory === cat.value
                      ? 'text-primary border-b border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="bg-transparent text-xs font-body tracking-[0.1em] uppercase text-muted-foreground border border-border px-4 py-2 focus:outline-none focus:border-primary"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="container mx-auto px-4 md:px-8 pb-24">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-muted-foreground">No pieces found in this collection.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton variant="icon" />
    </div>
  );
};

export default Shop;
