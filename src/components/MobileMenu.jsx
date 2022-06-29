import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";
import '../styles/MobileMenu.css';


export default function MobileMenu(prop) {

  const { setMenuOpen } = prop;

  return (
    <div id="dropdownMenu">
      <div id="ddmenu">
        <h2 id="menuTitle">Recipe Library</h2>
        <h2 id="menuMenu">MENU</h2>
      </div>
      <div id="menuSection">
        <p>Search</p>
        <div>
          <input id="menuSearch" type="text" placeholder="Search for a recipe"/>
          <div id="searchIconButton">
            <Icon icon="bx:search-alt" />
          </div>
        </div>
        <Link to="/" className="link" onClick={() => setMenuOpen(false)}><button id="menuFrontButton">Frontpage</button></Link>
        <Link to="/login" className="link" onClick={() => setMenuOpen(false)}><button id="menuLoginButton">Log In</button></Link>
      </div>
      <div id="menuFooter">
        <small>Copyright &copy; 2022 RECLIB. All Right Reserved</small>
      </div>
    </div>
    
  )
}
