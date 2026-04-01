import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const AdminSettings = () => {
  const [whatsapp, setWhatsapp] = useState('');
  const [storeName, setStoreName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('settings').select('key, value');
      if (error) {
        toast.error('Failed to load settings');
      } else {
        data?.forEach(row => {
          if (row.key === 'whatsapp_number') setWhatsapp(row.value);
          if (row.key === 'store_name') setStoreName(row.value);
        });
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const upsertSetting = async (key: string, value: string) => {
    const { error } = await supabase
      .from('settings')
      .upsert({ key, value }, { onConflict: 'key' });
    if (error) throw error;
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all([
        upsertSetting('whatsapp_number', whatsapp),
        upsertSetting('store_name', storeName),
      ]);
      toast.success('Settings saved');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-foreground mb-8">Settings</h1>

      <div className="max-w-xl space-y-8">
        {/* Store Info */}
        <div className="bg-card border border-border/50 p-6">
          <h2 className="font-display text-xl text-foreground mb-4">Store Information</h2>
          <div>
            <label className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
              Store Name
            </label>
            <input
              value={storeName}
              onChange={e => setStoreName(e.target.value)}
              className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
              placeholder="The Gentry Clothing"
            />
          </div>
        </div>

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
              Include country code. This number receives all WhatsApp order messages.
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-body text-xs tracking-[0.15em] uppercase hover:bg-primary/90 transition-all duration-500 disabled:opacity-50"
        >
          {saving && <Loader2 size={14} className="animate-spin" />}
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
