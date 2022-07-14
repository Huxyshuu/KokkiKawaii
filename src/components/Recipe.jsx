import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import '../styles/Recipe.css';
import Rating from '../components/Rating';
import axios from 'axios';

export default function Recipe(prop) {

  const { loggedIn, backendURL } = prop;
  let { id } = useParams();
  const [state, setState] = useState({
    isLoading: true,
    data: []
  });

  useEffect(() => {
    axios.get(backendURL)
    .then(response => {
      if (response.data.length > 0) {
        setState(prevState => ({
          ...prevState,
          isLoading: false,
          data: response.data
        }));
      } else {
        setState(prevState => ({
          ...prevState,
          isLoading: false,
          data: []
        }));
      }
    })
    .catch(err => {
      console.error(err.message)
    })
  },[backendURL])

  
  const Recipe = state.data.find(recipe => recipe['_id'] === id);


  
  let splitInstructions = [];
  if (Recipe) {
    splitInstructions = Recipe.instructions.split("\n\n")
  }

  if (state.isLoading) {
    return (
      <div id="loadingRecipe">
        <h2>REC<span className='highlightColor'>LIB</span></h2>
        <h3>Resepti latautuu</h3>
        <h3 id="loadingRecipeThanks">odota hetki...</h3>
        <div id="loadingSpinner"></div>
      </div>
    )
  } else {
    if (Recipe) {
      return (
        <div id="recipePage">
          <div id="recipeHero" style={{backgroundImage: `url(${Recipe.picture})`}}>
            { loggedIn && <button id="recipeEditButton">MUOKKAA</button>}
            <h3 id="recipeTitle" >{Recipe.title.toUpperCase()}</h3>
            <div id="recipeShade"></div>
            <div id="recipeRating">
              <Rating rating={Recipe.rating} stylingForm={'RecipePage'}/> 
            </div>
          </div>
    
          <div id="servingDiv">
            <h3 className="recipeSectionTitles">AINESOSAT</h3>
            <p className="recipeUnderTitle">{Recipe.servings} annosta</p>
          </div>
    
          <div>
            {
              Recipe.ingredients.map((ingredient, index) => {
                const splitIng  = ingredient.split(": ");
                return <div className="recipeIngredients" key={`ingredient_` + index}>
                  <p>{splitIng[1]}</p>
                  <p>{splitIng[0]}</p>
                </div>
              })
            }
          </div>
    
          <div>
            <h3 className="recipeSectionTitles">OHJEET</h3>
            {
              Recipe.time > 60 ? <p className="recipeUnderTitle">{ Math.floor(Recipe.time / 60) }t {Recipe.time - Math.floor(Recipe.time / 60) * 60} min</p> 
              : <p className="recipeUnderTitle">{Recipe.time} min</p>
            }
          </div>
    
          <div id="recipeInstructionSection">
            {
              splitInstructions.map((instruction, index) => {
                return <p className="recipeInstruction" key={`instruction_` + index}>{instruction}</p>
              })
            }
          </div>
  
          {
            Recipe.notes && 
            <>
              <div>
                <h3 className="recipeSectionTitles">LISÄTIEDOT</h3>
              </div>
              
              <div id="recipeInstructionSection">
                <p id="recipeNotes">{Recipe.notes}</p>
              </div>
            </>
            
          }
    
          
    
          {/* <div id="recipeFooter">
            <h3>Hyviä ruokahetkiä!</h3>
          </div> */}
        </div>
      )
    } else {
      return (
        <div id="invalidRecipe">
          <h2>REC<span className='highlightColor'>LIB</span></h2>
          <h3>Reseptiä ei löytynyt!</h3>
          <h3 id="invalidRecipeThanks">404</h3>
          <img id="invalidRecipeImage" src={require('../images/invalidRecipe.png')} alt="Exclamation mark"/>
        </div>
      )
    }
  }
}
