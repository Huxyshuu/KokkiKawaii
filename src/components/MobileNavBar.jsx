import React from 'react'
import '../styles/MobileNavBar.css';
import { Icon } from '@iconify/react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { animateScroll as Scroll } from 'react-scroll';

export default function MobileNavBar(prop) {
    
  const { menuOpen, setMenuOpen, isSmall, setLoggedIn, loggedIn } = prop;
  let location = useLocation();
  let navigate = useNavigate();

  const logOut = () => {
    setLoggedIn(false)
    localStorage.removeItem('reclib_user');
    navigate('/login')
  }

  return (
    <div id="mobileNav">
        <Link to="/" className="links" onClick={() => {
          setMenuOpen(false);
          if (location.pathname === "/") {
            Scroll.scrollToTop({
              duration: 500,
              smooth: true
            });
          }
        }}><h2 id="mobileMenuLogo">C<span className="highlightColor">C</span></h2></Link>
        {
          isSmall ? 
          <>
          {!menuOpen ? 
            <Icon icon="ci:menu-alt-01" className="dark mobileMenuButton"  id="openMenuButton" onClick={() => setMenuOpen(true)}/> 
          :   <Icon icon="bi:x-lg" className="dark mobileMenuButton" id="closeMenuButton" onClick={() => setMenuOpen(false)}/>
          }
          </>
          :
          <div id="bigMenuButtons">
            {
              loggedIn ? 
              <>
              <div onClick={() => {navigate('/addrecipe')}}>
                <button>Lisää</button>
                <Icon className="bigMenuIcon" icon="bx:message-square-add" />
              </div>
              <div onClick={() => {navigate('/overview')}}>
                <button>Hallinta</button>
                <Icon className="bigMenuIcon" icon="akar-icons:settings-horizontal" />
              </div>
              <div onClick={() => {logOut()}}>
                <button>Kirjaudu ulos</button>
                <Icon className="bigMenuIcon" icon="bx:log-out-circle" />
              </div>
              </>
              :
              <>
              <div onClick={() => {navigate('/login')}}>
                <button>Kirjaudu</button>
                <Icon className="bigMenuIcon" icon="bx:log-in-circle" />
              </div>
              </>
            }
          </div>
        }
    </div>
  )
}
