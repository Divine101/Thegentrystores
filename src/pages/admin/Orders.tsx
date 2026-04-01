import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

type Order = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string | null;
  state: string | null;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
};

const STATUS_OPTIONS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

const statusColor = (status: string) => {
  const map: Record<string, string> = {
    pending: 'text-yellow-500 bg-yellow-500/10',
    confirmed: 'text-blue-400 bg-blue-400/10',
    processing: 'text-purple-400 bg-purple-400/10',
    shipped: 'text-cyan-400 bg-cyan-400/10',
    delivered: 'text-green-400 bg-green-400/10',
    cancelled: 'text-red-400 bg-red-400/10',
    paid: 'text-green-400 bg-green-400/10',
  };
  return map[status] || 'text-muted-foreground bg-muted/30';
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load orders');
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    setUpdating(orderId);
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) {
      toast.error('Failed to update status');
    } else {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
      toast.success('Order status updated');
    }
    setUpdating(null);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-foreground">Orders</h1>
        <span className="text-xs font-body text-muted-foreground tracking-wider uppercase">
          {orders.length} total
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin text-muted-foreground" />
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-card border border-border/50 p-16 text-center">
          <p className="font-display text-xl text-muted-foreground mb-2">No orders yet</p>
          <p className="text-sm font-body text-muted-foreground">
            Orders will appear here once customers start purchasing.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {orders.map(order => (
            <div key={order.id} className="bg-card border border-border/50 overflow-hidden">
              {/* Order Row */}
              <div
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/10 transition-colors"
                onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="font-body text-sm text-foreground font-medium">{order.customer_name}</p>
                    <span className={`text-[10px] font-body tracking-wider uppercase px-2 py-0.5 rounded-full ${statusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className={`text-[10px] font-body tracking-wider uppercase px-2 py-0.5 rounded-full ${statusColor(order.payment_status)}`}>
                      {order.payment_status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-body mt-0.5">{order.customer_email} · {formatDate(order.created_at)}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-body text-primary font-medium">₦{order.total_amount.toLocaleString()}</p>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-muted-foreground transition-transform shrink-0 ${expandedId === order.id ? 'rotate-180' : ''}`}
                />
              </div>

              {/* Expanded Details */}
              {expandedId === order.id && (
                <div className="border-t border-border/40 p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground">Customer</h3>
                    <div className="space-y-1 text-sm font-body text-foreground/80">
                      <p>{order.customer_name}</p>
                      <p>{order.customer_email}</p>
                      <p>{order.customer_phone}</p>
                    </div>
                    <h3 className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground pt-2">Delivery Address</h3>
                    <p className="text-sm font-body text-foreground/80">
                      {order.shipping_address}{order.city ? `, ${order.city}` : ''}{order.state ? `, ${order.state}` : ''}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground">Update Status</h3>
                    <div className="flex flex-wrap gap-2">
                      {STATUS_OPTIONS.map(s => (
                        <button
                          key={s}
                          onClick={() => updateStatus(order.id, s)}
                          disabled={updating === order.id || order.status === s}
                          className={`px-3 py-1.5 text-[10px] font-body tracking-wider uppercase border transition-colors disabled:opacity-50 ${
                            order.status === s
                              ? 'border-primary text-primary bg-primary/10'
                              : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                          }`}
                        >
                          {updating === order.id ? <Loader2 size={10} className="animate-spin inline" /> : s}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] font-body text-muted-foreground/60">
                      Order ID: {order.id.slice(0, 8)}...
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
