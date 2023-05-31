const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        // enum: ['manufacturer', 'transporter'],
        required: true
    },
    address: { type: String, required: true },
})

module.exports = mongoose.model('register', registerSchema)

