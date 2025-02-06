const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/user');

const router = express.Router();

router.get('/me', getUserProfile);
router.put('/me', updateUserProfile);

console.log({ getUserProfile, updateUserProfile});

module.exports = router;
