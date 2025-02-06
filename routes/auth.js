const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/auth');
const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'https://shopsphere-ecommerce.vercel.app/signup' }),
  async (req, res) => {
    try {
      const { email, displayName, avatar } = req.user.profile;
      let user = await User.findOne({ email });

      if (!user) {
        user = new User({
          email,
          name: displayName,
          avatar,
        });
        await user.save();
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error('Error during authentication:', error);
      res.status(500).send('Server error');
    }
  }
);

router.get("/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = router;