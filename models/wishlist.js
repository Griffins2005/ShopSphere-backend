const mongoose = require("mongoose");

const wishlistItemSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String, 
});

const WishlistItem = mongoose.model("WishlistItem", wishlistItemSchema);

module.exports = WishlistItem;