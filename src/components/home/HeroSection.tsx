import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import heroSuit from '@/assets/hero-suit.jpg';
import heroAgbada from '@/assets/hero-agbada.jpg';
import heroSenator from '@/assets/hero-senator.jpg';

const slides = [
  {
    image: heroSenator,
    label: 'Senator Collection',
    heading: ['Crafted for', 'Royalty'],
    description: 'Exquisite senator wear with intricate embroidery, designed for the man who commands every room.',
  },
  {
    image: heroSuit,
    label: 'Suit Collection',
    heading: ['The Art of', 'Tailoring'],
    description: 'Double-breasted precision. Bespoke suits that define modern elegance for the distinguished gentleman.',
  },
  {
    image: heroAgbada,
    label: 'Agbada Collection',
    heading: ['Heritage', 'Redefined'],
    description: 'Royal agbada with masterful embroidery — where Nigerian heritage meets contemporary luxury.',
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      {/* Background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.label}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-32 px-4 sm:px-6 md:px-16 lg:px-24 pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <p className="text-xs font-body tracking-[0.3em] uppercase text-primary mb-4">
              {slide.label}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-foreground leading-[0.9] mb-4 md:mb-6">
              {slide.heading[0]}<br />
              <span className="italic text-primary">{slide.heading[1]}</span>
            </h1>
            <p className="font-body text-xs sm:text-sm md:text-base text-muted-foreground max-w-md mb-6 md:mb-10 leading-relaxed">
              {slide.description}
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-4 px-10 py-4 bg-primary text-primary-foreground font-body text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-all duration-500 luxury-ease gold-glow"
            >
              Explore the Collection
              <span className="w-8 h-px bg-primary-foreground" />
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="flex gap-3 mt-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-px transition-all duration-500 ${
                i === current ? 'w-12 bg-primary' : 'w-6 bg-muted-foreground/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-body tracking-[0.3em] uppercase text-muted-foreground">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
