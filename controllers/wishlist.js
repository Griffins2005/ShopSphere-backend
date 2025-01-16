const WishlistItem = require("../models/wishlist");

exports.getWishlist = async (req, res) => {
  try {
    const wishlistItems = await WishlistItem.find();
    res.status(200).json(wishlistItems);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch wishlist items" });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const newItem = new WishlistItem(req.body);
    await newItem.save();
    res.status(201).json({ message: "Item added to wishlist successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add item to wishlist" });
  }
};