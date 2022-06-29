import React from 'react';
import '../styles/RecipeDisplay.css';
import Rating from '../components/Rating';
import { Icon } from '@iconify/react';

export default function RecipeDisplay() {

  const recipes = [
    {
      image: 'https://i.imgur.com/60NlJft.jpeg',
      name: 'Pasta Carbonara',
      rating: 4,
      cookTimeMinutes: 30
    }
  ]
  const { image, name, rating, cookTimeMinutes } = recipes[0];

  return (
    <div>
        <img id="latestPic" src={image} alt="Carbonara" />
        <div id="latestDisplayInfo">
            <h3 id="latestName">{name.toUpperCase()}</h3>
            <Rating rating={rating}/>
        </div>
        <div id="latestCookTime">
          <Icon icon="ci:clock" />
          {
            cookTimeMinutes > 60 ? <p>1 hr {cookTimeMinutes} min</p> 
            : <p>{cookTimeMinutes} min</p>
          }
        </div>
    </div>
  )
}
