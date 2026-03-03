import React, { useState, useEffect } from 'react';
import { ShoppingCart, Sun, Moon, Menu, X, Search, User, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem, PRODUCTS } from './types';

// --- Components ---

const ThemeToggle = ({ theme, toggleTheme }: { theme: 'light' | 'dark', toggleTheme: () => void }) => (
  <button
    onClick={toggleTheme}
    className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
    id="theme-toggle"
  >
    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
  </button>
);

const Navbar = ({ 
  theme, 
  toggleTheme, 
  cartCount, 
  onNavigate, 
  currentPath 
}: { 
  theme: 'light' | 'dark', 
  toggleTheme: () => void, 
  cartCount: number,
  onNavigate: (path: string) => void,
  currentPath: string
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: 'home' },
    { name: 'Men', path: 'men' },
    { name: 'Women', path: 'women' },
    { name: 'Kids', path: 'kids' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isMenuOpen ? 'h-screen' : 'h-20'} ${theme === 'dark' ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-lg border-b ${theme === 'dark' ? 'border-white/10' : 'border-black/5'}`}>
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button onClick={() => onNavigate('home')} className="text-2xl font-serif font-bold tracking-tighter cursor-pointer">
            TrendWear
          </button>
          
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => onNavigate(link.path)}
                className={`text-sm font-medium hover:text-emerald-500 transition-colors cursor-pointer ${currentPath === link.path ? 'text-emerald-500' : ''}`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-black/5 dark:bg-white/5 rounded-full px-4 py-1.5 border border-transparent focus-within:border-emerald-500 transition-all">
            <Search size={16} className="opacity-50" />
            <input 
              type="text" 
              placeholder="Search fashion..." 
              className="bg-transparent border-none outline-none text-sm ml-2 w-40"
            />
          </div>

          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          
          <button onClick={() => onNavigate('cart')} className="relative p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors cursor-pointer">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          <button onClick={() => onNavigate('admin')} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors cursor-pointer">
            <User size={20} />
          </button>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden px-4 py-8 flex flex-col gap-6 items-center"
          >
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  onNavigate(link.path);
                  setIsMenuOpen(false);
                }}
                className="text-2xl font-serif font-medium"
              >
                {link.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ProductCard = ({ product, onAddToCart, onViewDetails }: { product: Product, onAddToCart: (p: Product) => void, onViewDetails: (p: Product) => void, key?: string }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="group relative flex flex-col gap-3"
  >
    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5">
      <img 
        src={product.image} 
        alt={product.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        <button 
          onClick={() => onViewDetails(product)}
          className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer"
        >
          View Details
        </button>
      </div>
      <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-black hover:text-red-500 transition-colors">
        <Heart size={18} />
      </button>
    </div>
    <div className="flex flex-col">
      <h3 className="text-sm font-medium opacity-80">{product.category}</h3>
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-serif font-bold">{product.name}</h2>
        <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">${product.price}</span>
      </div>
      <button 
        onClick={() => onAddToCart(product)}
        className="mt-2 w-full py-2 bg-black dark:bg-white dark:text-black text-white rounded-xl text-sm font-bold hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-colors cursor-pointer"
      >
        Add to Cart
      </button>
    </div>
  </motion.div>
);

// --- Pages ---

const HomePage = ({ onNavigate, onAddToCart, onViewDetails }: { onNavigate: (p: string) => void, onAddToCart: (p: Product) => void, onViewDetails: (p: Product) => void }) => {
  const trendingProducts = PRODUCTS.filter(p => p.trending);
  
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero" 
            className="w-full h-full object-cover opacity-60 dark:opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-black" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-serif font-bold mb-6 tracking-tighter"
          >
            Redefine Your <br /> <span className="text-emerald-500 italic">Style</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl opacity-80 mb-10 max-w-2xl mx-auto"
          >
            Discover the latest trends in fashion with TrendWear. Premium quality, sustainable materials, and timeless designs.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button 
              onClick={() => onNavigate('men')}
              className="px-8 py-4 bg-emerald-500 text-white rounded-full font-bold hover:bg-emerald-600 transition-all cursor-pointer"
            >
              Shop Men
            </button>
            <button 
              onClick={() => onNavigate('women')}
              className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-100 transition-all cursor-pointer"
            >
              Shop Women
            </button>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <h2 className="text-3xl font-serif font-bold mb-10">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Men', image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&q=80&w=800', path: 'men' },
            { name: 'Women', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800', path: 'women' },
            { name: 'Kids', image: 'https://images.unsplash.com/photo-1514090458221-65bb69af63e6?auto=format&fit=crop&q=80&w=800', path: 'kids' },
          ].map((cat) => (
            <button 
              key={cat.name}
              onClick={() => onNavigate(cat.path)}
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all flex items-center justify-center">
                <h3 className="text-4xl font-serif font-bold text-white tracking-widest uppercase">{cat.name}</h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-serif font-bold">Trending Now</h2>
            <p className="opacity-60">Handpicked styles for the season</p>
          </div>
          <button className="text-emerald-500 font-bold hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

const CategoryPage = ({ category, onAddToCart, onViewDetails }: { category: string, onAddToCart: (p: Product) => void, onViewDetails: (p: Product) => void }) => {
  const filteredProducts = PRODUCTS.filter(p => p.category.toLowerCase() === category.toLowerCase());
  
  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
      <div className="mb-12">
        <h1 className="text-5xl font-serif font-bold mb-4 capitalize">{category} Collection</h1>
        <p className="text-lg opacity-60">Explore our curated selection of {category} fashion.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  );
};

const ProductDetailsPage = ({ product, onAddToCart, onBuyNow }: { product: Product, onAddToCart: (p: Product, size: string, qty: number) => void, onBuyNow: (p: Product, size: string, qty: number) => void }) => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl overflow-hidden bg-black/5 dark:bg-white/5"
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-8"
        >
          <div>
            <span className="text-emerald-500 font-bold uppercase tracking-widest text-sm">{product.category}</span>
            <h1 className="text-5xl font-serif font-bold mt-2">{product.name}</h1>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-4">${product.price}</p>
          </div>

          <p className="text-lg opacity-70 leading-relaxed">
            {product.description}
          </p>

          <div>
            <h3 className="font-bold mb-4">Select Size</h3>
            <div className="flex gap-4">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold transition-all cursor-pointer ${selectedSize === size ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-black/10 dark:border-white/10 hover:border-emerald-500'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quantity</h3>
            <div className="flex items-center gap-4 bg-black/5 dark:bg-white/5 w-fit rounded-full p-1">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="w-10 text-center font-bold">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button 
              onClick={() => onAddToCart(product, selectedSize, quantity)}
              className="flex-1 py-4 bg-black dark:bg-white dark:text-black text-white rounded-2xl font-bold text-lg hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-all cursor-pointer"
            >
              Add to Cart
            </button>
            <button 
              onClick={() => onBuyNow(product, selectedSize, quantity)}
              className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all cursor-pointer"
            >
              Buy Now
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const CartPage = ({ cart, onUpdateQty, onRemove, onCheckout }: { cart: CartItem[], onUpdateQty: (id: string, size: string, delta: number) => void, onRemove: (id: string, size: string) => void, onCheckout: () => void }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-40 pb-20 text-center">
        <h1 className="text-4xl font-serif font-bold mb-6">Your Cart is Empty</h1>
        <p className="opacity-60 mb-10">Looks like you haven't added anything yet.</p>
        <button onClick={() => window.location.reload()} className="px-8 py-4 bg-emerald-500 text-white rounded-full font-bold">Start Shopping</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
      <h1 className="text-4xl font-serif font-bold mb-12">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {cart.map((item) => (
            <motion.div 
              layout
              key={`${item.id}-${item.selectedSize}`}
              className="flex gap-6 p-4 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
            >
              <div className="w-24 h-32 rounded-2xl overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between">
                    <h3 className="text-xl font-serif font-bold">{item.name}</h3>
                    <button onClick={() => onRemove(item.id, item.selectedSize)} className="text-red-500 hover:text-red-600 transition-colors cursor-pointer">
                      <X size={20} />
                    </button>
                  </div>
                  <p className="text-sm opacity-60">Size: {item.selectedSize}</p>
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-4 bg-black/5 dark:bg-white/5 rounded-full p-1">
                    <button onClick={() => onUpdateQty(item.id, item.selectedSize, -1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer">-</button>
                    <span className="font-bold">{item.quantity}</span>
                    <button onClick={() => onUpdateQty(item.id, item.selectedSize, 1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer">+</button>
                  </div>
                  <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="p-8 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 sticky top-32">
            <h2 className="text-2xl font-serif font-bold mb-6">Order Summary</h2>
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex justify-between opacity-60">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between opacity-60">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="h-px bg-black/10 dark:bg-white/10 my-2" />
              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span className="text-emerald-500">${total.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all cursor-pointer"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = ({ cart, onOrderComplete }: { cart: CartItem[], onOrderComplete: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    payment: 'cod'
  });
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOrderComplete();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
      <h1 className="text-4xl font-serif font-bold mb-12">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="p-8 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <h2 className="text-2xl font-serif font-bold mb-6">Shipping Details</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold opacity-60">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="bg-black/5 dark:bg-white/5 border border-transparent focus:border-emerald-500 outline-none rounded-xl p-4 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold opacity-60">Mobile Number</label>
                <input 
                  required
                  type="tel" 
                  value={formData.mobile}
                  onChange={e => setFormData({...formData, mobile: e.target.value})}
                  className="bg-black/5 dark:bg-white/5 border border-transparent focus:border-emerald-500 outline-none rounded-xl p-4 transition-all"
                  placeholder="+1 234 567 890"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold opacity-60">Address</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  className="bg-black/5 dark:bg-white/5 border border-transparent focus:border-emerald-500 outline-none rounded-xl p-4 transition-all"
                  placeholder="123 Fashion St, Style City"
                />
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <h2 className="text-2xl font-serif font-bold mb-6">Payment Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['cod', 'upi', 'card'].map(method => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setFormData({...formData, payment: method})}
                  className={`p-4 rounded-xl border-2 font-bold uppercase text-sm transition-all cursor-pointer ${formData.payment === method ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500' : 'border-black/5 dark:border-white/5 hover:border-emerald-500'}`}
                >
                  {method === 'cod' ? 'Cash on Delivery' : method.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all cursor-pointer"
          >
            Place Order (${total.toFixed(2)})
          </button>
        </form>

        <div className="hidden lg:block">
          <div className="p-8 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 sticky top-32">
            <h2 className="text-2xl font-serif font-bold mb-6">Order Summary</h2>
            <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 items-center">
                  <img src={item.image} className="w-16 h-20 rounded-lg object-cover" referrerPolicy="no-referrer" />
                  <div className="flex-1">
                    <h4 className="font-bold">{item.name}</h4>
                    <p className="text-xs opacity-60">Qty: {item.quantity} | Size: {item.selectedSize}</p>
                  </div>
                  <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="h-px bg-black/10 dark:bg-white/10 my-6" />
            <div className="flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span className="text-emerald-500">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderSuccessPage = ({ onHome }: { onHome: () => void }) => (
  <div className="max-w-7xl mx-auto px-4 pt-40 pb-20 text-center">
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 text-white"
    >
      <ShoppingCart size={40} />
    </motion.div>
    <h1 className="text-5xl font-serif font-bold mb-6">Order Placed Successfully!</h1>
    <p className="text-xl opacity-60 mb-12 max-w-lg mx-auto">Thank you for shopping with TrendWear. Your order has been confirmed and will be delivered soon.</p>
    <button 
      onClick={onHome}
      className="px-12 py-4 bg-black dark:bg-white dark:text-black text-white rounded-full font-bold text-lg hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-all cursor-pointer"
    >
      Continue Shopping
    </button>
  </div>
);

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Sales', value: '$12,450', icon: <ShoppingCart className="text-emerald-500" /> },
    { label: 'Active Orders', value: '24', icon: <Menu className="text-blue-500" /> },
    { label: 'Customers', value: '1,205', icon: <User className="text-purple-500" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
      <h1 className="text-4xl font-serif font-bold mb-12">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {stats.map(stat => (
          <div key={stat.label} className="p-8 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold opacity-60 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-black shadow-lg">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
        <h2 className="text-2xl font-serif font-bold mb-6">Recent Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-black/10 dark:border-white/10">
                <th className="py-4 font-bold opacity-60">Product</th>
                <th className="py-4 font-bold opacity-60">Category</th>
                <th className="py-4 font-bold opacity-60">Price</th>
                <th className="py-4 font-bold opacity-60">Status</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.slice(0, 5).map(p => (
                <tr key={p.id} className="border-b border-black/5 dark:border-white/5 last:border-none">
                  <td className="py-4 flex items-center gap-4">
                    <img src={p.image} className="w-10 h-10 rounded-lg object-cover" referrerPolicy="no-referrer" />
                    <span className="font-medium">{p.name}</span>
                  </td>
                  <td className="py-4 opacity-60">{p.category}</td>
                  <td className="py-4 font-bold">${p.price}</td>
                  <td className="py-4">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold uppercase">In Stock</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });
  const [currentPath, setCurrentPath] = useState('home');
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const onAddToCart = (product: Product, size: string = 'M', qty: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedSize === size 
            ? { ...item, quantity: item.quantity + qty } 
            : item
        );
      }
      return [...prev, { ...product, selectedSize: size, quantity: qty }];
    });
    // Optional: show toast or navigate to cart
  };

  const onUpdateQty = (id: string, size: string, delta: number) => {
    setCart(prev => prev.map(item => 
      item.id === id && item.selectedSize === size 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) } 
        : item
    ));
  };

  const onRemove = (id: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const onViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPath('details');
    window.scrollTo(0, 0);
  };

  const onBuyNow = (product: Product, size: string, qty: number) => {
    onAddToCart(product, size, qty);
    setCurrentPath('checkout');
    window.scrollTo(0, 0);
  };

  const onNavigate = (path: string) => {
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-black">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} font-sans`}>
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        onNavigate={onNavigate}
        currentPath={currentPath}
      />

      <main>
        <AnimatePresence mode="wait">
          {currentPath === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HomePage onNavigate={onNavigate} onAddToCart={onAddToCart} onViewDetails={onViewDetails} />
            </motion.div>
          )}
          {['men', 'women', 'kids'].includes(currentPath) && (
            <motion.div key={currentPath} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CategoryPage category={currentPath} onAddToCart={onAddToCart} onViewDetails={onViewDetails} />
            </motion.div>
          )}
          {currentPath === 'details' && selectedProduct && (
            <motion.div key="details" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ProductDetailsPage product={selectedProduct} onAddToCart={onAddToCart} onBuyNow={onBuyNow} />
            </motion.div>
          )}
          {currentPath === 'cart' && (
            <motion.div key="cart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CartPage cart={cart} onUpdateQty={onUpdateQty} onRemove={onRemove} onCheckout={() => onNavigate('checkout')} />
            </motion.div>
          )}
          {currentPath === 'checkout' && (
            <motion.div key="checkout" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CheckoutPage cart={cart} onOrderComplete={() => {
                setCart([]);
                setCurrentPath('success');
              }} />
            </motion.div>
          )}
          {currentPath === 'success' && (
            <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <OrderSuccessPage onHome={() => onNavigate('home')} />
            </motion.div>
          )}
          {currentPath === 'admin' && (
            <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AdminDashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className={`py-20 border-t ${theme === 'dark' ? 'border-white/10 bg-black' : 'border-black/5 bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-serif font-bold">TrendWear</h2>
            <p className="opacity-60">Elevating your everyday style with premium fashion choices.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Shop</h4>
            <ul className="flex flex-col gap-4 opacity-60">
              <li><button onClick={() => onNavigate('men')}>Men</button></li>
              <li><button onClick={() => onNavigate('women')}>Women</button></li>
              <li><button onClick={() => onNavigate('kids')}>Kids</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Support</h4>
            <ul className="flex flex-col gap-4 opacity-60">
              <li>Contact Us</li>
              <li>Shipping Policy</li>
              <li>Returns & Exchanges</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Newsletter</h4>
            <p className="opacity-60 mb-4 text-sm">Subscribe to get special offers and once-in-a-lifetime deals.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-black/5 dark:bg-white/5 border-none outline-none rounded-lg px-4 py-2 flex-1" />
              <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-black/5 dark:border-white/5 text-center opacity-40 text-sm">
          © 2026 TrendWear Fashion. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
