require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const cartRoutes = require("./routes/cart");
const wishlistRoutes = require("./routes/wishlist");
const storeRoutes = require("./routes/store");
const checkoutRoutes = require("./routes/checkout");

const app = express();

// Configure CORS with allowed origins
const allowedOrigins = [
  'http://localhost:3000', 
  'https://fantastic-robot-97454wxvw52p9p9-3000.app.github.dev', 
  'https://supreme-garbanzo-ggw96rjw79phvvpv-5000.app.github.dev'
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin, like mobile apps or curl requests
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        const msg = `The CORS policy does not allow access from the specified origin: ${origin}`;
        return callback(new Error(msg), false);
      }
    },
    credentials: true, // Allows cookies and headers
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  })
);

app.use(express.json()); // Middleware to parse incoming JSON requests

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/checkout", checkoutRoutes);
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });
