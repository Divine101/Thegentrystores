import { motion } from 'framer-motion';

const BrandStory = () => {
  return (
    <section id="brand-story" className="py-24 md:py-40 px-4 md:px-8 bg-card/30 relative overflow-hidden">
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 w-px h-24 bg-gradient-to-b from-transparent to-primary/30" />
      
      <div className="container mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-body tracking-[0.3em] uppercase text-primary mb-6">Our Story</p>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-8 leading-tight">
            Made with Pride.<br />
            <span className="italic text-primary">Worn with Confidence.</span>
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mb-8" />
          <p className="font-body text-sm md:text-base text-muted-foreground leading-[1.8] mb-6">
            The Gentry was built on one idea — every man deserves clothing that makes him look and feel his best. We put care into every detail, from fabric to finishing, so you always step out looking sharp.
          </p>
          <p className="font-body text-sm md:text-base text-muted-foreground leading-[1.8] mb-10">
            We blend the best of Nigerian fashion — the bold senator wear, the classic agbada, the clean-cut suit — into pieces you'll be proud to wear anywhere. Quality fashion, made for real life.
          </p>
          <p className="font-display text-xl italic text-primary/60">Est. 2026</p>
        </motion.div>
      </div>
      
      {/* Decorative line bottom */}
      <div className="absolute bottom-0 left-1/2 w-px h-24 bg-gradient-to-t from-transparent to-primary/30" />
    </section>
  );
};

export default BrandStory;
