import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MobileNavBar from './components/MobileNavBar';
import MobileMenu from './components/MobileMenu';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import AddRecipe from './components/AddRecipe';
import EditRecipe from './components/EditRecipe';
import AdminList from './components/AdminList';
import Recipe from './components/Recipe';

const backendURL = "https://reclib-backend.vercel.app/recipes/";


function App() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmall, setIsSmall] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [displayBlocked, setDisplayBlocked] = useState(false);
  
  const adminRoutes = ['/overview', '/addrecipe', '/editrecipe'];

  const menuOpener = () => {
    const dropdownMenu = document.getElementById('dropdownMenu');
    if(menuOpen) {
      dropdownMenu.style.left = '0';
    } else {
      dropdownMenu.style.left = '-100vw';
    }
  }

  const checkWindowSize = () => {
    setIsSmall(window.innerWidth < 1300 ? true : false);
    if (!isSmall) {
        setMenuOpen(false);
    }

    /* if (window.screen.orientation.type === 'landscape-primary' || window.screen.orientation.type === 'landscape-secondary') {
      if (window.innerHeight < 300 || window.innerWidth < 300) {
        setDisplayBlocked(true);
      }
    } else {
        setDisplayBlocked(false);
    };  */

    if (window.innerHeight < 300 || window.innerWidth < 300) {
      setDisplayBlocked(true);
    } else {
      setDisplayBlocked(false);
    }; 
  }

  const menuManager = () => {
    checkWindowSize();

    if (menuOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "visible";
    }

  window.addEventListener('resize', checkWindowSize);
  checkWindowSize();
  }

  useEffect(() => {

    if (!displayBlocked) {
      menuOpener();
    }
    menuManager();

    return () => {
      window.removeEventListener('resize', checkWindowSize);
  }
  }, )

  return (
    <Router>
      <div className="App">
          {
            displayBlocked ? 
            <div id="displayBlocked">
              <h2>Cozy<span className='highlightColor'>C</span></h2>
              <h3>Hanki isompi näyttö wtf...</h3>
              <h3 id="displayBlockedThanks">Kiitos!</h3>
              <img id="displayBlockImage" src={require('./images/portraitPhone.png')} alt="Holding the phone in portrait"/>
            </div>
            :
            <>
              <MobileNavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} isSmall={isSmall} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
              <MobileMenu setMenuOpen={setMenuOpen} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/> 
              <Routes>
                <Route path="/" element={<MainPage backendURL={backendURL}/>} />
                <Route path="/recipes/:id" element={<Recipe loggedIn={loggedIn} backendURL={backendURL}/>} />
                <Route path="/login" element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
                {/*Check if the user is logged in or not, render accordingly or redirects to login*/}
                {loggedIn ? 
                <>
                  <Route path="/addrecipe" element={<AddRecipe backendURL={backendURL}/>} />
                  <Route path="/editrecipe/:id" element={<EditRecipe backendURL={backendURL}/>} />
                  <Route path="/overview" element={<AdminList backendURL={backendURL}/>} />
                </> : 
                <>
                  {
                    adminRoutes.map((path, index) => {
                      return (
                        <Route path={path} 
                        element={<Navigate to="/login" />} 
                        replace={true} 
                        key={"admin_" + index}/>
                      )
                    })
                  }
                </>
                }
                <Route path="*" element={<Navigate to="/" />} replace={true}/>
                
              </Routes>
            </>
          }
      </div>
    </Router>
  );
}

export default App;
