import React from 'react';
import '../styles/RecipeDisplay.css';
import Rating from '../components/Rating';
import { Icon } from '@iconify/react';

export default function RecipeDisplay() {

  const recipes = [
    {
      picture: 'https://i.imgur.com/60NlJft.jpeg',
      title: 'Pasta Carbonara',
      rating: 4,
      time: 30
    }
  ]
  const { picture, title, rating, time } = recipes[0];

  return (
    <div>
        <img id="latestPic" src={picture} alt={title} />
        <div id="latestDisplayInfo">
            <h3 id="latestName">{title.toUpperCase()}</h3>
            <Rating rating={rating}/>
        </div>
        <div id="latestCookTime">
          <Icon icon="ci:clock" />
          {
            time > 60 ? <p>1 hr {time} min</p> 
            : <p>{time} min</p>
          }
        </div>
    </div>
  )
}
