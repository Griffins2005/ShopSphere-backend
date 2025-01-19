const WishlistItem = require("../models/wishlist");
const mongoose = require("mongoose");

exports.getWishlist = async (req, res) => {
  try {
    const wishlistItems = await WishlistItem.find();
    res.status(200).json(wishlistItems);
  } catch (err) {
    console.error("Error fetching wishlist items:", err);
    res.status(500).json({ error: "Failed to fetch wishlist items" });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const newItem = new WishlistItem(req.body);
    await newItem.save();
    res.status(201).json({ message: "Item added to wishlist successfully" });
  } catch (err) {
    console.error("Error adding item to wishlist:", err);
    res.status(500).json({ error: "Failed to add item to wishlist" });
  }
};

exports.removeItemFromWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    // Use the correct model
    const deletedItem = await WishlistItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }

    res.status(200).json({ message: "Item removed from wishlist successfully", deletedItem });
  } catch (error) {
    console.error("Error removing item from wishlist:", error);
    res.status(500).json({ message: "Error removing item from wishlist", error });
  }
};