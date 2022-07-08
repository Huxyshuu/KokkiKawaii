import React from 'react';
import '../styles/SideDisplay.css';
import { useNavigate } from "react-router-dom";

export default function SideDisplay(prop) {

    const { recipes, isLoading } = prop;
  
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div id="sideDish">
                <div id="loadingSide"></div>
                <h3 id="loadingSideTitle">Loading...</h3>
            </div>
        )
    } else {

        const { picture, title, _id } = recipes[recipes.length - 1];

        return (
            <div id="sideDish" onClick={() => navigate('/recipes/' + _id,{ replace: true})}>
                <img id="sideImage" src={picture} alt={title} />
                <h3 id="sideTitle">{title.toUpperCase()}</h3>
            </div>
        )
    }
}
