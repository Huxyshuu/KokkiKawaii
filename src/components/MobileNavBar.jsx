import React from 'react'
import '../styles/MobileNavBar.css';
import { Icon } from '@iconify/react';

export default function MobileNavBar(prop) {

    
  const { menuOpen, setMenuOpen } = prop;

  return (
    <div id="mobileNav">
        <h2 id="mobileMenuLogo">REC<span className="highlightColor">LIB</span></h2>
        {!menuOpen ? 
            <Icon icon="ci:menu-alt-01" className="dark mobileMenuButton"  id="openMenuButton" onClick={() => setMenuOpen(true)}/> 
        :   <Icon icon="bi:x-lg" className="dark mobileMenuButton" id="closeMenuButton" onClick={() => setMenuOpen(false)}/>
        }
    </div>
  )
}
