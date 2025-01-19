require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const cartRoutes = require("./routes/cart");
const wishlistRoutes = require("./routes/wishlist");
const storeRoutes = require("./routes/store");
const checkoutRoutes = require("./routes/checkout");
const cookieSession = require('cookie-session');
const passport = require("passport");
const app = express();

// Configure CORS with allowed origins
const allowedOrigins = [
  'http://localhost:3000'
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: 'GET,UPDATE,POST,PUT,DELETE',
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "script-src 'self' 'nonce-your_generated_nonce_here' https://accounts.google.com;"
  );
  next();
});

app.use(
  cookieSession({
    name: 'session',
    keys: ['cyberwolve'],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/checkout", checkoutRoutes);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log('Connected to MongoDB');
    const port = process.env.PORT || 5001;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });
