const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkout");

router.post("/process-checkout", checkoutController.processCheckout);

module.exports = router;