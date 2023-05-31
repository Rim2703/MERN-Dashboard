import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userType, setUserType] = useState('')
    const [address, setAddress] = useState('')
    const [emailError, setEmailError] = useState('')

    const handleRegistration = async (e) => {
        e.preventDefault();
        const userData = { username, email, password, userType, address }
        console.log(userData)
        // Send the registration data to the backend
        try {
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })

            const data = await response.json();

            if (response.ok) {
                // Registration successful
                console.log('Registration successful');
                // Redirect to login page
                navigate('/login')
            } else {
                // Registration failed
                setEmailError(data.error)
                console.log('Registration failed')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <div className="login-container">
            <h2>Registration</h2>
            <form onSubmit={handleRegistration}>
                <div className="form-control">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-control">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {emailError && <p className="error">{emailError}</p>}
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
                <div className="form-control">
                    <select value={userType} onChange={(e) => setUserType(e.target.value)} required>
                        <option value="">Select User Type</option>
                        <option value="Manufacturer">Manufacturer</option>
                        <option value="Transporter">Transporter</option>
                    </select>
                </div>

                <div className="form-control">
                    <input
                        type="address"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Register</button>
            </form>
            <Link style={{ color: 'white' }} to="/login">
                Already have an account? Login here
            </Link>
        </div>
    );
}

export default Register;
