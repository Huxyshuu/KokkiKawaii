import React, { useState, useEffect } from 'react';
import '../styles/MainPage.css';
// import CategoryButtons from '../components/CategoryButtons';
import RecipeDisplay from '../components/RecipeDisplay';
import SideDisplay from '../components/SideDisplay';
import Rating from '../components/Rating';
import Searchbar from '../components/Searchbar';
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import axios from 'axios';

export default function MainPage(prop) {

  const [state, setState] = useState({
    isLoading: true,
    data: []
  });

  const [showAll, setShowAll] = useState(false);

  const navigate = useNavigate();
  const { backendURL } = prop;

  useEffect(() => {
    axios.get(backendURL, {
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    })
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
      console.error(err)
    })
  }, [backendURL])

  return (
    <div id="mainPage">
      <div id="hero">
        <h1>KokkiKawaii</h1>
        <div id="heroCover"></div>
      </div>

      <Searchbar data={state.data}/>

      <div className="section">
        <h3 className="sectionTitle">UUSIN RESEPTI</h3>
        <div id="latestRecipe">
          <RecipeDisplay recipes={state.data} isLoading={state.isLoading} />
        </div>
      </div>

      {/* <div className="section">
        <h3 className="sectionTitle">KATEGORIAT</h3>
        <div id="categoryButtons">
          <CategoryButtons />
        </div>
      </div> */}

      {
        showAll ? 
        <div className="section">
          <h3 className="sectionTitle">KAIKKI RESEPTIT</h3>
          {/* <div id="showAllSection">
          {
            state.data.map((e, index) => {
              return (
              <div className="recipeBox" 
              style={{backgroundImage: `url(${e.picture})`}} 
              key={"recipe_" + index} 
              onClick={() => {navigate('/recipes/' + e._id);}}></div>
              )
            })
          }
          </div> */}

          <div id="showAllSectionRow">
          {
            state.data.map((e, index) => {
              return (
              <div id="allRecipesContainer" key={"recipe_" + index} onClick={() => {navigate('/recipes/' + e._id)}}>
                <div className="mainAllRecipeBox" 
                style={{backgroundImage: `url(${e.picture})`}}>
                </div>
                <div id="allRecipeInfo">
                  <h3>{e.title}</h3>
                  <div id="allRecipeStats">
                    <Rating rating={e.rating} stylingForm={"allRecipes"} id="allStars"/>
                    <div id="allRecipesTime">
                      <Icon icon="ci:clock" className="iconClock" id="allRecipesClock"/>
                      {
                        e.time > 60 ? <p>{ Math.floor(e.time / 60) }t {e.time - Math.floor(e.time / 60) * 60} min</p> 
                        : <p>{e.time} min</p>
                      }
                    </div>
                  </div>
                </div>
              </div>
              )
            })
          }
          </div>
        </div>
        
        :
        <>
          <div className="section">
            <h3 className="sectionTitle">MUUT</h3>
              <div id="sideDisplay" >
                <SideDisplay recipes={state.data} isLoading={state.isLoading}/>
              </div>
          </div>
          <div id="mainSeeMore">
            <button id="seeMoreButton" onClick={() => setShowAll(true)}>KATSO LISÄÄ</button>
          </div>
        </>
      }

    </div>
  )
}
