import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const OrderConfirmation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center py-24"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <CheckCircle size={64} className="text-primary mx-auto mb-8" />
            </motion.div>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Order Confirmed
            </h1>
            <p className="font-body text-sm text-muted-foreground mb-2">
              Thank you for choosing The Gentry.
            </p>
            <p className="font-body text-sm text-muted-foreground mb-12">
              You will receive a confirmation email with your order details shortly.
            </p>
            <div className="w-16 h-px bg-primary mx-auto mb-12" />
            <Link
              to="/shop"
              className="inline-flex px-10 py-4 bg-primary text-primary-foreground font-body text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-all duration-500 gold-glow"
            >
              Continue Exploring
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
