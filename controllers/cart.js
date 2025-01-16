const CartItem = require("../models/cart");

exports.getCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const newItem = new CartItem(req.body);
    await newItem.save();
    res.status(201).json({ message: "Item added to cart successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add item to cart" });
  }
};

exports.checkout = async (req, res) => {
  try {
    // Process checkout (e.g., payment gateway)
    const { items } = req.body;
    // Perform checkout logic here (e.g., charge card, save order, etc.)
    res.status(200).json({ message: "Checkout successful" });
  } catch (err) {
    res.status(500).json({ error: "Checkout failed" });
  }
};