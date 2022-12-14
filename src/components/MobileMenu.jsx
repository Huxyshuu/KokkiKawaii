import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import '../styles/MobileMenu.css';


export default function MobileMenu(prop) {

  const { setMenuOpen } = prop;
  const { loggedIn, setLoggedIn } = prop;

  const logOut = () => {
    setLoggedIn(false)
    localStorage.removeItem('reclib_user');
  }
  useEffect(() => {
    const user = localStorage.getItem('reclib_user');
        if (user) {
            setLoggedIn(true);
        }
  }, [setLoggedIn])

  return (
    <div id="dropdownMenu">
      <div>
        <div id="ddmenu">
          <h2 id="menuTitle">Cozy Cookery</h2>
          <h2 id="menuMenu">MENU</h2>
        </div>
        <div id="menuSection">
          <div className="menuButtons">
            <Link to="/" className="link" onClick={() => setMenuOpen(false)}><button id="menuFrontButton">Etusivu</button></Link>
            {loggedIn && <Link to="/overview" className="link" onClick={() => setMenuOpen(false)}><button id="menuOverviewButton">Hallinta</button></Link>}
            <Link to={loggedIn ? '/' : '/login'} className="link" onClick={() => {setMenuOpen(false); if(loggedIn){logOut()}}}><button id="menuLoginButton">{loggedIn ? 'Kirjaudu ulos' : 'Kirjaudu'}</button></Link>
          </div>
        </div>
        
        {/* <div id="menuImage"></div> */}
      </div>
      <div id="menuFooter">
        <small>Copyright &copy; 2022 Cozy Cookery. All Right Reserved</small>
      </div>
    </div>
    
  )
}
