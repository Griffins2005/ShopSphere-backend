// server.js (Backend)
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

app.use(
  cors({
    origin: 'https://shopsphere-ecommerce.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use((req, res, next) => {
  const nonce = crypto.randomBytes(16).toString('base64');
  res.setHeader(
    'Content-Security-Policy',
    `default-src 'self'; script-src 'self' 'nonce-${nonce}' https://js.stripe.com https://accounts.google.com;`
  );
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(passport.initialize());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/checkout', checkoutRoutes);

mongoose
  .connect(process.env.MONGO_URI, { 
    // useNewUrlParser: true, useUnifiedTopology: true 
    })
  .then(() => {
    console.log('Connected to MongoDB');
    const port = process.env.PORT || 5001;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });