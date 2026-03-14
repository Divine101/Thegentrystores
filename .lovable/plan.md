

# The Gentry — Premium Fashion E-Commerce Platform

## Design Foundation
- **Rich Obsidian (#050505)** canvas with **Muted Gold (#C5A059)** accents and **Oxblood (#4A0E0E)** structural highlights
- Typography: Cormorant Garamond (display) + General Sans (body/UI)
- The brand logo embedded in the header/navigation
- "Light Leak" depth system (no borders, shadow-based elevation)
- Luxury easing: `cubic-bezier(0.22, 1, 0.36, 1)` on all animations
- Staggered entrance animations (slide up 12px, 0.4s duration)

## Pages & Features

### 1. Homepage — "The Digital Atelier"
- **Hero Section**: Full-viewport cinematic hero with luxury placeholder imagery, headline "The Measure of a Man", CTA "Explore the Collection"
- **Featured Collection**: Lookbook-style asymmetric grid (8-col + 2×4-col pattern)
- **New Arrivals**: Horizontal scroll with image zoom on hover (1.05 scale, 1.5s)
- **Signature Pieces**: Highlighted hero-style product showcase
- **Brand Story**: Editorial section about The Gentry's heritage, EST. MMXXVI
- **Instagram Gallery**: Grid of lifestyle imagery placeholders
- **WhatsApp Concierge Button**: Gold-bordered button with hover glow effect

### 2. Product Listing Page
- Large product imagery in the Lookbook grid layout
- Filter sidebar: Category, Size, Price range, Collection
- Sort options (Price, Newest, Featured)
- Smooth page transitions

### 3. Product Detail Page
- Multi-image gallery with zoom functionality
- Size selector with elegant radio-style buttons
- Fabric/craftsmanship notes (no star ratings)
- Price display in Naira (₦)
- **"Secure the Piece"** button → checkout flow
- **"Consult the Atelier"** button → WhatsApp with auto-generated order message
- Related pieces section

### 4. Checkout Flow
- Step 1: Customer details (name, email, phone, shipping address)
- Step 2: Order summary
- Step 3: Paystack payment integration via edge function
- Step 4: Order confirmation page with elegant receipt

### 5. Admin Panel (invite-only access)
- **Login**: Email/password via Supabase Auth, restricted to pre-approved emails
- **Dashboard**: Overview of orders, revenue, recent activity
- **Product Management**: CRUD for products with image uploads, categories, sizes, inventory
- **Order Management**: View orders, update statuses (Pending → Paid → Processing → Delivered)
- **Settings**: WhatsApp number configuration, Paystack keys

## Database (Supabase)
- **profiles** table (linked to auth.users)
- **user_roles** table (admin role via security definer function)
- **products** table (name, slug, description, price, category, stock)
- **product_images** table (product_id, image_url, position)
- **product_sizes** table (product_id, size, stock)
- **orders** table (user info, total, status, payment_status)
- **order_items** table (order_id, product_id, quantity, price, size)
- **settings** table (key-value for WhatsApp number, Paystack keys)
- Full RLS policies for security

## Backend (Edge Functions)
- **process-payment**: Paystack payment initialization and verification
- **manage-orders**: Order status updates with validation

## Mobile-First Design
- Single-column layouts on mobile with full-width imagery
- Touch-optimized size selectors and buttons
- Bottom-anchored WhatsApp CTA on product pages
- Responsive navigation with elegant mobile menu

