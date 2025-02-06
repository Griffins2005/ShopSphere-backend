const CartItem = require("../models/cart");
const mongoose = require("mongoose");

exports.getCartItems = async (req, res) => {
  try {
    console.log("Fetching cart items...");
    const cartItems = await CartItem.find();
    console.log("Cart items fetched:", cartItems);
    res.status(200).json(cartItems);
  } catch (err) {
    console.error("Error fetching cart items:", err);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const newItem = new CartItem(req.body);
    await newItem.save();
    res.status(201).json({ message: "Item added to cart successfully" });
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
};
exports.updateQuantity = async (req, res) => {
  const { id, change } = req.body;
  try {
    const item = await CartItem.findById(id);
    if (!item) return res.status(404).send("Item not found");
    item.quantity += change;
    if (item.quantity < 1) item.quantity = 1; 
    await item.save();
    res.json(item);
  } catch (error) {
    console.error("Error updating quantity:", error);
    res.status(500).send("Server error");
  }
};
exports.removeItemFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    // Use the correct model
    const deletedItem = await CartItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.status(200).json({ message: "Item removed from cart successfully", deletedItem });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.checkout = async (req, res) => {
  try {
    const { items } = req.body;

    // Perform checkout logic (e.g., payment gateway integration)
    console.log("Checkout initiated with items:", items);

    // Placeholder for actual processing
    res.status(200).json({ message: "Checkout successful" });
  } catch (err) {
    console.error("Error during checkout:", err);
    res.status(500).json({ error: "Checkout failed" });
  }
};