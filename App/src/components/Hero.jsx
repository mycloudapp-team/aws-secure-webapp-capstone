// Import the hero section styles
import "./Hero.css";

// Import the locally stored burger photograph
import heroBurger from "../assets/images/hero-burger.jpg";

function Hero() {
  return (
    <section className="hero-section" id="home">

      {/* LEFT SIDE: Hero text and call-to-action */}
      <div className="hero-content">

        {/* Small promotional label */}
        <div className="hero-label">
          <span className="hero-label-icon">♨</span>
          <span>FRESHLY MADE, JUST FOR YOU</span>
        </div>

        {/* Main headline */}
        <h1 className="hero-title">
          Good food.
          <br />
          <span>Good mood.</span>
        </h1>

        {/* Supporting description */}
        <p className="hero-description">
          Discover delicious meals made with fresh ingredients
          and delivered straight to your door.
        </p>

        {/* Menu call-to-action */}
        <a href="#menu" className="hero-cta">
          <span>Explore our menu</span>

          {/* Arrow inside a white circle */}
          <span className="hero-cta-arrow">→</span>
        </a>

      </div>

      {/* RIGHT SIDE: Main food photograph and decorations */}
      <div className="hero-visual">

        {/* Decorative orange background shapes */}
        <div className="hero-orange-shape"></div>
        <div className="hero-peach-shape"></div>

        {/* Main food photograph */}
        <img
          src={heroBurger}
          alt="Fresh burger served with golden fries and a cold drink"
          className="hero-food-image"
        />

        {/* Made with love badge */}
        <div className="hero-love-badge">
          <span>Made with</span>
          <span>love <span className="love-heart">♥</span></span>
        </div>

        {/* Decorative food splashes */}
        <div className="hero-decoration decoration-one" aria-hidden="true"></div>
        <div className="hero-decoration decoration-two" aria-hidden="true"></div>
        <div className="hero-decoration decoration-three" aria-hidden="true"></div>
        <div className="hero-decoration decoration-four" aria-hidden="true"></div>

      </div>

      {/* Curved transition into the next section */}
      <div className="hero-bottom-wave" aria-hidden="true"></div>

    </section>
  );
}

export default Hero;