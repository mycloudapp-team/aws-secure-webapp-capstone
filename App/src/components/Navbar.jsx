import { useState } from "react";
import "./Navbar.css";

function Navbar({ cartCount = 0, onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <a
        className="navbar-logo"
        href="#home"
        aria-label="Dishdat home"
        onClick={closeMenu}
      >
        <span className="logo-mark" aria-hidden="true">
          <span className="chef-hat" />
        </span>

        <span className="logo-name">
          Dish<span>dat</span>
        </span>
      </a>

      <button
        className={`mobile-menu-toggle ${menuOpen ? "open" : ""}`}
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        className={`navbar-links ${menuOpen ? "mobile-open" : ""}`}
        aria-label="Main navigation"
      >
        <a className="nav-link active" href="#home" onClick={closeMenu}>
          Home
        </a>

        <a className="nav-link" href="#menu" onClick={closeMenu}>
          Menu
        </a>

        <a className="nav-link" href="#about" onClick={closeMenu}>
          About
        </a>

        <a className="nav-link" href="#contact" onClick={closeMenu}>
          Contact
        </a>
      </nav>

      <button
        className="navbar-cart"
        type="button"
        aria-label={`Shopping cart with ${cartCount} items`}
        onClick={() => {
          closeMenu();
          onCartClick?.();
        }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="cart-icon">
          <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 7H6" />
          <circle cx="10" cy="18.5" r="1.5" />
          <circle cx="18" cy="18.5" r="1.5" />
        </svg>

        <span>Cart</span>
        <span className="cart-count" aria-live="polite">
          {cartCount}
        </span>
      </button>
    </header>
  );
}

export default Navbar;