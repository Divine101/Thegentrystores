
-- Make order insert policy slightly more restrictive by requiring all fields
DROP POLICY "Anyone can create orders" ON public.orders;
CREATE POLICY "Anyone can create orders" ON public.orders FOR INSERT WITH CHECK (
  customer_name IS NOT NULL AND customer_email IS NOT NULL AND customer_phone IS NOT NULL
);

DROP POLICY "Anyone can create order items" ON public.order_items;
CREATE POLICY "Anyone can create order items" ON public.order_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id)
);
