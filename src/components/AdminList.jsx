import React, { useState, useEffect } from 'react';
import '../styles/AdminList.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function AdminList() {

  const [isPrompted, setIsPrompted] = useState(false);
  const [currentDeletion, setCurrentDeletion] = useState();
  const [state, setState] = useState({
    isLoading: true,
    data: {}
  });

  const navigate = useNavigate();

  let recipes = []

  const confirmReq = (item) => {
    setIsPrompted(true);
    setCurrentDeletion(item)
  }

  const deleteItem = (e) => {
    e.preventDefault();
    const text = document.getElementById('promptText');
    if(e.target[0].value === 'password') {
      console.log(`Reseptti poistettiin: \n${currentDeletion.title} (id:${currentDeletion.id})`)
      setCurrentDeletion();
      setIsPrompted(false);
      text.innerHTML = '0';
    } else {
      console.log('Wrong password!')
      text.innerHTML = 'Väärä salasana!';
    }
  }

  useEffect(() => {
    axios.get('http://localhost:5000/recipes/')
    .then(response => {
      if (response.data.length > 0) {

        setState(response.data);
      }
    })
    .catch(err => {
      console.error(err.message)
    })
  })

  return (
    <div id="adminList">
      {
        isPrompted && 
        <div id="promptBox">
          <p>Syötä salasana poistakseen reseptti:<br/><span className="highlightColor">{currentDeletion.title}<br />(id: {currentDeletion._id})</span></p>
          <form action="" onSubmit={deleteItem}>
            <p id="promptText"></p>
            <input type="password" placeholder="Salasana" id="promptPassword"/>
            <div id="promptButtons">
              <input id="promptX" type="button" value="SULJE" onClick={() => {setIsPrompted(false); setCurrentDeletion()}}/>
              <input id="promptDel" type="submit" value="POISTA"/>
            </div>
          </form>
        </div>
      }
      <div className="recipeBox" id="addRecipePlus" onClick={() => {navigate('/addrecipe');}}>
        <p>+</p>
      </div>
      {
        state.isLoading ? 
        <p>Loading...</p> 
        : 
        state.map((e, index) => {
          return <div className="recipeBox" style={{backgroundImage: `url(${e.picture.toBase64()})`}} key={"recipe_" + index}>
                  <div className="recipeHoverMenu">
                    <p className="overviewRecipeTitles">{e.title}</p>
                    <button className="overviewButtons">AVAA</button>
                    <button className="overviewButtons">MUOKKAA</button>
                    <button className="overviewButtons" onClick={() => confirmReq(e)}>POISTA</button>
                  </div>
                </div>
        })
      }
    </div>
  )
}
