import React from 'react';
import '../styles/MainPage.css';
import CategoryButtons from '../components/CategoryButtons';

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

      <div id="latestSection">
              
      </div>

      <div id="categorySection">
        <h3>CATEGORIES</h3>
        <div id="categoryButtons">
          <CategoryButtons />
        </div>
      </div>


    </div>
  )
}
