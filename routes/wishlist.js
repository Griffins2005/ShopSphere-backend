const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlist");

router.get("/get-wishlist", wishlistController.getWishlist);
router.post("/add-to-wishlist", wishlistController.addToWishlist);
router.delete('/remove/:id', wishlistController.removeItemFromWishlist);

module.exports = router;