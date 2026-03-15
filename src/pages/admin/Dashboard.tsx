import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Package, ShoppingCart, Settings, LayoutDashboard, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import logo from '@/assets/logo.png';
import AdminProducts from './Products';
import AdminOrders from './Orders';
import AdminSettings from './Settings';

const sidebarLinks = [
  { to: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<string>('');

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin');
        return;
      }
      setUser(session.user.email || '');
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Signed out');
    navigate('/admin');
  };

  const isOverview = location.pathname === '/admin/dashboard';

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/50 bg-card/50 flex flex-col">
        <div className="p-6 border-b border-border/50">
          <img src={logo} alt="The Gentry" className="h-10" />
          <p className="text-[10px] font-body text-muted-foreground mt-2 tracking-wider uppercase">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map(link => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-4 py-3 text-xs font-body tracking-wider transition-colors rounded ${
                  isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon size={16} />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border/50">
          <p className="text-[10px] font-body text-muted-foreground mb-3 truncate">{user}</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-body text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">
        {isOverview ? (
          <div>
            <h1 className="font-display text-3xl text-foreground mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { label: 'Total Products', value: '6', sublabel: 'Active pieces' },
                { label: 'Orders', value: '0', sublabel: 'Pending orders' },
                { label: 'Revenue', value: '₦0', sublabel: 'This month' },
              ].map(stat => (
                <div key={stat.label} className="bg-card border border-border/50 p-6">
                  <p className="text-xs font-body text-muted-foreground tracking-wider uppercase">{stat.label}</p>
                  <p className="font-display text-4xl text-foreground mt-2">{stat.value}</p>
                  <p className="text-xs font-body text-muted-foreground mt-1">{stat.sublabel}</p>
                </div>
              ))}
            </div>
            <p className="text-sm font-body text-muted-foreground">
              Connect to the database to see live data. Manage products, orders, and settings from the sidebar.
            </p>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
