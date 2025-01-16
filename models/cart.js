const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,  // Optional, can be used for item image URL
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;