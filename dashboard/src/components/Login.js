// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault();

        // Perform login logic
        const loginData = { email, password }
        console.log(loginData)

        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            })

            const data = await response.json()

            if (response.ok) {
                // Login successful
                console.log('Login successful');
                const userType = data.userType; // Access the userType from the response data

                // Redirect user based on userType
                if (userType === 'Manufacturer') {
                    navigate('/manufacturer')
                } else if (userType === 'Transporter') {
                    navigate('/transporter')
                }
            } else {
                // Login failed
                console.log('Login failed')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }


    return (
        <div className="login-container">

            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-control">

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-control">

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPage;
