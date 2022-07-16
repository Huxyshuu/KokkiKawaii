import React, { useState } from 'react';
import '../styles/Searchbar.css';
import { useNavigate } from "react-router-dom";

export default function Searchbar(props) {

    const navigate = useNavigate();
    const { data } = props;
    let highlightColor = getComputedStyle(document.body).getPropertyValue('--highlightColor');

    const [filteredData, setFilteredData] = useState([]);

    const handleFilter = e => {
        const searchInput = e.target.value;
        if (searchInput) {
            const newFilter = data.filter(value => {
                return value.title.toLowerCase().includes(searchInput.toLowerCase());
            });
            setFilteredData(newFilter);
        } else {
            setFilteredData([]);
        }
        
    }

  return (
    <div>
        <div id="searchDiv">
            <input id="searchInput" type="text" placeholder="Etsi reseptiä nimellä" onChange={handleFilter}/>
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
