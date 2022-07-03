import React, { useState } from 'react';
import '../styles/AdminList.css';
import { useNavigate } from "react-router-dom";

export default function AdminList() {

  const [isPrompted, setIsPrompted] = useState(false);
  const [currentDeletion, setCurrentDeletion] = useState();

  const navigate = useNavigate();

  const recipes = [
    {
      id: '1',
      image: 'https://i.imgur.com/60NlJft.jpeg',
      title: 'Pasta Carbonara'
    },
    {
      id: '2',
      image: 'https://i.imgur.com/H1y0hft.png',
      title: 'Köyhät Ritarit'
    },
    {
      id: '3',
      image: 'https://i.imgur.com/IEDzzSw.png',
      title: 'Vol-Au-Vent'
    },
    {
      id: '4',
      image: 'https://i.imgur.com/IBhwx61.png',
      title: 'Lasagne'
    },
    {
      id: '5',
      image: 'https://i.imgur.com/ueHBEBZ.png',
      title: 'Burrito'
    },
    {
      id: '6',
      image: 'https://i.imgur.com/Oo8puqu.png',
      title: 'Fruit'
    },
  ]

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

  return (
    <div id="adminList">
      {
        isPrompted && 
        <div id="promptBox">
          <p>Syötä salasana poistakseen reseptti:<br/><span className="highlightColor">{currentDeletion.title} (id: {currentDeletion.id})</span></p>
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
        recipes.map((e, index) => {
          return <div className="recipeBox" style={{backgroundImage: `url(${e.image})`}} key={"recipe_" + index}>
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
