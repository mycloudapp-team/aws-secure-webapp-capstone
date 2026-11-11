import { useRef, useState } from "react";
// Import website components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import jollofRice from "./assets/images/jollof rice.jpg";
import friedRice from "./assets/images/fried-rice.jpg";
import friedChicken from "./assets/images/fried-chicken.jpg";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
// Import main application styles
import "./App.css";

const menuItems = [
  {
    id: "jollof-rice",
    name: "Jollof rice",
    description: "A comforting, flavourful rice favourite.",
    image: jollofRice,
    alt: "A plate of jollof rice",
  },
  {
    id: "fried-rice",
    name: "Fried rice",
    description: "A colourful classic, freshly prepared.",
    image: friedRice,
    alt: "A plate of fried rice",
  },
  {
    id: "fried-chicken",
    name: "Fried chicken",
    description: "Crispy chicken, perfect for sharing.",
    image: friedChicken,
    alt: "Crispy fried chicken",
  },
];

function App() {
  const [basket, setBasket] = useState({});
  const cartDialog = useRef(null);
  const itemCount = Object.values(basket).reduce(
    (total, quantity) => total + quantity,
    0,
  );
  const basketItems = menuItems.filter((item) => basket[item.id]);

  function addToBasket(itemId) {
    setBasket((current) => ({
      ...current,
      [itemId]: (current[itemId] ?? 0) + 1,
    }));
  }

  function changeQuantity(itemId, amount) {
    setBasket((current) => {
      const quantity = (current[itemId] ?? 0) + amount;

      if (quantity <= 0) {
        const nextBasket = { ...current };
        delete nextBasket[itemId];
        return nextBasket;
      }

      return { ...current, [itemId]: quantity };
    });
  }

  return (
    <div className="app">

      {/* Website navigation */}
      <Navbar
        itemCount={itemCount}
        onCartClick={() => cartDialog.current?.showModal()}
      />

      <dialog
        className="cart-dialog"
        ref={cartDialog}
        aria-labelledby="cart-title"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            cartDialog.current?.close();
          }
        }}
      >
        <div className="cart-dialog-header">
          <div>
            <span className="section-kicker">YOUR SELECTION</span>
            <h2 id="cart-title">Your basket</h2>
          </div>
          <button
            className="cart-close"
            type="button"
            onClick={() => cartDialog.current?.close()}
            aria-label="Close basket"
          >
            ×
          </button>
        </div>

        {basketItems.length === 0 ? (
          <p className="cart-empty">Your basket is empty. Add a favourite from the menu.</p>
        ) : (
          <ul className="cart-items">
            {basketItems.map((item) => (
              <li className="cart-item" key={item.id}>
                <img src={item.image} alt="" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <div className="cart-quantity">
                    <button
                      type="button"
                      onClick={() => changeQuantity(item.id, -1)}
                      aria-label={`Remove one ${item.name}`}
                    >
                      −
                    </button>
                    <span aria-live="polite">{basket[item.id]}</span>
                    <button
                      type="button"
                      onClick={() => changeQuantity(item.id, 1)}
                      aria-label={`Add one ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="cart-note">
          This demo basket helps you keep track of your picks. Online checkout is not
          available yet.
        </p>
        {itemCount > 0 && (
          <button
            className="cart-clear"
            type="button"
            onClick={() => setBasket({})}
          >
            Clear basket
          </button>
        )}
      </dialog>

      <main>

        {/* Main promotional hero section */}
        <Hero />

        {/* Menu preview section */}
        <section className="menu-preview" id="menu">
          <div className="menu-intro">
            <div className="section-kicker">
              <span className="kicker-line" />
              WHAT WE'RE SERVING
            </div>
            <h2>Find your new favourite</h2>
            <p>Freshly made favourites, prepared with care and ready to enjoy.</p>
          </div>

          <div className="menu-cards">
            {menuItems.map((item) => (
              <article className="menu-card" key={item.id}>
                <div className={`menu-card-background ${item.id}`} />
                <img src={item.image} alt={item.alt} />
                <div className="menu-card-content">
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>
                  <button
                    className="menu-add-button"
                    type="button"
                    onClick={() => addToBasket(item.id)}
                  >
                    Add to basket
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;