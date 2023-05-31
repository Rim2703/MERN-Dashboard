const messageModel = require('../models/messageModel')
const Transporter = require('../models/transporterModel')

const sendMessage = async (req, res) => {
    try {
        const { orderID, receiver, sender, quantity, address, transporter, } = req.body;

        const message = new messageModel({
            orderID,
            receiver,
            sender,
            quantity,
            address,
            transporter,
        });
        const savedMessage = await message.save()
        res.json(savedMessage)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const sendReply = async (req, res) => {
    try {
        const { orderID, price } = req.body;
        // Find the message by the order ID and update the price field
        const message = await messageModel.findOneAndUpdate(
            { orderID },
            { price },
            { new: true }
        );

        if (!message) {
            return res.status(404).json({ message: 'Message not found' })
        }
        res.json(message)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getOrderIDs = async (req, res) => {
    try {
        const messages = await messageModel.find({}, 'orderID')
        const orderIDs = messages.map((message) => message.orderID)
        res.json({ orderIDs })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const searchApi = async (req, res) => {
  try {
    const { orderID, receiver, sender } = req.query;

    let query = {};

    if (orderID) {
      query.orderID = orderID;
    }
    if (receiver) {
      query.receiver = receiver;
    }
    if (sender) {
      query.sender = sender;
    }

    const messages = await messageModel.find(query)
    res.json(messages)
  } catch (error) {
    console.error('Error fetching messages:', error)
    res.status(500).json({ error: 'Failed to fetch messages' })
  }
}


const getTransporter = async (req, res) => {
    try {
        // Fetch all transporters from the database
        const transporters = await Transporter.find()
        res.json(transporters)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { sendMessage, sendReply, getTransporter, getOrderIDs, searchApi }