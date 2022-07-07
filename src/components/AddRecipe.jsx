import React, { useState } from 'react';
import '../styles/AddRecipe.css';
import axios from 'axios';

export default function AddRecipe() {

  const [ingredients, setIngredients] = useState([
    <div className="ingredients">
      <input id="ingredientAmount" type="text" placeholder="Määrä"/>
      <input id="ingredientName" type="text" placeholder="Ainesosa"/>
    </div>
  ]);
  

  // const categories = [
  //   "Aamupala",
  //   "Päivällinen",
  //   "Liha",
  //   "Herkku",
  //   "Jälkiruoka",
  //   "Pasta",
  //   "Iltapala",
  //   "Terveellinen",
  //   "Tulinen",
  //   "Leivonnainen",
  //   "Suolainen",
  //   "Pitsa",
  //   "Salaatti",
  // ];



  // Display the image added to form
  const displayImage = e => {
    const [file] = document.getElementById('recipeSubmitImage').files
    const displayImage = document.getElementById('submitDisplayImage');
    if (file && file.size / 1024 > 2000) {
      displayImage.style.display = 'hidden';
      displayImage.src = '';
      displayImage.alt = '';
      console.log('File too big')
    } else if (file) {
      displayImage.style.display = 'block';
      displayImage.src = URL.createObjectURL(file);
      displayImage.alt = file.name;
    }
  }

  const convertImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      //set the callbacks before reading the object
      reader.onload = () => resolve(reader.result); 
      reader.onerror = error => reject(error);

      reader.readAsDataURL(file);
    }).then(value => {
      return value;
    }).catch(e => {
      console.log(e.message);
    })
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target

    const ingredientsList = [];
    let amount = '';
    let ingredient = '';
    let time = '';
    let instructions = '';
    let extra = '';
    let image = '';

    const [file] = document.getElementById('recipeSubmitImage').files
    
    if (file.size / 1024 > 2000) {
      //OVER 2000kiB
      return;
    }  else {
      image = await convertImage(file);
    }

    
    for (var i of form) {
      if (i.id === 'ingredientAmount') {
        amount = i.value;
      }
      if (i.id === 'ingredientName') {
        ingredient = i.value;
        ingredientsList.push(`${ingredient}: ${amount}`);
      }
      if (i.id === 'timeEst') {
        time = i.value;
      }
      if (i.id === 'addRecipeInstructions') {
        instructions = i.value;
      }
      if (i.id === 'addRecipeInfo') {
        extra = i.value;
      }
    }

    const recipe = {
      picture: image,
      title: form[1].value,
      rating: form[2].value,
      servings: form[3].value,
      ingredients: ingredientsList,
      time: time,
      instructions: instructions,
      notes: extra,     
    }

    // console.log(recipe);

    axios.post('https://reclib-backend.vercel.app/recipes/add', recipe)
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.error(err.message)
        console.error(err.response.data);
      })

    // axios.get('https://reclib-backend.vercel.app/recipes/')
    //   .then(response => {
    //     if (response.data.length > 0) {
    //       console.log(response);
    //     }
    //   })
    //   .catch(err => {
    //     console.error(err.message)
    //   })
  }

  const addIngredient = () => {
    setIngredients(prev => [...prev, 
    <div className="ingredients">
      <input id="ingredientAmount" type="text" placeholder="Määrä"/>
      <input id="ingredientName" type="text" placeholder="Ainesosa"/>
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
          <p id="addRecipePic">Kuva*</p>
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
          <input id="timeEst" type="number" placeholder="Syötä numero"/>
        </div>

        <div>
          <p>Ohjeet*</p>
          <div className="instructions">
            <textarea id="addRecipeInstructions" name="" cols="30" rows="10"></textarea>
          </div>
        </div>

        <div id="extraInfo">
          <p>Lisätietoja</p>
          <textarea id="addRecipeInfo" name="" cols="30" rows="5"></textarea>
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
