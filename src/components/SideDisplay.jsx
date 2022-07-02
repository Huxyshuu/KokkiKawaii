import React from 'react';
import '../styles/SideDisplay.css';

export default function SideDisplay(prop) {

    const recipes = [
        {
            picture: 'https://i.imgur.com/H1y0hft.png',
            title: 'Köyhät Ritarit',
            category: 'aamupala'
        },
        {
            picture: 'https://i.imgur.com/IEDzzSw.png',
            title: 'Vol-Au-Vent',
            category: 'herkut'
        }
    ]
    
    const listOfMatches = recipes.filter((item, index) => {
        if (item.category === prop.category) {
            return item;
        }
        return undefined;
    })

    const {picture, title, category} = listOfMatches[0];


  return (
    <div id="sideDish">
        <h3 className="sectionTitle" id="sideCategory">{category.toUpperCase()}</h3>
        <img id="sideImage" src={picture} alt={title} />
        <h3 id="sideTitle">{title.toUpperCase()}</h3>
    </div>
  )
}
