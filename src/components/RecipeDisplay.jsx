import React from 'react';
import '../styles/RecipeDisplay.css';
import Rating from '../components/Rating';
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";

export default function RecipeDisplay(prop) {

  const { recipes, isLoading } = prop;
  
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div id="loadingDiv">
          <div id="loadingPic"></div>
          <div id="loadingDisplayInfo">
              <h3>Loading... ...</h3>
              <h3>Rating... ...</h3>
          </div>
          <div id="loadingCookTime">
            <p>? min</p>
          </div>
      </div>
    )
  } else {

    const { picture, title, rating, time, _id } = recipes[recipes.length - 1];

    return (
      <div>
          <img id="latestPic" src={picture} alt={title} onClick={() => navigate('/recipes/' + _id,{ replace: true})}/>
          <div id="latestDisplayInfo">
              <h3 id="latestName" onClick={() => navigate('/recipes/' + _id,{ replace: true})}>{title.toUpperCase()}</h3>
              <Rating rating={rating}/>
          </div>
          <div id="latestCookTime">
            <Icon icon="ci:clock" className="iconClock"/>
            {
              time > 60 ? <p> { Math.floor(time / 60) }t {time - Math.floor(time / 60) * 60} min</p> 
              : <p>{time} min</p>
            }
          </div>
      </div>
    )
  }
}
