import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';

const InstagramGallery = () => {
  const { data: products = [] } = useProducts();
  const images = products.map(p => p.images && p.images[0]).filter(Boolean);

  return (
    <section className="py-24 md:py-32 px-4 md:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <p className="text-xs font-body tracking-[0.3em] uppercase text-primary mb-3">
            <Instagram size={14} className="inline mr-2" />
            @thegentry
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">Follow the Movement</h2>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2">
          {images.map((img, i) => (
            <motion.a
              key={i}
              href="https://www.instagram.com/the_gentry_clothing?igsh=cW9yNmp3a244enI4&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="aspect-square overflow-hidden group relative"
            >
              <img
                src={img}
                alt="Instagram post"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram size={20} className="text-primary" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery;
