const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('./passport.js');
const crypto = require('crypto');
dotenv.config();

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const wishlistRoutes = require('./routes/wishlist');
const storeRoutes = require('./routes/store');
const checkoutRoutes = require('./routes/checkout');

const app = express();

const allowedOrigins = ['http://localhost:3000', 'https://shopsphere-ecommerce.vercel.app'];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(
  cors({
    origin: ['https://shopsphere-ecommerce.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json());
app.use(passport.initialize());

app.use((req, res, next) => {
  const nonce = crypto.randomBytes(16).toString('base64');
  console.log('Generated CSP nonce:', nonce);
  res.setHeader(
    'Content-Security-Policy',
    `default-src 'self'; script-src 'self' 'nonce-${nonce}' https://js.stripe.com https://accounts.google.com;`
  );
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/checkout', checkoutRoutes);

mongoose
  .connect(process.env.MONGO_URI, { 
   })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    const port = process.env.PORT || 5001;
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
