const express = require('express');
const passport = require('passport');
const { signup, login, googleLogin } = require('../controllers/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

const jwt = require('jsonwebtoken');

router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/signup',
        session: false, 
    }),
    (req, res) => {
        if (!req.user) {
            return res.status(400).send('User authentication failed');
        }
        const token = jwt.sign({ id: req.user._id }, 'asdfghiucv709586967', { expiresIn: '1d' });
        
        res.cookie('token', token, { httpOnly: true });

        
        res.redirect('/profile');
    }
);


module.exports = router;
