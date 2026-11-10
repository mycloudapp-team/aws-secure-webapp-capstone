import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import jollofRice from "./assets/images/jollof rice.jpg";
import friedRice from "./assets/images/fried-rice.jpg";
import friedChicken from "./assets/images/fried-chicken.jpg";

import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  function addToCart(food) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === food.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...food, quantity: 1 }];
    });
  }

  function updateQuantity(itemId, change) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(itemId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    );
  }

  function openCheckout() {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  }

  function returnToCart() {
    setIsCheckoutOpen(false);
    setIsCartOpen(true);
  }

  function placeOrder(formData) {
    const order = {
      reference: `DSH-${Date.now().toString(36).toUpperCase()}`,
      customer: formData,
      items: cartItems,
      createdAt: new Date().toISOString(),
    };

    setCompletedOrder(order);
    setCartItems([]);
    setIsCheckoutOpen(false);
  }

  function returnHome() {
    setCompletedOrder(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (completedOrder) {
    return (
      <div className="app">
        <OrderSuccess
          order={completedOrder}
          onBackHome={returnHome}
        />
      </div>
    );
  }

  return (
    <div className="app">
      {!isCheckoutOpen && (
        <>
          <Navbar
            cartCount={cartCount}
            onCartClick={() => setIsCartOpen(true)}
          />

          <main>
            <Hero />

            <section className="menu-preview" id="menu">
              <div className="menu-intro">
                <div className="section-kicker">
                  <span className="kicker-line" />
                  WHAT WE'RE SERVING
                </div>

                <h2>Find your new favourite</h2>
                <p>
                  Freshly made favourites, prepared with care and ready to enjoy.
                </p>
              </div>

              <div className="menu-cards">
                <article className="menu-card">
                  <div className="menu-card-background jollof" />
                  <img src={jollofRice} alt="A plate of jollof rice" />
                </article>

                <article className="menu-card">
                  <div className="menu-card-background fried-rice" />
                  <img src={friedRice} alt="A plate of fried rice" />
                </article>

                <article className="menu-card">
                  <div className="menu-card-background chicken" />
                  <img src={friedChicken} alt="Crispy fried chicken" />
                </article>
              </div>
            </section>

            <Menu onAddToCart={addToCart} />

            <About />
            <Contact />
          </main>

          <Footer />
        </>
      )}

      {isCartOpen && (
        <Cart
          cartItems={cartItems}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={openCheckout}
        />
      )}

      {isCheckoutOpen && (
        <Checkout
          cartItems={cartItems}
          onPlaceOrder={placeOrder}
          onBack={returnToCart}
        />
      )}
    </div>
  );
}

export default App;