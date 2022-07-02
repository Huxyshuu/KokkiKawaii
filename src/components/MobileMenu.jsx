import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";
import '../styles/MobileMenu.css';


export default function MobileMenu(prop) {

  const { setMenuOpen } = prop;
  const { loggedIn, setLoggedIn } = prop;

  return (
    <div id="dropdownMenu">
      <div id="ddmenu">
        <h2 id="menuTitle">Recipe Library</h2>
        <h2 id="menuMenu">MENU</h2>
      </div>
      <div id="menuSection">
        <p>Haku</p>
        <div>
          <input id="menuSearch" type="text" placeholder="Etsi reseptiä nimellä"/>
          <div id="searchIconButton">
            <Icon icon="bx:search-alt" />
          </div>
        </div>

        <div className="menuButtons">
          <Link to="/" className="link" onClick={() => setMenuOpen(false)}><button id="menuFrontButton">Etusivu</button></Link>
          {loggedIn && <Link to="/overview" className="link" onClick={() => setMenuOpen(false)}><button id="menuOverviewButton">Hallinta</button></Link>}
          <Link to={loggedIn ? '/' : '/login'} className="link" onClick={() => {setMenuOpen(false); if(loggedIn){setLoggedIn(false)}}}><button id="menuLoginButton">{loggedIn ? 'Kirjaudu ulos' : 'Kirjaudu'}</button></Link>
        </div>
        
      </div>
      <div id="menuFooter">
        <small>Copyright &copy; 2022 RECLIB. All Right Reserved</small>
      </div>
    </div>
    
  )
}
