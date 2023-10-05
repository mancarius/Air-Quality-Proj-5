import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Stato per gestire se l'utente è loggato
    const [loginFailed, setLoginFailed] = useState(false); // Stato per gestire se il login fallisce
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: loginEmail, password: loginPassword }),
            });

            
      
            if (response.ok) {
              const data = await response.json();
              console.log('Login success:', data);
              localStorage.setItem('token', data.token);

              setIsLoggedIn(true);
              setLoginFailed(false);
                setTimeout(() => {
                    navigate('/'); 
                }, 1100);
            } else {
              console.log('Login failed');
              setLoginFailed(true);
            }
          } catch (error) {
            console.error('Errore durante il login', error);
            setMessage('Errore durante il login');
          } finally {
            setIsLoading(false);
          }
        };

    return (
        <div>
            <div className='items-center'>
                <h2 className='login-title'>Login</h2>
                {isLoggedIn ? ( // Mostra il messaggio se l'utente è loggato
                    <p className='message-form'>Login effettuato con successo! ✅</p>
                ) : (
                  <div className='result-container'>
                    <div>
                        <form onSubmit={handleLoginSubmit} className='form-structure'>
                            <input 
                                className='input-form'
                                type="email"
                                placeholder="Email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                required
                            />
                            <input
                                className='input-form'
                                type="password"
                                placeholder="Password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                required
                            />
                            <button type="submit" className='button-b'>Login</button>
                        </form>
                        {isLoading && <p className='message-form'>Login in corso... 🕑</p>}
                        <p className='message-sign-up'>{message}</p>
                        {loginFailed && <p className='login-signup-error'>Login non riuscito, riprovare</p>} {/* Mostra il messaggio di errore se il login fallisce */}
                    </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
