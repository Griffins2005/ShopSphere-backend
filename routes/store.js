const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store");

router.get("/get-products", storeController.getAllProducts);

module.exports = router;