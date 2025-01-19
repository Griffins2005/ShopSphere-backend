const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/user');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/me', authenticate, getUserProfile);
router.put('/me', authenticate, updateUserProfile);

console.log({ getUserProfile, updateUserProfile, authenticate });

module.exports = router;
