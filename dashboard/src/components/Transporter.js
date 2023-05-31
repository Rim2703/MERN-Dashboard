import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransporterLandingPage = () => {
  const [orderIDs, setOrderIDs] = useState([])
  const [selectedOrderID, setSelectedOrderID] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => {
    const fetchOrderIDs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/orderIDs');
        setOrderIDs(response.data.orderIDs)
      } catch (error) {
        console.log(error)
      }
    }

    fetchOrderIDs()
  }, [])

  const handleSendReply = async () => {
    try {
      const replyData = {
        orderID: selectedOrderID,
        price: parseFloat(price),
      };

      const response = await axios.post('http://localhost:8000/reply', replyData)
      console.log('Reply sent:', response.data)

      // Reset selected order ID and price
      setSelectedOrderID('')
      setPrice('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="login-container">
      <h2>Transporter</h2>
      <div>
      <div className="form-control">

        <label>Select Order ID:</label>
        <select
          value={selectedOrderID}
          onChange={(e) => setSelectedOrderID(e.target.value)}
        >
          <option value="">Select Order ID</option>
          {orderIDs.map((orderID) => (
            <option key={orderID} value={orderID}>
              {orderID}
            </option>
          ))}
        </select>
        </div>
      </div>
      
      <div>
      <div className="form-control">
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      </div>

      <button type="button" onClick={handleSendReply}>
        Reply
      </button>
    </div>
  )
}

export default TransporterLandingPage;



