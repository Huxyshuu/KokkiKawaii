import React, { useState, useEffect } from 'react'
import '../styles/AddRating.css'
import { Icon } from '@iconify/react';

export default function AddRating(props) {

    // <Icon icon="codicon:star-full"/>
    // <Icon icon="codicon:star-empty"/>

    const [ currentValue, setCurrentValue ] = useState([0,0,0,0,0]);
    const [ hoverValue, setHoverValue ] = useState(undefined);

    const { setStarRating, value } = props;


    const starArray = value => {
        let starArray = [];
        for (var i = 0; i < value; i++) {
            starArray.push(1);
        }
        while (starArray.length < 5) {
            starArray.push(0);
        }
        return starArray;
    }

    const starDisplayer = (star, index) => {
        if (star === 1) {
            return (
                <Icon icon="codicon:star-full" onClick={() => handleClick(index + 1)} onMouseOver={() => handleMouseOver(index + 1)} onMouseLeave={() => handleMouseLeave()} key={"addStar_" + index}/>
            )
        } else {
            return (
                <Icon icon="codicon:star-empty" onClick={() => handleClick(index + 1)} onMouseOver={() => handleMouseOver(index + 1)} onMouseLeave={() => handleMouseLeave()} key={"addStar_" + index}/>
            )
        }
    }

    useEffect(() => {
        if (value) {
            setCurrentValue(starArray(value));
            setStarRating(value);
        } else {
            setCurrentValue(starArray(1));
            setStarRating(1);
        }
    }, [value, setStarRating])

    const handleClick = value => {
        setCurrentValue(starArray(value));
        setStarRating(value);
    };

    const handleMouseOver = value => {
        setHoverValue(starArray(value));
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined);
    };
  
    return (
        <div id="addRecipeStar">
            {
            hoverValue ?
            hoverValue.map((star, index) => {
                return starDisplayer(star, index);
            })
            :
            currentValue.map((star, index) => {
                return starDisplayer(star, index);
            })
            }
        </div>
  )
}
