const registerSchema = require('../models/registerModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Register a new user
const createUser = async (req, res) => {
    const { username, email, password, userType, address } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await registerSchema.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' })
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user object
        const newUser = new registerSchema({ username, email, password: hashedPassword, userType, address })

        // Save the user to the database
        await newUser.save()
        res.status(201).json({ message: 'Registration successful' })

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await registerSchema.findOne({ email })
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials, Wrong Password' })
        }

        // Fetch the user's userType
        const userType = user.userType;

        // Create and sign a JWT token
        const token = jwt.sign({ userId: user._id }, 'developers-UI')

        // Include the userType in the response
        res.json({ token, userType })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}


const getUser = async (req, res) => {
    const { username } = req.query;

    try {
        const userData = await registerSchema.findOne({ username: username })
        if (!userData) {
            return res.status(400).json({ error: 'User not found' })
        }

        res.json({ address: userData.address })
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Failed to fetch user data' })
    }
}


const fetchTransporters = async (req, res) => {
    try {
        const transporters = await registerSchema.find({ userType: 'Transporter' })
        res.json(transporters)
    } catch (error) {
        console.error('Error fetching transporters:', error)
        res.status(500).json({ error: 'Failed to fetch transporters' })
    }
}


module.exports = { createUser, loginUser, getUser, fetchTransporters }

