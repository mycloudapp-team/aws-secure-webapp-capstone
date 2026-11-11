
import { useMemo, useState } from "react";
import "./Menu.css";

import jollofRice from "../assets/images/jollof-rice-optimized.jpg";
import friedRice from "../assets/images/fried-rice-optimized.jpg";
import friedChicken from "../assets/images/fried-chicken-optimized.jpg";
import heroBurger from "../assets/images/hero-burger-optimized.jpg";
import strawberry from "../assets/images/strawberry-optimized.jpg";

const foodItems = [
  {
    id: 1,
    name: "Ghanaian Jollof Rice",
    category: "Rice",
    description: "Delicious smoky jollof rice prepared with fresh ingredients.",
    price: 65,
    image: jollofRice,
    popular: true,
  },
  {
    id: 2,
    name: "Special Fried Rice",
    category: "Rice",
    description: "Flavourful fried rice served with fresh vegetables.",
    price: 70,
    image: friedRice,
    popular: true,
  },
  {
    id: 3,
    name: "Crispy Fried Chicken",
    category: "Chicken",
    description: "Golden, crispy and juicy chicken.",
    price: 55,
    image: friedChicken,
    popular: true,
  },
  {
    id: 4,
    name: "Dishdat Special Burger",
    category: "Fast Food",
    description: "A delicious burger made for a satisfying meal.",
    price: 80,
    image: heroBurger,
    popular: false,
  },
  {
    id: 5,
    name: "Strawberry Delight",
    category: "Drinks",
    description: "A refreshing strawberry treat.",
    price: 35,
    image: strawberry,
    popular: false,
  },
];

const categories = ["All", "Rice", "Chicken", "Fast Food", "Drinks"];

function Menu({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return foodItems.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      const matchesSearch =
        normalizedSearch === "" ||
        [item.name, item.description, item.category]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <section className="food-menu" id="full-menu">
      <div className="food-menu-heading">
        <span className="section-kicker">OUR FOOD COLLECTION</span>
        <h2>Explore our menu</h2>
        <p>Discover delicious meals made fresh and served with love.</p>
      </div>

      <div className="menu-controls">
        <div className="menu-search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Search for your favourite food..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            aria-label="Search food menu"
          />
        </div>

        <div className="menu-categories" aria-label="Food categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                activeCategory === category
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="food-grid">
        {filteredItems.map((item) => (
          <article className="food-card" key={item.id}>
            <div className="food-image">
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                decoding="async"
              />

              {item.popular && (
                <span className="popular-badge">Popular</span>
              )}
            </div>

            <div className="food-details">
              <span className="food-category">{item.category}</span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>

              <div className="food-card-bottom">
                <strong>GH₵ {item.price.toFixed(2)}</strong>

                <button
                  type="button"
                  onClick={() => onAddToCart(item)}
                  aria-label={`Add ${item.name} to cart`}
                >
                  + Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="menu-empty">
          <h3>No meals found</h3>
          <p>Try another search or select a different category.</p>
        </div>
      )}
    </section>
  );
}

export default Menu;
