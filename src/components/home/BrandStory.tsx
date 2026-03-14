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
          <p className="text-xs font-body tracking-[0.3em] uppercase text-primary mb-6">Our Heritage</p>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-8 leading-tight">
            Crafted for Kings.<br />
            <span className="italic text-primary">Worn by Leaders.</span>
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mb-8" />
          <p className="font-body text-sm md:text-base text-muted-foreground leading-[1.8] mb-6">
            The Gentry was born from a singular vision — to create clothing worthy of the men who shape our nation's destiny. Every thread, every stitch, every silhouette is a deliberate act of reverence for the art of dressing well.
          </p>
          <p className="font-body text-sm md:text-base text-muted-foreground leading-[1.8] mb-10">
            We draw from the rich tapestry of Nigerian heritage — the commanding presence of traditional senator wear, the grandeur of the agbada, the precision of European tailoring — and weave them into garments that transcend fashion. This is not clothing. This is armor for the modern king.
          </p>
          <p className="font-display text-xl italic text-primary/60">Est. MMXXVI</p>
        </motion.div>
      </div>
      
      {/* Decorative line bottom */}
      <div className="absolute bottom-0 left-1/2 w-px h-24 bg-gradient-to-t from-transparent to-primary/30" />
    </section>
  );
};

export default BrandStory;
