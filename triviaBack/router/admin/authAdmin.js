const express = require('express');
const User = require('../../model/admin/UserAdmin');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = new User({ username, password });
        console.log(`El usuario es ${user}`);
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(400).json({ error: 'Error registering user' });
    }
});

// Login user
router.post('/login', async (req, res) => {  
    const { username, password } = req.body;

    try {
        console.log(`Attempting to login with username: ${username}`);
        const user = await User.findOne({ username });
        if (!user) {
            console.log(`User not found: ${username}`);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (err) {
        console.error('Server error during login:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
