import React, { useState } from 'react';
import '../styles/Searchbar.css';
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';

export default function Searchbar(props) {

    const navigate = useNavigate();
    const { data } = props;
    let highlightColor = getComputedStyle(document.body).getPropertyValue('--highlightColor');

    const [filteredData, setFilteredData] = useState([]);
    const [enteredWord, setEnteredWord] = useState("");

    const handleFilter = e => {
        const searchInput = e.target.value;
        setEnteredWord(searchInput);
        if (searchInput) {
            const newFilter = data.filter(value => {
                return value.title.toLowerCase().includes(searchInput.toLowerCase());
            });
            setFilteredData(newFilter);
        } else {
            setFilteredData([]);
        }
    }

    const clearInput = () => {
        setFilteredData([]);
        setEnteredWord("");
    }

  return (
    <div>
        <div id="searchDiv" >
            <input id="searchInput" type="text" placeholder="Etsi reseptiä nimellä" value={enteredWord} onChange={handleFilter}/>
            {
                enteredWord.length === 0 ? <Icon className="searchIcon" icon="bx:search-alt-2" /> : <Icon id="closeSearchIcon" className="searchIcon" icon="ci:close-big" onClick={clearInput}/>
            }
        </div>
        {
            filteredData.length !== 0 && 
            (
            <div id="searchResult">
            {
                filteredData.map((recipe, index) => {
                    if (index !== filteredData.length - 1) {
                        return <p key={"searchItem_" + index} style={{paddingBlock: "0.5rem", borderBottom: `0.1rem solid ${highlightColor}` }} onClick={() => {navigate('/recipes/' + recipe._id)}}>{recipe.title}</p>
                    } else {
                        return <p key={"searchItem_" + index} style={{paddingBlock: "0.5rem", borderBottom: "0" }} onClick={() => {navigate('/recipes/' + recipe._id)}}>{recipe.title}</p>
                    }
                })
            }
            </div>
            )
        }
    </div>
  )
}
