import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

interface UserLoginProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserLogin: React.FC<UserLoginProps> = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log('Entered Username:', username);
        console.log('Entered Password:', password);
        if (username.trim() === 'admin' && password.trim() === 'admin@123') {
            localStorage.setItem('user', username); 
            setIsLoggedIn(true); 
            navigate('/dashboard'); 
        } else {
            alert('Invalid credentials');
            console.log('Login failed');
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
                <br />
                <button type="button" className="log-btn" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default UserLogin;
