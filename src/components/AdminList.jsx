import React, { useState, useEffect } from 'react';
import '../styles/AdminList.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function AdminList(prop) {

  const [isPrompted, setIsPrompted] = useState(false);
  const [currentDeletion, setCurrentDeletion] = useState();
  const [state, setState] = useState({
    isLoading: true,
    data: []
  });

  const { backendURL } = prop;

  const navigate = useNavigate();

  const confirmReq = (item) => {
    setIsPrompted(true);
    setCurrentDeletion(item)
  }

  const deleteItem = (e) => {
    e.preventDefault();
    const text = document.getElementById('promptText');
    if(e.target[0].value === 'password') {

    axios.delete(backendURL + currentDeletion._id)
      .then(response => {
        setState(prevState => ({
          ...prevState,
          data: state.data.filter(e => e._id !== currentDeletion._id)
        }));
        console.log(`Reseptti poistettiin: \n${currentDeletion.title} (id:${currentDeletion._id})`)
        setCurrentDeletion();
        setIsPrompted(false);
        text.innerHTML = '0';
      })
      .catch(err => {
        console.error(err.message)
      })

      
    } else {
      text.innerHTML = 'Väärä salasana!';
    }
  }

  useEffect(() => {
    axios.get(backendURL)
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
      console.error(err.message)
    })
  },[backendURL])

  return (
    <div id="adminList">
      {
        isPrompted && 
        <div id="promptBox">
          <p id="askPass" >Syötä salasana poistaakseen reseptti:<br/><span className="highlightColor">{currentDeletion.title}<br />(id: {currentDeletion._id})</span></p>
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
      {
        state.isLoading ? 
        <div id="adminlistLoader">
          <div id="adminlistLoadingSpinner">
          </div> 
          <h3>Ladataan...</h3>
        </div>
        : 
        <>
          <div className="recipeBox" id="addRecipePlus" onClick={() => {navigate('/addrecipe');}}>
            <p>+</p>
          </div>
          {
            state.data.map((e, index) => {
              return <div className="recipeBox" style={{backgroundImage: `url(${e.picture})`}} key={"recipe_" + index}>
                      <div className="recipeHoverMenu">
                        <p className="overviewRecipeTitles">{e.title}</p>
                        <button className="overviewButtons" onClick={() => {navigate('/recipes/' + e._id);}}>AVAA</button>
                        <button className="overviewButtons">MUOKKAA</button>
                        <button className="overviewButtons" onClick={() => confirmReq(e)}>POISTA</button>
                      </div>
                    </div>
            })
          }
        </>
      }
    </div>
  )
}
