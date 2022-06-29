import React from 'react'
import '../styles/LoginPage.css';
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  return (
    <div id="loginPage">
        <div id="loginTitle">
            <h1>REC<span className="highlightColor">LIB</span></h1>
            <div>
                <h2>Login</h2>  
            </div>
        </div>
        <form action="#" id="loginForm">
            <div>
                <p>Username</p>
                <input type="text" id="loginUsername"/>
            </div>
            <div>
                <p>Password</p>
                <input type="password" id="loginPassword"/>
            </div>
            <input type="submit" id="loginSubmit" value="Log In"/>
        </form>
    </div>
  )
}
