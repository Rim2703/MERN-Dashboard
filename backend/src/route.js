const express = require('express')
const router = express.Router()
const { createUser, loginUser, getUser, fetchTransporters } = require('./controllers/userController')
const { sendMessage, sendReply, getTransporter, getOrderIDs, searchApi } = require('./controllers/messageController')

router.post('/register', createUser)
router.post('/login', loginUser)
router.post('/messages', sendMessage)
router.post('/reply', sendReply)
router.get('/orderIDs', getOrderIDs)
router.get('/getUser', getUser)
router.get('/transporters', getTransporter)
router.get('/getTransporter', fetchTransporters)
router.get('/messages', searchApi)

module.exports = router