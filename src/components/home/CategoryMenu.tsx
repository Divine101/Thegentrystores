import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  { id: 'senator', label: 'Senator', image: 'https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=600&auto=format&fit=crop' },
  { id: 'suit', label: 'Suits', image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e5?q=80&w=600&auto=format&fit=crop' },
  { id: 'agbada', label: 'Agbada', image: 'https://images.unsplash.com/photo-1623910271018-ce8f66887550?q=80&w=600&auto=format&fit=crop' },
  { id: 'accessories', label: 'Accessories', image: 'https://images.unsplash.com/photo-1611080769399-4c8d52f9011f?q=80&w=600&auto=format&fit=crop' },
];

const CategoryMenu = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-8 border-b border-border/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl text-foreground">Shop by Category</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to={`/shop?category=${cat.id}`} className="group block relative overflow-hidden aspect-[4/5] bg-card">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-6 left-0 right-0 text-center">
                  <h3 className="font-display text-xl md:text-2xl text-foreground tracking-wide group-hover:text-primary transition-colors duration-300">
                    {cat.label}
                  </h3>
                  <span className="inline-block mt-2 text-[10px] font-body tracking-[0.2em] uppercase text-primary border-b border-primary/0 group-hover:border-primary/100 transition-colors pb-1">
                    Explore
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryMenu;
