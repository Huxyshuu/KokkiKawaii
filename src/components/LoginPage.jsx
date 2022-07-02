import React from 'react'
import '../styles/LoginPage.css';
import { useNavigate } from "react-router-dom";

export default function LoginPage(prop) {

    const { setLoggedIn } = prop;
    const navigate = useNavigate();

    const handleLogin = async e => {
        e.preventDefault();
        if (e.target[0].value === 'admin' && e.target[1].value === 'password') {
            console.log('Logged in!');
            setLoggedIn(true);
            navigate('/overview', { replace: true});
        }
    }

  return (
    <div id="loginPage">
        <div id="loginTitle">
            <h1>REC<span className="highlightColor">LIB</span></h1>
            <div>
                <h2>Kirjautuminen</h2>  
            </div>
        </div>
        <form action="#" id="loginForm" onSubmit={handleLogin}>
            <div>
                <p>Käyttäjänimi</p>
                <input type="text" id="loginUsername"/>
            </div>
            <div>
                <p>Salasana</p>
                <input type="password" id="loginPassword"/>
            </div>
            <input type="submit" id="loginSubmit" value="Kirjaudu"/>
        </form>
    </div>
  )
}
