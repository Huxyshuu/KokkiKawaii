import React from 'react';
import '../styles/MainPage.css';
import CategoryButtons from '../components/CategoryButtons';
import RecipeDisplay from '../components/RecipeDisplay';

export default function MainPage() {
  return (
    <div id="mainPage">
      <div id="hero">
        <h1>Recipe Library</h1>
        <div id="heroCover"></div>
      </div>

      <form action="#" id="mainForm">
        <input id="mainFormInput" type="text" placeholder="Search for a recipe" />
        <input id="mainFormSubmit" type="submit" value="SEARCH"/>
      </form>

      <div className="section">
        <h3 className="sectionTitle">LATEST RECIPE</h3>
        <div id="latestRecipe">
          <RecipeDisplay />
        </div>
      </div>

      {/* <div className="section">
        <h3 className="sectionTitle">CATEGORIES</h3>
        <div id="categoryButtons">
          <CategoryButtons />
        </div>
      </div> */}


    </div>
  )
}
