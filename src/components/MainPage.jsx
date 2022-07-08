import React, { useState, useEffect } from 'react';
import '../styles/MainPage.css';
// import CategoryButtons from '../components/CategoryButtons';
import RecipeDisplay from '../components/RecipeDisplay';
import SideDisplay from '../components/SideDisplay';
import { useNavigate } from "react-router-dom";
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
        <h1>Recipe Library</h1>
        <div id="heroCover"></div>
      </div>

      <form action="#" id="mainForm">
        <input id="mainFormInput" type="text" placeholder="Etsi reseptiä nimellä" />
        <input id="mainFormSubmit" type="submit" value="HAE"/>
      </form>

      <div className="section">
        <h3 className="sectionTitle">UUSIN RESEPTI</h3>
        <div id="latestRecipe">
          <RecipeDisplay recipes={state.data} isLoading={state.isLoading} />
        </div>
      </div>

      <div className="section">
        <h3 className="sectionTitle">MUUT</h3>
          <div id="sideDisplay" >
            <SideDisplay recipes={state.data} isLoading={state.isLoading}/>
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
            <div id="showAllSection">
            {
              state.data.map((e, index) => {
                return <div className="recipeBox" style={{backgroundImage: `url(${e.picture})`}} key={"recipe_" + index} onClick={() => {navigate('/recipes/' + e._id);}}></div>
              })
            }
          </div>
        </div>
        
        :
        <>
          <div id="mainSeeMore">
            <button id="seeMoreButton" onClick={() => setShowAll(true)}>KATSO LISÄÄ</button>
          </div>
        </>
      }

    </div>
  )
}
