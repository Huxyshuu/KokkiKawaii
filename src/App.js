import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MobileNavBar from './components/MobileNavBar';
import MobileMenu from './components/MobileMenu';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import AddRecipe from './components/AddRecipe';
import AdminList from './components/AdminList';
import Recipe from './components/Recipe';


function App() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmall, setIsSmall] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [displayBlocked, setDisplayBlocked] = useState(false);
  
  const adminRoutes = ['/overview', '/addrecipe'];

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

    if (window.matchMedia("(orientation: landscape)").matches && window.innerHeight < 670) {
      // you're in LANDSCAPE mode
      console.log('Please turn your device upright (portrait)');
      setDisplayBlocked(true);
   } else {
      setDisplayBlocked(false);
   }
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
  })

  return (
    <Router>
      <div className="App">
          {
            displayBlocked ? 
            <div id="displayBlocked">
              <h2>REC<span className='highlightColor'>LIB</span></h2>
              <h3>Please turn your device upright (portrait) to see the site properly.</h3>
              <h3 id="displayBlockedThanks">Thank you!</h3>
              <img id="displayBlockImage" src={require('./images/portraitPhone.png')} alt="Holding the phone in portrait"/>
            </div>
            :
            <>
              <MobileNavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
              <MobileMenu setMenuOpen={setMenuOpen} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/> 
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/recipes/:id" element={<Recipe loggedIn={loggedIn}/>} />
                <Route path="/login" element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
                {/*Check if the user is logged in or not, render accordingly or redirects to login*/}
                {loggedIn ? 
                <>
                  <Route path="/addrecipe" element={<AddRecipe />} />
                  <Route path="/overview" element={<AdminList />} />
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
