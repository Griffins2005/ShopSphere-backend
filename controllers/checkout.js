exports.processCheckout = (req, res) => {
    try {
      const { paymentDetails, items } = req.body;
  
      // Process payment logic (e.g., integration with payment gateway)
      // For now, we'll simulate payment success
      res.status(200).json({ message: "Payment processed successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to process checkout" });
    }
  };  