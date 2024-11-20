import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import logo from '../components/logo.png';
import './views/loginPage.css';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }
        console.log('Username:', username);
        console.log('Password:', password);
        // Implement login logic here (e.g., API request to validate credentials)
        setError('');
    };

    const handleGoogleSuccess = (response) => {
        console.log('Google login successful:', response.profileObj);
        // Handle login success, e.g., save user details or token
    };

    const handleGoogleFailure = (response) => {
        console.error('Google login failed:', response);
        // Handle login failure
    };

    return (
        <main>
            <div>
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <div className="menu-container">
                    <form onSubmit={handleLogin} className="login-form">
                        <div className="input-container">
                            <label htmlFor="username">Usuário</label>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="password">Senha</label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <button type="submit" className="login-button">
                            Login
                        </button>
                    </form>
                    <div className="google-login">
                        <GoogleLogin
                            clientId="YOUR_GOOGLE_CLIENT_ID" // Replace with your Google Client ID
                            buttonText="Sign in with Google"
                            onSuccess={handleGoogleSuccess}
                            onFailure={handleGoogleFailure}
                            cookiePolicy={'single_host_origin'}
                            className="google-login-btn"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default LoginPage;