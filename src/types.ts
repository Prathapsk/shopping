export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Men' | 'Women' | 'Kids';
  image: string;
  description: string;
  trending?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'm1',
    name: 'Classic Navy Blazer',
    price: 129.99,
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1594932224828-b4b057b7d6ee?auto=format&fit=crop&q=80&w=800',
    description: 'A timeless navy blazer perfect for any formal or semi-formal occasion.',
    trending: true
  },
  {
    id: 'm2',
    name: 'Slim Fit White Shirt',
    price: 49.99,
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    description: 'Crisp white slim fit shirt made from premium cotton.',
    trending: false
  },
  {
    id: 'w1',
    name: 'Floral Summer Dress',
    price: 79.99,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800',
    description: 'Lightweight and breezy floral dress for sunny days.',
    trending: true
  },
  {
    id: 'w2',
    name: 'Elegant Evening Gown',
    price: 199.99,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800',
    description: 'Stunning floor-length gown for special evenings.',
    trending: true
  },
  {
    id: 'k1',
    name: 'Denim Overalls',
    price: 34.99,
    category: 'Kids',
    image: 'https://images.unsplash.com/photo-1519233940173-0570f0747683?auto=format&fit=crop&q=80&w=800',
    description: 'Durable and cute denim overalls for active kids.',
    trending: false
  },
  {
    id: 'k2',
    name: 'Cotton T-Shirt Set',
    price: 24.99,
    category: 'Kids',
    image: 'https://images.unsplash.com/photo-1519457431-7571f018270b?auto=format&fit=crop&q=80&w=800',
    description: 'Comfortable cotton t-shirt set in vibrant colors.',
    trending: true
  },
  {
    id: 'm3',
    name: 'Leather Jacket',
    price: 249.99,
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=800',
    description: 'Premium leather jacket with a modern fit.',
    trending: true
  },
  {
    id: 'w3',
    name: 'Silk Scarf',
    price: 29.99,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
    description: 'Soft silk scarf with artistic patterns.',
    trending: false
  }
];
