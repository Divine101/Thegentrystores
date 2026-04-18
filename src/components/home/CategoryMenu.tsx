import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  { id: 'senator', label: 'Senator' },
  { id: 'suit', label: 'Suits' },
  { id: 'agbada', label: 'Agbada' },
  { id: 'accessories', label: 'Accessories' },
];

const CategoryMenu = () => {
  return (
    <section className="py-8 md:py-12 px-4 md:px-8 border-b border-border/50 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap justify-center gap-4 md:gap-8"
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.id}`}
              className="px-8 py-4 border border-border text-muted-foreground font-body text-xs tracking-[0.15em] uppercase hover:border-foreground hover:text-foreground transition-all duration-300"
            >
              {cat.label}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryMenu;
