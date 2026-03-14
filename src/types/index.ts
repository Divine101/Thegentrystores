export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: 'senator' | 'suit' | 'agbada' | 'accessories';
  sizes: string[];
  images: string[];
  fabric?: string;
  collection?: string;
  featured?: boolean;
  stock: number;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'processing' | 'delivered';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
}
