import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MobileNavBar from './components/MobileNavBar';
import MobileMenu from './components/MobileMenu';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import AddRecipe from './components/AddRecipe';
import AdminList from './components/AdminList';


function App() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmall, setIsSmall] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  
  const adminRoutes = ['/overview', '/addrecipe'];

  const menuOpener = () => {
    const dropdownMenu = document.getElementById('dropdownMenu');
    if(menuOpen) {
      dropdownMenu.style.left = '0';
    } else {
      dropdownMenu.style.left = '-100vw';
    }
  }

  const menuManager = () => {
    const checkWindowSize = () => {
      setIsSmall(window.innerWidth < 1300 ? true : false);
      if (!isSmall) {
          setMenuOpen(false);
      }
  }

  if (menuOpen) {
      document.body.style.overflow = "hidden";
  } else {
      document.body.style.overflow = "visible";
  }
  window.addEventListener('resize', checkWindowSize);
  checkWindowSize();

  return () => {
      window.removeEventListener('resize', checkWindowSize);
  }
  }

  useEffect(() => {
    menuOpener();
    menuManager();
  })

  return (
    <Router>
      <div className="App">
        <MobileNavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        <MobileMenu setMenuOpen={setMenuOpen} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/> 
        <Routes>
          <Route path="/" element={<MainPage />} />
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
        
      </div>
    </Router>
  );
}

export default App;
