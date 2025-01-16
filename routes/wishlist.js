const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlist");

router.get("/get-wishlist", wishlistController.getWishlist);
router.post("/add-to-wishlist", wishlistController.addToWishlist);

module.exports = router;