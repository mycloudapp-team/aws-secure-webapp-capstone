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

function App() {
  return (
    <div className="app">

      {/* Website navigation */}
      <Navbar />

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

        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;