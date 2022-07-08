import React from 'react';
import '../styles/SideDisplay.css';
import { useNavigate } from "react-router-dom";

export default function SideDisplay(prop) {

    const { recipes, isLoading, order } = prop;
  
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <>
                <div id="sideDish">
                    <div id="loadingSide"></div>
                    <h3 id="loadingSideTitle">Loading...</h3>
                </div>
                <div id="sideDish">
                    <div id="loadingSide"></div>
                    <h3 id="loadingSideTitle">Loading...</h3>
                </div>
            </>
        )
    } else {

        const pickRandomRecipe = () => {
            return recipes[Math.floor(Math.random() * (recipes.length - 1))];
        }

        let first = pickRandomRecipe();
        let second;
        do {
            second = pickRandomRecipe();
        } while (first._id === second._id);
        
        

        return (
            <>
                <div id="sideDish" onClick={() => navigate('/recipes/' + first._id,{ replace: true})}>
                    <img id="sideImage" src={first.picture} alt={first.title} />
                    <h3 id="sideTitle">{first.title.toUpperCase()}</h3>
                </div>
                <div id="sideDish" onClick={() => navigate('/recipes/' + second._id,{ replace: true})}>
                    <img id="sideImage" src={second.picture} alt={second.title} />
                    <h3 id="sideTitle">{second.title.toUpperCase()}</h3>
                </div>
            </>
        )
    }
}
