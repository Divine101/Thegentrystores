import { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, X, Upload, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { formatPrice } from '@/lib/mock-data';
import { toast } from 'sonner';

const CATEGORIES = ['senator', 'agbada', 'suit', 'accessories'];
const COLLECTIONS = ['Heritage Collection', 'Royal Line', 'Power Collection'];
const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

type DBProduct = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  category: string;
  stock: number;
  fabric: string | null;
  collection: string | null;
  featured: boolean | null;
  product_images?: { image_url: string; position: number }[];
};

const emptyForm = {
  name: '',
  description: '',
  price: '',
  category: 'senator',
  collection: 'Heritage Collection',
  fabric: '',
  stock: '',
  featured: false,
  sizes: [] as string[],
  imageUrl: '',
};

const AdminProducts = () => {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*, product_images(image_url, position)')
      .order('created_at', { ascending: false });
    if (error) {
      toast.error('Failed to load products');
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const slugify = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('product-images').upload(path, file, { upsert: true });
    if (error) {
      toast.error('Image upload failed: ' + error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from('product-images').getPublicUrl(path);
    setForm(f => ({ ...f, imageUrl: data.publicUrl }));
    setUploading(false);
    toast.success('Image uploaded');
  };

  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (p: DBProduct) => {
    setForm({
      name: p.name,
      description: p.description || '',
      price: String(p.price),
      category: p.category,
      collection: p.collection || 'Heritage Collection',
      fabric: p.fabric || '',
      stock: String(p.stock),
      featured: p.featured || false,
      sizes: [],
      imageUrl: p.product_images?.[0]?.image_url || '',
    });
    setEditingId(p.id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const toggleSize = (size: string) => {
    setForm(f => ({
      ...f,
      sizes: f.sizes.includes(size) ? f.sizes.filter(s => s !== size) : [...f.sizes, size],
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock) {
      toast.error('Name, price and stock are required');
      return;
    }
    setSaving(true);

    const payload = {
      name: form.name,
      slug: slugify(form.name),
      description: form.description || null,
      price: parseFloat(form.price),
      category: form.category,
      collection: form.collection || null,
      fabric: form.fabric || null,
      stock: parseInt(form.stock),
      featured: form.featured,
    };

    if (editingId) {
      // Update
      const { error } = await supabase.from('products').update(payload).eq('id', editingId);
      if (error) {
        toast.error('Update failed: ' + error.message);
        setSaving(false);
        return;
      }
      // Update image if changed
      if (form.imageUrl) {
        await supabase.from('product_images').delete().eq('product_id', editingId);
        await supabase.from('product_images').insert({ product_id: editingId, image_url: form.imageUrl, position: 0 });
      }
      toast.success('Product updated');
    } else {
      // Insert
      const { data, error } = await supabase.from('products').insert(payload).select().single();
      if (error) {
        toast.error('Add failed: ' + error.message);
        setSaving(false);
        return;
      }
      // Insert image
      if (form.imageUrl && data) {
        await supabase.from('product_images').insert({ product_id: data.id, image_url: form.imageUrl, position: 0 });
      }
      // Insert sizes
      if (form.sizes.length > 0 && data) {
        await supabase.from('product_sizes').insert(
          form.sizes.map(size => ({ product_id: data.id, size, stock: parseInt(form.stock) }))
        );
      }
      toast.success('Product added');
    }

    setSaving(false);
    closeForm();
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    setDeleting(id);
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      toast.error('Delete failed: ' + error.message);
    } else {
      toast.success('Product deleted');
      setProducts(p => p.filter(x => x.id !== id));
    }
    setDeleting(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-foreground">Products</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-body text-xs tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors"
        >
          <Plus size={14} />
          Add Product
        </button>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-2xl bg-card border border-border/50 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <h2 className="font-display text-xl text-foreground">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={closeForm} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              {/* Image */}
              <div>
                <label className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                  Product Image
                </label>
                <div className="flex gap-3 items-start">
                  {form.imageUrl && (
                    <img src={form.imageUrl} className="w-20 h-24 object-cover border border-border/50" alt="preview" />
                  )}
                  <div className="flex-1">
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                    />
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      disabled={uploading}
                      className="flex items-center gap-2 px-4 py-2 border border-border text-xs font-body text-muted-foreground hover:text-foreground hover:border-primary transition-colors disabled:opacity-50"
                    >
                      {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                      {uploading ? 'Uploading...' : 'Upload Image'}
                    </button>
                    <p className="text-[10px] text-muted-foreground mt-1">Or paste a URL below</p>
                    <input
                      type="url"
                      value={form.imageUrl}
                      onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
                      placeholder="https://..."
                      className="mt-2 w-full bg-transparent border border-border px-3 py-2 text-foreground font-body text-xs focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                  Product Name *
                </label>
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="The Sovereign Senator"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="A masterfully crafted..."
                />
              </div>

              {/* Price & Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                    Price (₦) *
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                    required
                    min="0"
                    className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="185000"
                  />
                </div>
                <div>
                  <label className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                    Stock *
                  </label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
                    required
                    min="0"
                    className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="10"
                  />
                </div>
              </div>

              {/* Category & Collection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full bg-card border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                    Collection
                  </label>
                  <select
                    value={form.collection}
                    onChange={e => setForm(f => ({ ...f, collection: e.target.value }))}
                    className="w-full bg-card border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                  >
                    {COLLECTIONS.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Fabric */}
              <div>
                <label className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                  Fabric / Material
                </label>
                <input
                  value={form.fabric}
                  onChange={e => setForm(f => ({ ...f, fabric: e.target.value }))}
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="Italian Silk Blend with Gold Thread Embroidery"
                />
              </div>

              {/* Sizes (only for new products) */}
              {!editingId && (
                <div>
                  <label className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                    Available Sizes
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {SIZES.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleSize(s)}
                        className={`px-4 py-2 text-xs font-body border transition-colors ${
                          form.sizes.includes(s)
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Featured */}
              <div className="flex items-center gap-3">
                <input
                  id="featured"
                  type="checkbox"
                  checked={form.featured}
                  onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                  className="w-4 h-4 accent-primary"
                />
                <label htmlFor="featured" className="text-sm font-body text-muted-foreground cursor-pointer">
                  Feature this product on the homepage
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="flex-1 py-3 bg-primary text-primary-foreground font-body text-xs tracking-[0.15em] uppercase hover:bg-primary/90 transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-6 py-3 border border-border text-muted-foreground font-body text-xs tracking-[0.15em] uppercase hover:text-foreground hover:border-foreground transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-card border border-border/50 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={24} className="animate-spin text-muted-foreground" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground font-body text-sm">
            No products yet. Click "Add Product" to get started.
          </div>
        ) : (
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
                      {product.product_images?.[0]?.image_url ? (
                        <img
                          src={product.product_images[0].image_url}
                          alt={product.name}
                          className="w-12 h-16 object-cover"
                        />
                      ) : (
                        <div className="w-12 h-16 bg-muted/30 border border-border/30 flex items-center justify-center">
                          <span className="text-[10px] text-muted-foreground">No img</span>
                        </div>
                      )}
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
                      <button
                        onClick={() => openEdit(product)}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        title="Edit"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={deleting === product.id}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        {deleting === product.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
