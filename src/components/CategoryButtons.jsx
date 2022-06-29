import React, { useState, useEffect } from "react";
import "../styles/CategoryButtons.css";

export default function CategoryButtons() {
  const [showMore, setShowMore] = useState(false);

  const categories = [
    "Breakfast",
    "Dinner",
    "Meat",
    "Snacks",
    "Dessrts",
    "Pasta",
    "Supper",
    "Healthy",
    "Spicy",
    "Pastries",
    "Salty",
    "Pizza",
    "Salad",
  ];
  const shortCategories = ["Breakfast", "Dinner", "Meat"];

  useEffect(() => {
    const categoryHeight =
      document.getElementById("categoryButtons").offsetHeight;
    console.log(categoryHeight);
  });

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
