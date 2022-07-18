import React, { useState, useEffect } from 'react';
import '../styles/AddRecipe.css';
import axios from 'axios';
import FormData from 'form-data';
import { useNavigate } from "react-router-dom";
import AddRating from './AddRating';

export default function AddRecipe(prop) {

  const [ingredients, setIngredients] = useState([
    <div className="ingredients" key="ingredient_0">
      <div id="ingredientDiv">
        <input id="ingredientAmount" type="text" placeholder="Määrä" required/>
        <input id="ingredientName" type="text" placeholder="Ainesosa" required/>
      </div>
      <input id="ingredientDelete" type="button" value=" "/>
    </div>
  ]);

  const navigate = useNavigate();
  const [ recipeSent, setRecipeSent ] = useState(false);
  const [ recipeSuccess, setRecipeSuccess ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const [ starRating, setStarRating ] = useState(1);

  const { backendURL } = prop;
  

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

  const displayImage = e => {
    const [file] = document.getElementById('recipeSubmitImage').files
    const displayImage = document.getElementById('submitDisplayImage');
    const displayImageName = document.getElementById('imageNameDisplay');
    if (file) {
      displayImage.style.display = 'block';
      displayImage.src = URL.createObjectURL(file);
      displayImage.alt = file.name;
      displayImageName.innerHTML = file.name;
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const form = e.target

    const ingredientsList = [];
    let amount = '';
    let ingredient = '';
    let time = '';
    let instructions = '';
    let extra = '';
    let image = '';
    
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

    const uploadImage = async () => {
      const [file] = document.getElementById('recipeSubmitImage').files
      const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "reclibimages");

        await axios.post("https://api.cloudinary.com/v1_1/hugotamm/upload", formData)
        .then(response => {
          image = response.data.secure_url;
        })
        .catch(error => console.log(error));
    }

    await uploadImage();

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
  
    axios.post(backendURL + 'add', recipe)
      .then(response => {
        setLoading(false);
        setRecipeSent(true);
        setRecipeSuccess(true);
        setTimeout(() => {
          navigate('/overview', { replace: true});
        }, 4000)
      })
      .catch(err => {
        console.error(err);
        setRecipeSent(true);
        setRecipeSuccess(false);
        setTimeout(() => {
          setRecipeSent(false);
        }, 8000)
      })
  }

  const addIngredient = () => {
    const key = Date.now();
    setIngredients(prev => [...prev, 
      <div className="ingredients" key={"ingredient_" + key}>
        <div id="ingredientDiv">
          <input id="ingredientAmount" type="text" placeholder="Määrä" required/>
          <input id="ingredientName" type="text" placeholder="Ainesosa" required/>
        </div>
        <input id="ingredientDelete" type="button" onClick={() => {deleteIngredient("ingredient_" + key)}} value="X"/>
      </div>
    ])
  }

  const deleteIngredient = (key) => {
    setIngredients(ings => ings.filter(ing => ing.key !== key));
  }

  useEffect(() => {
  }, [ingredients])

  if (!recipeSent) {
    if (loading) {
      return (
        <div id="addRecipeLoader">
          <div id="addRecipeLoadingSpinner">
          </div> 
          <h3>Julkaistaan reseptiä...</h3>
        </div>
      )
    } else {
      return (
        <div id="addRecipe">
          <div id="addRecipeTitle">
            <h3 className="header">Lisää uusi resepti</h3>
            <p>Syötä tarvittavat tiedot alle</p>
          </div>
          <form action="" onSubmit={handleSubmit} id="recipeForm">
            <div id="addRecipeLeftRight">
              <div id="addRecipeLeft">
                <h3 className="header">Kuva / Nimi / Arvosana</h3>
      
                <div>
                  <p id="addRecipePic">Kuva*</p>
                  <label htmlFor="recipeSubmitImage" id="labelSubmitImage">Valitse kuva</label>
                  <input accept="image/*" type="file" id="recipeSubmitImage" onChange={displayImage}/>
                  <p id="imageNameDisplay"></p>
                  <img src="#" alt="" id="submitDisplayImage"/>
                </div>
        
                <div>
                  <p>Nimi*</p>
                  <input id="submitRecipeName" type="text" placeholder="Reseptin nimi" minLength="3" required/>
                </div>
        
                <div>
                  <p>Arvosana*</p>
                  <AddRating setStarRating={setStarRating}/>
                  <input id="submitRecipeRating" 
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={starRating}
                  readOnly
                  required/>
                </div>
        
        
                <h3 className="header">Ainesosat / Annokset</h3>
        
                <div>
                  <p>Annosten määrä*</p>
                  <input type="number" placeholder="Syötä numero" required/>
                </div>
        
                <div id="ingDiv">
                  <p>Ainesosat*</p>
                  {
                    ingredients.map((e) => {
                      return e
                    })
                  }
                  <input id="addIngButton" type="button" onClick={addIngredient} value="Lisää ainesosa"/>
                </div>
              </div>
      
      
              <div id="addRecipeRight">
                <h3 className="header">Ohjeet / Aika / Lisätiedot</h3>
      
                <div>
                  <p>Aika-arvio*</p>
                  <input id="timeEst" type="number" placeholder="Syötä numero" required/>
                </div>
        
                <div>
                  <p>Ohjeet*</p>
                  <div className="instructions">
                    <textarea id="addRecipeInstructions" name="" cols="30" rows="10" required></textarea>
                  </div>
                </div>
        
                <div id="extraInfo">
                  <p>Lisätiedot</p>
                  <textarea id="addRecipeInfo" name="" cols="30" rows="5"></textarea>
                </div>
              </div>
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
  } else if (recipeSuccess) {
    return (
      <div id="successRecipe">
        <h2>Kokki<span className='highlightColor'>K</span></h2>
        <h3>Resepti lisätty</h3>
        <h3 id="successRecipeThanks">Kiitos!</h3>
      </div>
    )
  } else {
    return (
      <div id="failedRecipe">
        <h2>Kokki<span className='highlightColor'>K</span></h2>
        <h3>Reseptin lisäys epäonnistui</h3>
        <h3 id="failedRecipeThanks">Yritä uudelleen...</h3>
        <p>Tarkista, että kaikki tiedot ovat oikein!<br/>Jos ongelma jatkuu, ota yhteyttä ylläpitäjään.</p>
        <p id="failInfo" onClick={() => window.location = "mailto:hugotamm@hotmail.com?subject=Problem adding a recipe - KawaiiKokki"}>@: <span style={{textDecoration: "underline"}}>hugotamm@hotmail.com</span></p>
      </div>
    )
  }
}
