import React from 'react'
import '../styles/MobileNavBar.css';
import { Icon } from '@iconify/react';
import { Link, useLocation } from "react-router-dom";
import { animateScroll as Scroll } from 'react-scroll';

export default function MobileNavBar(prop) {
    
  const { menuOpen, setMenuOpen } = prop;
  let location = useLocation();

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
        }}><h2 id="mobileMenuLogo">K<span className="highlightColor">K</span></h2></Link>
        {!menuOpen ? 
            <Icon icon="ci:menu-alt-01" className="dark mobileMenuButton"  id="openMenuButton" onClick={() => setMenuOpen(true)}/> 
        :   <Icon icon="bi:x-lg" className="dark mobileMenuButton" id="closeMenuButton" onClick={() => setMenuOpen(false)}/>
        }
    </div>
  )
}
