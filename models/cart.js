const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  title: String,
  price: Number,
  quantity: { type: Number, default: 1 },
  image: String, 
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;