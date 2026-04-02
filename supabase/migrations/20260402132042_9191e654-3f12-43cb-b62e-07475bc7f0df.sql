
-- Products: drop admin-only, add authenticated management
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
CREATE POLICY "Authenticated users can manage products" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Product images: drop admin-only, add authenticated management
DROP POLICY IF EXISTS "Admins can manage product images" ON public.product_images;
CREATE POLICY "Authenticated users can manage product images" ON public.product_images FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Product sizes: drop admin-only, add authenticated management
DROP POLICY IF EXISTS "Admins can manage product sizes" ON public.product_sizes;
CREATE POLICY "Authenticated users can manage product sizes" ON public.product_sizes FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Settings: drop admin-only, add authenticated management
DROP POLICY IF EXISTS "Admins can manage settings" ON public.settings;
CREATE POLICY "Authenticated users can manage settings" ON public.settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Storage: drop existing policies and allow authenticated users
DROP POLICY IF EXISTS "Admin users can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Admin users can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Admin users can delete product images" ON storage.objects;

CREATE POLICY "Authenticated users can upload product images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-images');
CREATE POLICY "Authenticated users can update product images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'product-images');
CREATE POLICY "Authenticated users can delete product images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'product-images');
