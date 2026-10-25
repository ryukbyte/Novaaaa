
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Mock credentials for assignment testing
const DEMO_USER = {
    email: 'demo@nova.com',
    password: 'Nova1234',
};

// Check whether the server is running
app.get('/', (req, res) => {
    res.json({ message: 'NOVA API is running!' });
});

// Login API
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required.',
        });
    }

    const isValidUser =
        email.trim().toLowerCase() === DEMO_USER.email &&
        password === DEMO_USER.password;

    if (!isValidUser) {
        return res.status(401).json({
            message: 'Invalid email or password.',
        });
    }

    return res.status(200).json({
        message: 'Login successful!',
        user: {
            email: DEMO_USER.email,
            name: 'NOVA User',
        },
    });
});

app.listen(PORT, () => {
    console.log(`NOVA API running at http://localhost:${PORT}`);
});
ç