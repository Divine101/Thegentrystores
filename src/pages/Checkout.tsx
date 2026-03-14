import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/mock-data';

const Checkout = () => {
  const { items, removeItem, updateQuantity, clearCart, totalAmount } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<'cart' | 'details' | 'confirmation'>('cart');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProceed = () => {
    if (items.length === 0) {
      toast.error('Your selection is empty');
      return;
    }
    setStep('details');
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.address) {
      toast.error('Please fill in all required fields');
      return;
    }
    // In production, this would trigger Paystack payment
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/order-confirmation');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12 md:py-16"
          >
            <h1 className="font-display text-4xl md:text-5xl text-foreground">
              {step === 'cart' ? 'Your Selection' : 'Complete Your Order'}
            </h1>
          </motion.div>

          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-8 mb-12">
            {['Selection', 'Details', 'Payment'].map((label, i) => (
              <div key={label} className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-body border ${
                  i <= (step === 'cart' ? 0 : 1) ? 'border-primary text-primary' : 'border-border text-muted-foreground'
                }`}>
                  {i + 1}
                </span>
                <span className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground hidden md:block">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {step === 'cart' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              {items.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-display text-2xl text-muted-foreground mb-6">Your selection is empty</p>
                  <Link
                    to="/shop"
                    className="inline-flex px-8 py-3 border border-primary text-primary font-body text-xs tracking-[0.15em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-500"
                  >
                    Explore Collection
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-8">
                    {items.map(item => (
                      <div key={`${item.product.id}-${item.size}`} className="flex gap-4 md:gap-6 p-4 bg-card border border-border/50">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-28 md:w-24 md:h-32 object-cover"
                        />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-display text-lg text-foreground">{item.product.name}</h3>
                            <p className="text-xs font-body text-muted-foreground mt-1">Size: {item.size}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                                className="w-8 h-8 border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="font-body text-sm text-foreground w-6 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                                className="w-8 h-8 border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-body text-sm text-primary">{formatPrice(item.product.price * item.quantity)}</span>
                              <button
                                onClick={() => removeItem(item.product.id, item.size)}
                                className="text-muted-foreground hover:text-destructive transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="border-t border-border/50 pt-6 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="font-body text-sm text-muted-foreground uppercase tracking-wider">Total</span>
                      <span className="font-display text-3xl text-primary">{formatPrice(totalAmount)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleProceed}
                    className="w-full py-4 bg-primary text-primary-foreground font-body text-xs tracking-[0.15em] uppercase hover:bg-primary/90 transition-all duration-500 gold-glow"
                  >
                    Proceed to Checkout
                  </button>
                </>
              )}
            </motion.div>
          )}

          {step === 'details' && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmitOrder}
              className="max-w-xl mx-auto space-y-6"
            >
              <div>
                <label className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground mb-2 block">Full Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground mb-2 block">Email *</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground mb-2 block">Phone *</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="+234..."
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground mb-2 block">Delivery Address *</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Full delivery address"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground mb-2 block">City</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="Lagos"
                  />
                </div>
                <div>
                  <label className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground mb-2 block">State</label>
                  <input
                    name="state"
                    value={form.state}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="Lagos State"
                  />
                </div>
              </div>

              {/* Order summary */}
              <div className="border-t border-border/50 pt-6 mt-8">
                <h3 className="font-display text-xl text-foreground mb-4">Order Summary</h3>
                {items.map(item => (
                  <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-sm font-body py-2">
                    <span className="text-muted-foreground">{item.product.name} × {item.quantity} ({item.size})</span>
                    <span className="text-foreground">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-4 border-t border-border/30 mt-4">
                  <span className="font-body text-sm uppercase tracking-wider text-muted-foreground">Total</span>
                  <span className="font-display text-2xl text-primary">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="flex-1 py-4 border border-border text-muted-foreground font-body text-xs tracking-[0.15em] uppercase hover:border-foreground hover:text-foreground transition-all duration-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-primary text-primary-foreground font-body text-xs tracking-[0.15em] uppercase hover:bg-primary/90 transition-all duration-500 gold-glow"
                >
                  Pay {formatPrice(totalAmount)}
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
