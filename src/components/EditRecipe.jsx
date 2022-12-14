/*COPY OF ADDRECIPE*/

import React, { useState, useEffect } from "react";
import '../styles/AddRecipe.css';
import axios from "axios";
import FormData from "form-data";
import { useNavigate, useParams } from "react-router-dom";
import AddRating from "./AddRating";

export default function AddRecipe(prop) {
  let { id } = useParams();
  const { backendURL } = prop;

  const [state, setState] = useState({
    isLoading: true,
    recipe: []
  });

  

  useEffect(() => {
    axios.get(backendURL)
    .then(response => {
      if (response.data.length > 0) {
        const recipe = response.data.filter(recipe => recipe._id === id);
        setState(prevState => ({
          ...prevState,
          isLoading: false,
          recipe: recipe[0]
        }));

        const ingList = recipe[0].ingredients.map(ing => {
          const splitIng  = ing.split(": ");
          return splitIng;
        });

        const defaultIngs = ingList.map((ing, index) => {
          if (index === 0) {
            return (
              <div className="ingredients" key={"ingredient_" + index}>
              <div id="ingredientDiv">
                <input id="ingredientAmount" type="text" placeholder="Määrä" defaultValue={ing[1]} required/>
                <input id="ingredientName" type="text" placeholder="Ainesosa" defaultValue={ing[0]} required/>
              </div>
              <input id="ingredientDelete" type="button" value=""/>
            </div>
            )
          } else {
            return (
              <div className="ingredients" key={"ingredient_" + index}>
                <div id="ingredientDiv">
                  <input id="ingredientAmount" type="text" placeholder="Määrä" defaultValue={ing[1]} required/>
                  <input id="ingredientName" type="text" placeholder="Ainesosa" defaultValue={ing[0]} required/>
                </div>
                <input id="ingredientDelete" type="button" value="X" onClick={() => {deleteIngredient("ingredient_" + index)}}/>
              </div>
            )
          }
        })
        
        setIngredients(defaultIngs);
        
        displayImage(recipe[0]);
        setStarRating(state.recipe.rating);
      } else {
        setState(prevState => ({
          ...prevState,
          isLoading: false,
          recipe: []
        }));
      }
    })
    .catch(err => {
      console.error(err.message)
    })

    //Set the values from data
  }, [backendURL, id, state.recipe.rating])

  const [ingredients, setIngredients] = useState([]);

  

  const navigate = useNavigate();
  const [recipeSent, setRecipeSent] = useState(false);
  const [recipeSuccess, setRecipeSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [starRating, setStarRating] = useState(1);

  const displayImage = (recipe) => {
    const [file] = document.getElementById("recipeSubmitImage").files;
    const displayImage = document.getElementById("submitDisplayImage");
    const displayImageName = document.getElementById("imageNameDisplay");
    if (file) {
      displayImage.style.display = "block";
      displayImage.src = URL.createObjectURL(file);
      displayImage.alt = file.name;
      displayImageName.innerHTML = file.name;
    } else if (recipe) {
        displayImage.style.display = "block";
        displayImage.src = recipe.picture;
        displayImage.alt = recipe.title;
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const ingredientsList = [];
    let amount = "";
    let ingredient = "";
    let time = "";
    let instructions = "";
    let extra = "";
    let image = "";

    for (var i of form) {
      if (i.id === "ingredientAmount") {
        amount = i.value;
      }
      if (i.id === "ingredientName") {
        ingredient = i.value;
        ingredientsList.push(`${ingredient}: ${amount}`);
      }
      if (i.id === "timeEst") {
        time = i.value;
      }
      if (i.id === "addRecipeInstructions") {
        instructions = i.value;
      }
      if (i.id === "addRecipeInfo") {
        extra = i.value;
      }
    }

    const uploadImage = async () => {
      const [file] = document.getElementById("recipeSubmitImage").files;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "reclibimages");
  
        await axios
          .post("https://api.cloudinary.com/v1_1/hugotamm/upload", formData)
          .then((response) => {
            image = response.data.secure_url;
          })
          .catch((error) => console.log(error));
      } else {
        image = state.recipe.picture;
      }
    };

    await uploadImage();

    const recipe = {
      picture: image,
      title: form[1].value,
      rating: form[2].defaultValue,
      servings: form[3].value,
      ingredients: ingredientsList,
      time: time,
      instructions: instructions,
      notes: extra,
    };

    axios.post(backendURL + "update/" + id, recipe)
      .then((response) => {
        setLoading(false);
        setRecipeSent(true);
        setRecipeSuccess(true);
        setTimeout(() => {
          navigate("/overview", { replace: true });
        }, 4000);
      })
      .catch((err) => {
        console.error(err);
        setRecipeSent(true);
        setRecipeSuccess(false);
        setTimeout(() => {
          setRecipeSent(false);
        }, 8000);
      });
  };

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
          <div id="addRecipeLoadingSpinner"></div>
          <h3>Julkaistaan reseptiä...</h3>
        </div>
      );
    } else {
      return (
        <div id="addRecipe">
          <div id="addRecipeTitle">
            <h3 className="header">Muokkaa reseptiä</h3>
            <p>{`ID: ` + id}</p>
          </div>
          <form action="" onSubmit={handleSubmit} id="recipeForm">
            <div id="addRecipeLeftRight">
                <div id="addRecipeLeft">
                  <h3 className="header">Kuva / Nimi / Arvosana</h3>

                  <div>
                    <p id="addRecipePic">Kuva*</p>
                    <label htmlFor="recipeSubmitImage" id="labelSubmitImage">
                      Valitse kuva
                    </label>
                    <input
                      accept="image/*"
                      type="file"
                      id="recipeSubmitImage"
                      onChange={displayImage}
                      defaultValue={state.recipe.picture}
                    />
                    <p id="imageNameDisplay"></p>
                    <img src="#" alt="" id="submitDisplayImage" />
                  </div>

                  <div>
                    <p>Nimi*</p>
                    <input
                      id="submitRecipeName"
                      type="text"
                      placeholder="Reseptin nimi"
                      minLength="3"
                      maxLength="30"
                      defaultValue={state.recipe.title}
                      required
                    />
                  </div>

                  <div>
                    <p>Arvosana*</p>
                    <AddRating setStarRating={setStarRating} value={state.recipe.rating}/>
                    <input
                      id="submitRecipeRating"
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      defaultValue={starRating}
                      readOnly
                      required
                    />
                  </div>

                  <h3 className="header">Ainesosat / Annokset</h3>

                  <div>
                    <p>Annosten määrä*</p>
                    <input type="number" placeholder="Syötä numero" required defaultValue={state.recipe.servings}/>
                  </div>

                  <div>
                    <p>Ainesosat*</p>
                    {ingredients.map((e) => {
                      return e;
                    })}
                    <input
                      id="addIngButton"
                      type="button"
                      onClick={addIngredient}
                      value="Lisää ainesosa"
                    />
                  </div>
                </div>
                <div id="addRecipeRight">
                  <h3 className="header">Ohjeet / Aika / Lisätiedot</h3>

                  <div>
                    <p>Aika-arvio*</p>
                    <input
                      id="timeEst"
                      type="number"
                      placeholder="Syötä numero"
                      required
                      defaultValue={state.recipe.time}
                    />
                  </div>

                  <div>
                    <p>Ohjeet*</p>
                    <div className="instructions">
                      <textarea
                        id="addRecipeInstructions"
                        name=""
                        cols="30"
                        rows="10"
                        required
                        defaultValue={state.recipe.instructions}
                      ></textarea>
                    </div>
                  </div>

                  <div id="extraInfo">
                    <p>Lisätiedot</p>
                    <textarea
                      id="addRecipeInfo"
                      name=""
                      cols="30"
                      rows="5"
                      defaultValue={state.recipe.notes}
                    ></textarea>
                  </div>
                </div>
            </div>

            <div id="arsb">
              <input
                type="submit"
                value="Muokkaa reseptiä"
                id="addRecipeSubmit"
              />
            </div>
          </form>
        </div>
      );
    }
  } else if (recipeSuccess) {
    return (
      <div id="successRecipe">
        <h2>
          Cozy<span className="highlightColor">C</span>
        </h2>
        <h3>Resepti muokattu</h3>
        <h3 id="successRecipeThanks">Kiitos!</h3>
      </div>
    );
  } else {
    return (
      <div id="failedRecipe">
        <h2>
          Cozy<span className="highlightColor">C</span>
        </h2>
        <h3>Reseptin muokkaus epäonnistui</h3>
        <h3 id="failedRecipeThanks">Yritä uudelleen...</h3>
        <p>
          Tarkista, että kaikki tiedot ovat oikein!
          <br />
          Jos ongelma jatkuu, ota yhteyttä ylläpitäjään.
        </p>
        <p
          id="failInfo"
          onClick={() =>
            (window.location =
              "mailto:hugotamm@hotmail.com?subject=Problem adding a recipe - Cozy Cookery")
          }
        >
          @:{" "}
          <span style={{ textDecoration: "underline" }}>
            hugotamm@hotmail.com
          </span>
        </p>
      </div>
    );
  }
}
