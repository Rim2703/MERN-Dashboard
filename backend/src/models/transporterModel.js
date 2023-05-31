const mongoose = require('mongoose');

const transporterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Transporter', transporterSchema);
