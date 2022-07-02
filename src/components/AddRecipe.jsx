import React, { useState } from 'react';
import '../styles/AddRecipe.css';

export default function AddRecipe() {

  const [ingredients, setIngredients] = useState([
    <div className="ingredients">
      <input id="ingAmount" type="text" placeholder="Määrä"/>
      <input id="ingName" type="text" placeholder="Ainesosa"/>
    </div>
  ]);

  const [instructions, setInstructions] = useState([
    <div className="instructions">
      <textarea name="" id="" cols="30" rows="5"></textarea>
    </div>
  ]);

  const handleSubmit = e => {
    e.preventDefault();
  }

  const categories = [
    "Aamupala",
    "Päivällinen",
    "Liha",
    "Herkku",
    "Jälkiruoka",
    "Pasta",
    "Iltapala",
    "Terveellinen",
    "Tulinen",
    "Leivonnainen",
    "Suolainen",
    "Pitsa",
    "Salaatti",
  ];

  // Display the image added to form
  const displayImage = e => {
    const [file] = document.getElementById('recipeSubmitImage').files
    const displayImage = document.getElementById('submitDisplayImage');
    if (file) {
      displayImage.style.display = 'block';
      displayImage.src = URL.createObjectURL(file);
      displayImage.alt = file.name;
    }
  }

  const addIngredient = () => {
    setIngredients(prev => [...prev, 
    <div className="ingredients">
      <input id="ingAmount" type="text" placeholder="Määrä"/>
      <input id="ingName" type="text" placeholder="Ainesosa"/>
    </div>
  ])
  }

  const addInstructions = () => {
    setInstructions(prev => [...prev, 
      <div className="instructions">
        <textarea name="" id="" cols="30" rows="5"></textarea>
      </div>
  ])
  }

  return (
    <div id="addRecipe">
      <div id="addRecipeTitle">
        <h3 className="header">Lisää uusi resepti</h3>
        <p>Syötä tarvittavat tiedot alle</p>
      </div>
      <form action="" onSubmit={handleSubmit} id="recipeForm">
        <h3 className="header">Kuva / Nimi / Arvosana</h3>

        <div>
          <p>Kuva*</p>
          <label htmlFor="recipeSubmitImage" id="labelSubmitImage">Valitse kuva</label>
          <img src="#" alt="" id="submitDisplayImage"/>
          <input accept="image/*" type="file" id="recipeSubmitImage" onChange={displayImage}/>
        </div>

        <div>
          <p>Nimi*</p>
          <input id="submitRecipeName" type="text" placeholder="Reseptin nimi"/>
        </div>

        <div>
          <p>Arvosana*</p>
          <input id="submitRecipeRating" 
          type="range"
          max="5"
          step="1"/>
        </div>


        <h3 className="header">Ainesosat / Annokset</h3>

        <div>
          <p>Annosten määrä*</p>
          <input type="number" placeholder="Syötä numero"/>
        </div>

        <div>
          <p>Ainesosat*</p>
          {
            ingredients.map((e) => {
              return e
            })
          }
          <input id="addIngButton" type="button" onClick={addIngredient} value="Lisää ainesosa"/>
        </div>


        <h3 className="header">Ohjeet / Aika / Lisätiedot</h3>

        <div>
          <p>Aika-arvio*</p>
          <input type="number" placeholder="Syötä numero"/>
        </div>

        <div>
          <p>Ohjeet*</p>
          {
            instructions.map((e) => {
              return e
            })
          }
          <input id="addIngButton" type="button" onClick={addInstructions} value="Lisää ohje"/>
        </div>

        <div id="extraInfo">
          <p>Lisätietoja</p>
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>

        {/* <div>
          {
            categories.map((category, index) => {
              return <div>
                <label htmlFor={'cats_' + index} className="cats">{category}</label>
                <input id={'cats_' + index} type="checkbox" value={category} key={index}/>
              </div>
            })
          }
        </div> */}

        <div id="arsb">
          <input type="submit" value="Lisää uusi resepti" id="addRecipeSubmit"/>
        </div>
      </form>
    </div>
  )
}
