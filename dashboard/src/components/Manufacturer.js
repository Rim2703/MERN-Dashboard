import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessageForm = () => {
  const [orderID, setOrderID] = useState('')
  const [receiver, setReceiver] = useState('')
  const [sender, setSender] = useState('')
  const [quantity, setQuantity] = useState('')
  const [address, setAddress] = useState('')
  const [selectedTransporter, setSelectedTransporter] = useState('')
  const [transporters, setTransporters] = useState([])

  useEffect(() => {
    // Fetch transporters from the backend
    const fetchTransporters = async () => {
      try {
        const response = await axios.get('http://localhost:8000/getTransporter')
        setTransporters(response.data)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchTransporters()
  }, [])

  useEffect(() => {
    // Generate an alphanumeric Order ID
    const generateOrderID = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 4; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
      }
      setOrderID(result)
    }

    generateOrderID()
  }, [])

  const handleTransporterChange = async (e) => {
    setSelectedTransporter(e.target.value);

    // Fetch the transporter's address based on the selected transporter username
    try {
      const response = await axios.get('http://localhost:8000/getUser', {
        params: { username: e.target.value },
      });

      const transporterData = response.data;
      setAddress(transporterData.address)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const messageData = {
      orderID,
      receiver,
      sender,
      quantity,
      address,
      transporter: selectedTransporter,
    };

    try {
      const response = await axios.post('http://localhost:8000/messages', messageData);
      console.log('Message sent:', response.data)
      // Reset form fields
      setOrderID('')
      setReceiver('')
      setSender('')
      setQuantity('')
      setAddress('')
      setSelectedTransporter('')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="login-container">
      <h2>Manufacturer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            type="text"
            placeholder="Order ID"
            value={orderID}
            onChange={(e) => setOrderID(e.target.value)}
            required
            readOnly
          />
        </div>

        <div className="form-control">
          <input
            type="text"
            placeholder="To"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <input
            type="text"
            placeholder="From"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <select value={quantity} onChange={(e) => setQuantity(e.target.value)} required>
            <option value="">Select Quantity</option>
            <option value="1">1 ton</option>
            <option value="2">2 tons</option>
            <option value="3">3 tons</option>
          </select>
        </div>

        <div className="form-control">
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            readOnly
          />
        </div>

        <select value={selectedTransporter} onChange={handleTransporterChange} required>
          <option value="">Select Transporter</option>
          {transporters.map((transporter) => (
            <option key={transporter._id} value={transporter.username}>
              {transporter.username}
            </option>
          ))}
        </select>

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default MessageForm;
