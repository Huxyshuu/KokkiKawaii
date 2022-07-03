import React from 'react';
import '../styles/MainPage.css';
// import CategoryButtons from '../components/CategoryButtons';
import RecipeDisplay from '../components/RecipeDisplay';
import SideDisplay from '../components/SideDisplay';

export default function MainPage() {
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
          <RecipeDisplay />
        </div>
      </div>
        
      <div id="sideDisplay" >
        <SideDisplay category={'aamupala'}/>
        <SideDisplay category={'herkut'}/>
      </div>

      {/* <div className="section">
        <h3 className="sectionTitle">KATEGORIAT</h3>
        <div id="categoryButtons">
          <CategoryButtons />
        </div>
      </div> */}

      <div id="mainSeeMore">
        <button id="seeMoreButton">KATSO LISÄÄ</button>
      </div>

    </div>
  )
}
