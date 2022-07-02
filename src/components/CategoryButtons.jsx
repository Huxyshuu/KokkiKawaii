import React, { useState } from "react";
import "../styles/CategoryButtons.css";

export default function CategoryButtons() {
  const [showMore, setShowMore] = useState(false);

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
  const shortCategories = ["Aamupala", "Liha", "Pasta"];

  return (
    <div>
      {!showMore ? (
        <>
          {shortCategories.map((item, index) => {
            return (
              <button
                type="button"
                key={"short_" + index}
                className="categoryButton"
              >
                {item.toUpperCase()}
              </button>
            );
          })}
          <button
            type="button"
            key={"short_more"}
            className="categoryButtonML"
            onClick={() => setShowMore(true)}
          >MORE</button>
        </>
      ) : (
        <>
          {categories.map((item, index) => {
            return (
              <button
                type="button"
                key={"short_" + index}
                className="categoryButton"
              >
                {item.toUpperCase()}
              </button>
            );
          })}
          <button
            type="button"
            key={"short_less"}
            className="categoryButtonML"
            onClick={() => setShowMore(false)}
          >LESS</button>
        </>
      )}
    </div>
  );
}
