import React from 'react';
import '../styles/MobileMenu.css';

export default function MobileMenu() {
  return (
    <div id="dropdownMenu">
      <div id="ddmenu">
        <h2 id="menuTitle">Recipe Library</h2>
        <h2 id="menuMenu">Menu</h2>
      </div>
      <div id="menuSection">
        <p>Search</p>
        <div>
          <input type="text" placeholder="Search for a recipe"/>
          <div>
            >
          </div>
        </div>
        <button>Log In</button>
      </div>
      <div>
        <small>Copyright &copy; 2022 RECLIB. All Right Reserved</small>
      </div>
    </div>
  )
}
