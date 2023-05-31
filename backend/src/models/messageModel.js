const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    orderID: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    transporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transporter',
        required: true,
    },
    price: {
        type: Number,
        default: null,
    }
});

module.exports = mongoose.model('Message', messageSchema);



