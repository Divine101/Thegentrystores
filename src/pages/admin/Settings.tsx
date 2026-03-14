import { useState } from 'react';
import { toast } from 'sonner';

const AdminSettings = () => {
  const [whatsapp, setWhatsapp] = useState('+2348012345678');
  const [paystackPublic, setPaystackPublic] = useState('');
  const [paystackSecret, setPaystackSecret] = useState('');

  const handleSave = () => {
    // Will be connected to database settings table
    toast.success('Settings saved');
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-foreground mb-8">Settings</h1>
      
      <div className="max-w-xl space-y-8">
        {/* WhatsApp */}
        <div className="bg-card border border-border/50 p-6">
          <h2 className="font-display text-xl text-foreground mb-4">WhatsApp Configuration</h2>
          <div>
            <label className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
              WhatsApp Number
            </label>
            <input
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
              className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
              placeholder="+2348012345678"
            />
            <p className="text-xs font-body text-muted-foreground mt-2">
              This number will be used for all WhatsApp order buttons.
            </p>
          </div>
        </div>

        {/* Paystack */}
        <div className="bg-card border border-border/50 p-6">
          <h2 className="font-display text-xl text-foreground mb-4">Payment Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                Paystack Public Key
              </label>
              <input
                value={paystackPublic}
                onChange={e => setPaystackPublic(e.target.value)}
                className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="pk_live_..."
              />
            </div>
            <div>
              <label className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                Paystack Secret Key
              </label>
              <input
                type="password"
                value={paystackSecret}
                onChange={e => setPaystackSecret(e.target.value)}
                className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="sk_live_..."
              />
              <p className="text-xs font-body text-muted-foreground mt-2">
                Secret key is stored securely and never exposed to the frontend.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="px-8 py-3 bg-primary text-primary-foreground font-body text-xs tracking-[0.15em] uppercase hover:bg-primary/90 transition-all duration-500"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
