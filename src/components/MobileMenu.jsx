import React from 'react';
import { Icon } from '@iconify/react';
import '../styles/MobileMenu.css';

export default function MobileMenu() {
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
        <button>Log In</button>
      </div>
      <div id="menuFooter">
        <small>Copyright &copy; 2022 RECLIB. All Right Reserved</small>
      </div>
    </div>
  )
}
