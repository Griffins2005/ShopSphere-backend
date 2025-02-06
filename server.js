const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();
const passport = require("./passport.js");

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const cartRoutes = require("./routes/cart");
const wishlistRoutes = require("./routes/wishlist");
const storeRoutes = require("./routes/store");
const checkoutRoutes = require("./routes/checkout");

const app = express();

const allowedOrigins = ['https://shopsphere-ecommerce.vercel.app'];

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigins[0]);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(passport.initialize());
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