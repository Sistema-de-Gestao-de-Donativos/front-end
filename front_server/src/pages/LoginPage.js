import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
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
        setError('');
        alert('Regular login simulated!'); // implementar login sem google
    };

    async function handleAutorization(credentialResponse) {

        const decodedToken = jwtDecode(credentialResponse.credential);
        console.log(decodedToken);


        // local
        // const url = "http://localhost:8000/v1";  // url da api de autenticacao

        // cloud
        const url = "http://34.193.7.217:8085/v1/users/authenticate";
        
        let credential = credentialResponse.credential;

        try {
            console.log("Realizando autenticação...");
            console.log("Credential: ", credential);

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${credential}`, 
                    "accept": "application/json" 
                },
                body: ""
            });
    
            if (!response.ok) {
                throw new Error(`Erro na autenticação: ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log("Token jwt: ", data);
            console.log("Autenticação bem-sucedida:");

            // armazenar o token
            localStorage.setItem('token_jwt', data);

            // go to home page

            
        } catch (error) {
            console.error("Erro ao realizar autenticação:", error.message);
        }
    }
    

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
                        type='standard'
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse); // isso retorna o client_id e credential
                            // funcao para enviar a credential para o microsserviço de autenticacao
                            handleAutorization(credentialResponse);                            
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    /> 
                    </div>
                </div>
            </div>
        </main>
    );
}

export default LoginPage;
