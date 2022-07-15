import React, { useState, useEffect } from 'react';
import '../styles/AdminList.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function AdminList(prop) {

  const [isPrompted, setIsPrompted] = useState(false);
  const [currentDeletion, setCurrentDeletion] = useState();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteFailed, setDeleteFailed] = useState(false);
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
      setIsDeleting(true);
      axios.delete(backendURL + currentDeletion._id)
        .then(response => {
          setState(prevState => ({
            ...prevState,
            data: state.data.filter(e => e._id !== currentDeletion._id)
          }));
          setIsDeleting(false);
          setIsDeleted(true);
          text.innerHTML = '0';
          // console.log(`Reseptti poistettiin: \n${currentDeletion.title} (id:${currentDeletion._id})`)
          
          setTimeout(() => {
            setCurrentDeletion();
            setIsDeleted(false);
            setIsPrompted(false);
          }, 3000)
        })
        .catch(err => {
          setIsDeleting(false);
          setIsDeleted(true)
          text.innerHTML = '0';
          setDeleteFailed(true);

          setTimeout(() => {
            setCurrentDeletion();
            setIsDeleted(false);
            setIsPrompted(false);
            setDeleteFailed(false);
          }, 10000)
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
          {
            isDeleted ? 
            <>
            {
              deleteFailed ? 
              <>
              <p id="askPass">Reseptin poisto epäonnistui. <br/>Yritä uudelleen myöhemmin tai ota yhteyttä ylläpitäjään <br/><br/><span className="highlightColor">hugotamm@hotmail.com</span></p>
              </>
              :
              <>
              <p id="askPass">Resepti: <span className="highlightColor">{currentDeletion.title}<br />(id: {currentDeletion._id})</span><br /> on poistettu</p>
              </>
            }
            </>
            :
            <>
            {
            isDeleting ? 
            <>
            <div id="adminlistLoader">
              <div id="adminlistLoadingSpinner">
              </div> 
              <h3>Poistetaan...</h3>
            </div>
            </>
            :
            <>
            <p id="askPass" >Syötä salasana poistaakseen reseptti: <span className="highlightColor">{currentDeletion.title}<br />(id: {currentDeletion._id})</span></p>
            <form action="" onSubmit={deleteItem}>
              <p id="promptText"></p>
              <input type="password" placeholder="Salasana" id="promptPassword"/>
              <div id="promptButtons">
                <input id="promptX" type="button" value="SULJE" onClick={() => {setIsPrompted(false); setCurrentDeletion()}}/>
                <input id="promptDel" type="submit" value="POISTA"/>
              </div>
            </form>
            </>
            }
            </>
          }
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
          <div className="recipeBox" id="addRecipePlus" onClick={() => {navigate('/addrecipe')}}>
            <p>+</p>
          </div>
          {
            state.data.map((e, index) => {
              return <div className="recipeBox" style={{backgroundImage: `url(${e.picture})`}} key={"recipe_" + index}>
                      <div className="recipeHoverMenu">
                        <p className="overviewRecipeTitles">{e.title}</p>
                        <button className="overviewButtons" onClick={() => {navigate('/recipes/' + e._id)}}>AVAA</button>
                        <button className="overviewButtons" onClick={() => {navigate('/editrecipe/' + e._id)}}>MUOKKAA</button>
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
