
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">

      {/* Website logo */}
      <Link className="navbar-logo" to="/" aria-label="Dishdat home">
        <span className="logo-mark" aria-hidden="true">
          <span className="chef-hat" />
        </span>

        <span className="logo-name">
          Dish<span>dat</span>
        </span>
      </Link>

      {/* Main navigation */}
      <nav className="navbar-links" aria-label="Main navigation">
        <NavLink to="/" end className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }>
          Home
        </NavLink>

        <NavLink to="/menu" className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }>
          Menu
        </NavLink>

        <NavLink to="/about" className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }>
          About
        </NavLink>

        <NavLink to="/contact" className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }>
          Contact
        </NavLink>
      </nav>

      {/* Shopping cart */}
      <button className="navbar-cart" type="button" aria-label="Shopping cart">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="cart-icon">
          <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 7H6" />
          <circle cx="10" cy="18.5" r="1.5" />
          <circle cx="18" cy="18.5" r="1.5" />
        </svg>

        <span>Cart</span>
        <span className="cart-count">0</span>
      </button>

    </header>
  );
}

export default Navbar;
