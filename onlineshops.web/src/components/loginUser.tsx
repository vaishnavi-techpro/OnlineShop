import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import axios from 'axios';

interface UserLoginProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserLogin: React.FC<UserLoginProps> = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        console.log('Entered Username:', username);
        console.log('Entered Password:', password);

        try {
            const response = await axios.post('https://localhost:7176/api/User/login', {
                userName: username,
                password: password,
            });
            const { token } = response.data;
            console.log('Received Token:', token);

            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', username);
                setIsLoggedIn(true);
                navigate('/dashboard');
            } else {
                setError('Failed to receive token from server.');
                console.log('Login failed: Token not found');
            }
        } catch {
            console.log('Login failed', error);
        }
    };

    return (
        <div>
            <div className="logincard-container">
                <div className="input-row">
                    <Typography variant="body1" className="input-label">Username:</Typography>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input-field"
                    />
                </div>
                <div className="input-row">
                    <Typography variant="body1" className="input-label">Password:</Typography>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <br />
                <button type="button" className="log-btn" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default UserLogin;
