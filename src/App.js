import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MobileNavBar from './components/MobileNavBar';
import MobileMenu from './components/MobileMenu';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import AddRecipe from './components/AddRecipe';
import AdminList from './components/AdminList';


function App() {

  const [menuOpen, setMenuOpen] = useState(false);

  const loggedIn = false;

  return (
    <Router>
      <div className="App">
        <MobileNavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        {menuOpen ? <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/> 
        : 
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/*Check if the user is logged in or not, render accordingly or redirects to login*/}
          {loggedIn ? 
          <>
            <Route path="/addrecipe" element={<AddRecipe />} />
            <Route path="/overview" element={<AdminList />} />
          </> : <Route path="*" element={<Navigate to="/login" />} replace={true}/>
          }
          
        </Routes>
        }
        
      </div>
    </Router>
  );
}

export default App;
