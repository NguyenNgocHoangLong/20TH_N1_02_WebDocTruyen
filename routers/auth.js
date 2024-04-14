const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/login', async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        try {
            if (err || !user) {
                return res.status(401).send('Unauthorized');
            }
            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);
                return res.send('Logged in successfully');
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.send('Logged out successfully');
});

module.exports = router;
