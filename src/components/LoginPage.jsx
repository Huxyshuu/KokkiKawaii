import React, { useEffect, useState } from 'react'
import '../styles/LoginPage.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function LoginPage(prop) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] =  useState(false);
    const [loginFailed, setLoginFailed] = useState(true);

    const { setLoggedIn } = prop;
    const navigate = useNavigate();

    const handleLogin = async e => {
        e.preventDefault();
        const user = { username, password };
        await axios.post("https://reclib-backend.vercel.app/login/authorize", user)
            .then(response => {
                // console.log(response);

                setUsername('');
                setPassword('');
                setLoading(true);
                setTimeout(() => {
                    setLoggedIn(true);
                    localStorage.setItem('reclib_user', 'admin')
                    navigate('/overview', { replace: true});
                }, 1000);
            })
            .catch(err => {
                // console.error(err.message)
                setLoginFailed(true);
                setUsername('');
                setPassword('');
            });

        


        // if (e.target[0].value === 'admin' && e.target[1].value === 'password') {
        //     setLoggedIn(true);
        //     navigate('/overview', { replace: true});
        // }
    }

    useEffect(() => {
        const user = localStorage.getItem('reclib_user');
        if (user) {
            setLoggedIn(true);
            navigate('/overview', { replace: true});
        }

    }, [setLoggedIn, navigate])

    return (
    <div id="loginPage">
        <div id="loginOverlay"></div>
        <div id="loginStuff">
            <div id="loginTitle">
                <h1>Kokki<span className="highlightColor">K</span></h1>
                <div>
                    <h2>Kirjautuminen</h2>  
                </div>
            </div>
            {
                loading ? 
                <div id="loginLoader">
                    <div id="loginLoadingSpinner">
                    </div> 
                    <h3>Kirjaudutaan...</h3>
                </div>
                :
                <>
                <form action="#" id="loginForm" onSubmit={handleLogin}>
                    <div>
                        <p>Käyttäjänimi</p>
                        <input type="text" id="loginUsername" value={username} autoComplete="off" onChange={({ target }) => setUsername(target.value)} required minLength="3" />
                    </div>
                    <div>
                        <p>Salasana</p>
                        <input type="password" id="loginPassword" value={password} autoComplete="off" onChange={({ target }) => setPassword(target.value)} required minLength="3" />
                    </div>
                    {
                        loginFailed && 
                        <div id="loginFailed">
                            <p>Kirjautuminen epäonnistui</p>
                        </div>
                    }
                    <input type="submit" id="loginSubmit" value="Kirjaudu"/>
                </form>
                </>
            }
        </div>
    </div>
  )
}
