import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LandingPage = () => {
  const [messages, setMessages] = useState([])
  const [searchOrderId, setSearchOrderId] = useState('')
  const [searchTo, setSearchTo] = useState('')
  const [searchFrom, setSearchFrom] = useState('')

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/messages')
      setMessages(response.data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const searchMessages = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8000/messages', {
        params: { orderID: searchOrderId, receiver: searchTo, sender: searchFrom },
      });
      console.log(response.data)
      setMessages(response.data)
    } catch (error) {
      console.error('Error searching messages:', error)
    }
  };

  return (
    <div>
      <h2>Landing Page</h2>
      <form onSubmit={searchMessages}>

        <div className="form-control">
          <input
            type="text"
            placeholder="Order ID"
            value={searchOrderId}
            onChange={(e) => setSearchOrderId(e.target.value)}
          />
        </div>

        <div className="form-control">
          <input
            type="text"
            placeholder="To"
            value={searchTo}
            onChange={(e) => setSearchTo(e.target.value)}
          />
        </div>

        <div className="form-control">
          <input
            type="text"
            placeholder="From"
            value={searchFrom}
            onChange={(e) => setSearchFrom(e.target.value)}
          />
        </div>

        <button type="submit">Search</button>
      </form>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Transporter</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message._id}>
                <td>{message.orderID}</td>
                <td>{message.transporter}</td>
                <td>{message.quantity}</td>
                <td>{message.price}</td>
                <td>{message.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LandingPage;




