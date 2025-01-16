const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");

router.get("/get-cart-items", cartController.getCartItems);
router.post("/add-to-cart", cartController.addToCart);
router.post("/checkout", cartController.checkout);

module.exports = router;