import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { products, formatPrice } from '@/lib/mock-data';

const AdminProducts = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-foreground">Products</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-body text-xs tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors"
        >
          <Plus size={14} />
          Add Product
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 bg-card border border-border/50">
          <h2 className="font-display text-xl text-foreground mb-4">Add New Product</h2>
          <p className="text-sm font-body text-muted-foreground">
            Product form will be connected to the database once the backend is configured.
          </p>
        </div>
      )}

      <div className="bg-card border border-border/50 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left p-4 text-xs font-body tracking-wider uppercase text-muted-foreground">Product</th>
              <th className="text-left p-4 text-xs font-body tracking-wider uppercase text-muted-foreground">Category</th>
              <th className="text-left p-4 text-xs font-body tracking-wider uppercase text-muted-foreground">Price</th>
              <th className="text-left p-4 text-xs font-body tracking-wider uppercase text-muted-foreground">Stock</th>
              <th className="text-right p-4 text-xs font-body tracking-wider uppercase text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={product.images[0]} alt={product.name} className="w-12 h-16 object-cover" />
                    <div>
                      <p className="font-body text-sm text-foreground">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.collection}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-xs font-body text-muted-foreground uppercase tracking-wider">{product.category}</td>
                <td className="p-4 text-sm font-body text-primary">{formatPrice(product.price)}</td>
                <td className="p-4 text-sm font-body text-foreground">{product.stock}</td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                      <Edit size={14} />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
