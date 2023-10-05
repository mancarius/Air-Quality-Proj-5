import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
    const [message, setMessage] = useState(''); // Stato per il messaggio dal backend
    const [isLoading, setIsLoading] = useState(false); // Stato per l'indicatore di caricamento
    const navigate = useNavigate();

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Mostra l'indicatore di caricamento

        try {
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: signupEmail,
                    password: signupPassword,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration success:', data);
                setMessage('Registrazione effettuata con successo! 🎉'); // Imposta il messaggio di successo
                setTimeout(() => {
                    navigate('/login'); // Naviga solo se la registrazione va a buon fine
                }, 1200);
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData.message);
                setMessage(`Registrazione fallita: ${errorData.message}`); // Imposta il messaggio di errore dal backend
            }
        } catch (error) {
            console.error('Errore durante la registrazione', error);
            setMessage('Errore durante la registrazione'); // Imposta un messaggio generico di errore
        } finally {
            setIsLoading(false); // Nasconde l'indicatore di caricamento quando la richiesta è completata
        }
    };

    return (
        <div>
            <div className='items-center'>
                <h2 className='login-title'>Sign Up</h2>
                <form onSubmit={handleSignupSubmit} className='form-structure'>
                    <input
                        className='input-form'
                        type="email"
                        placeholder="Email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                    />
                    <input
                        className='input-form'
                        type="password"
                        placeholder="Password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        required
                    />
                    <input
                        className='input-form'
                        type="password"
                        placeholder="Confirm Password"
                        value={signupConfirmPassword}
                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Sign Up</button>
                    {isLoading && <p className='message-form'>Registrazione in corso... 🕑</p>}
                    <p className='message-form'>{message}</p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
