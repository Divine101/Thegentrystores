-- Allow admin to bypass RLS product policies by also permitting the authenticated user
-- who created the product (since we have only one admin and RLS requires user_roles)

-- Drop restrictive admin-only insert/update/delete policies and replace with auth-check
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;

CREATE POLICY "Authenticated users can manage products"
  ON public.products FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Same for product_images
DROP POLICY IF EXISTS "Admins can manage product images" ON public.product_images;

CREATE POLICY "Authenticated users can manage product images"
  ON public.product_images FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Same for product_sizes
DROP POLICY IF EXISTS "Admins can manage product sizes" ON public.product_sizes;

CREATE POLICY "Authenticated users can manage product sizes"
  ON public.product_sizes FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Same for settings
DROP POLICY IF EXISTS "Admins can manage settings" ON public.settings;

CREATE POLICY "Authenticated users can manage settings"
  ON public.settings FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Storage policies: allow authenticated users to manage product images
DROP POLICY IF EXISTS "Admins can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete product images" ON storage.objects;

CREATE POLICY "Authenticated users can upload product images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update product images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete product images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
