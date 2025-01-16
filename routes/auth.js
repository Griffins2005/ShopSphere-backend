// routes/auth.js
const express = require('express');
const router = express.Router();
const { signup, login, googleLogin } = require('../controllers/auth');

// Define routes for signup, login, and Google login
router.post('/signup', signup);
router.post('/login', login);
router.post('/google-login', googleLogin);

module.exports = router;
