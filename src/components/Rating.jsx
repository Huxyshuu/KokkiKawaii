import React from 'react'
import { Icon } from '@iconify/react';
import '../styles/Rating.css';

export default function Rating(prop) {

    let { rating, stylingForm } = prop;

    if (rating > 5) {
        rating = 5;
    }
    if (rating < 1) {
        rating = 1;
    }

    let style = {};

    if (stylingForm === 'RecipePage') {
        style = {
            color: 'white'
        }
    }


    const countStars = (rating) => {
        const starArray = [];
        for (var i = 0; i < rating; i++) {
            starArray.push(<Icon icon="codicon:star-full" style={style} key={"recipe_star_rating_" + i}/>);
        }
        while (starArray.length < 5) {
            starArray.push(<Icon icon="codicon:star-empty" style={style} key={"recipe_star_rating_" + starArray.length}/>);
        }
        return starArray;
    }

  return (
    <div id="displayRatingStars">
        {
            countStars(rating)
        }
    </div>
  )
}
