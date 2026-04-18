import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Product } from '@/types';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_images (
            image_url,
            position
          ),
          product_sizes (
            size,
            stock
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return (data || []).map((p: any) => {
        // Sort images by position before taking URLs
        const images = p.product_images && p.product_images.length > 0
          ? [...p.product_images]
              .sort((a, b) => a.position - b.position)
              .map(img => img.image_url)
          : []; // If no images, leave empty array or we can supply a placeholder

        // Extract sizes
        const sizes = p.product_sizes && p.product_sizes.length > 0
          ? p.product_sizes.map((s: any) => s.size)
          : [];

        // Cast to Product to match frontend boundaries
        return {
          id: p.id,
          name: p.name,
          slug: p.slug,
          description: p.description || '',
          price: p.price,
          category: p.category as 'senator' | 'suit' | 'agbada' | 'accessories',
          sizes: sizes,
          images: images,
          fabric: p.fabric || undefined,
          collection: p.collection || undefined,
          featured: p.featured || false,
          stock: p.stock,
        } as Product;
      });
    },
  });
};

export const useProductBySlug = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['products', slug],
    queryFn: async () => {
      if (!slug) return null;

      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_images (
            image_url,
            position
          ),
          product_sizes (
            size,
            stock
          )
        `)
        .eq('slug', slug)
        .single();

      if (error) {
        throw error;
      }

      if (!data) return null;

      const p: any = data;
      const images = p.product_images && p.product_images.length > 0
        ? [...p.product_images]
            .sort((a, b) => a.position - b.position)
            .map(img => img.image_url)
        : [];

      const sizes = p.product_sizes && p.product_sizes.length > 0
        ? p.product_sizes.map((s: any) => s.size)
        : [];

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description || '',
        price: p.price,
        category: p.category as 'senator' | 'suit' | 'agbada' | 'accessories',
        sizes: sizes,
        images: images,
        fabric: p.fabric || undefined,
        collection: p.collection || undefined,
        featured: p.featured || false,
        stock: p.stock,
      } as Product;
    },
    enabled: !!slug,
  });
};
