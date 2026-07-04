const mongoose = require('mongoose');
const dotenv   = require('dotenv');
const Product  = require('./models/Product');

dotenv.config();

const products = [
  { name: 'Apple iPhone 15 Pro', description: 'A17 Pro chip, titanium design, 48MP camera. The most powerful iPhone ever made with incredible speed and a stunning display.', price: 129999, image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&q=80', stock: 25, category: 'Electronics', rating: 4.8, numReviews: 312 },
  { name: 'Samsung Galaxy S24 Ultra', description: 'Snapdragon 8 Gen 3, 200MP camera, built-in S Pen. The ultimate Android experience with AI-powered features.', price: 124999, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80', stock: 18, category: 'Electronics', rating: 4.7, numReviews: 245 },
  { name: 'Sony WH-1000XM5 Headphones', description: 'Industry-leading noise cancellation with 30-hour battery life. Crystal-clear audio for music, calls and everything in between.', price: 29999, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', stock: 42, category: 'Electronics', rating: 4.9, numReviews: 521 },
  { name: 'MacBook Air M3', description: 'Supercharged by M3 chip with up to 18-hour battery life. Incredibly thin and light with a stunning Liquid Retina display.', price: 114900, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80', stock: 12, category: 'Electronics', rating: 4.9, numReviews: 189 },
  { name: "Men's Premium Cotton T-Shirt", description: '100% premium cotton crew-neck in a modern regular fit. Breathable, soft and durable — perfect for everyday wear.', price: 799, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80', stock: 200, category: 'Clothing', rating: 4.2, numReviews: 876 },
  { name: "Women's Floral Kurta Set", description: 'Beautiful floral print kurta with matching palazzo pants. Soft rayon fabric, perfect for festive and casual occasions.', price: 1499, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80', stock: 85, category: 'Clothing', rating: 4.5, numReviews: 234 },
  { name: 'Atomic Habits – James Clear', description: 'The #1 New York Times bestseller. A proven framework for building good habits and breaking bad ones. Transform your life one tiny change at a time.', price: 449, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80', stock: 150, category: 'Books', rating: 4.8, numReviews: 2341 },
  { name: 'The Psychology of Money', description: 'By Morgan Housel. Timeless lessons on wealth, greed, and happiness — one of the most important personal-finance books written.', price: 399, image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=500&q=80', stock: 120, category: 'Books', rating: 4.7, numReviews: 1892 },
  { name: 'Premium Yoga Mat (6mm)', description: 'Eco-friendly non-slip yoga mat with alignment lines. Superior grip on both sides. Perfect for yoga, pilates and stretching.', price: 1299, image: 'https://images.unsplash.com/photo-1601925228008-93e5bca8a844?w=500&q=80', stock: 67, category: 'Sports', rating: 4.4, numReviews: 431 },
  { name: 'Adjustable Dumbbell Set 20kg', description: 'Space-saving adjustable dumbbells replace 15 sets of weights. Quick-dial system from 2–20kg, ideal for home gyms.', price: 8999, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80', stock: 30, category: 'Sports', rating: 4.6, numReviews: 312 },
  { name: 'Instant Pot Duo 7-in-1', description: 'The best-selling multi-cooker: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker and warmer in one.', price: 6999, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80', stock: 40, category: 'Home', rating: 4.7, numReviews: 1023 },
  { name: 'Organic Darjeeling Green Tea (100 bags)', description: 'Premium organic green tea from the finest Darjeeling gardens. Rich in antioxidants, naturally refreshing.', price: 349, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80', stock: 300, category: 'Food', rating: 4.3, numReviews: 567 }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
    await Product.deleteMany({});
    console.log('🗑  Old products cleared');
    await Product.insertMany(products);
    console.log(`🌱 ${products.length} products seeded successfully!`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
};

seed();
