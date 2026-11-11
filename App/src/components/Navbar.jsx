import "./Navbar.css";

function Navbar({ itemCount, onCartClick }) {
  return (
    <header className="navbar">
      <a className="navbar-logo" href="#home" aria-label="SavorySpot home">
        <span className="logo-mark" aria-hidden="true">
          <span className="chef-hat" />
        </span>
        <span className="logo-name">
          Dish<span>dat</span>
        </span>
      </a>

      <nav className="navbar-links" aria-label="Main navigation">
        <a className="nav-link active" href="#home">Home</a>
        <a className="nav-link" href="#menu">Menu</a>
        <a className="nav-link" href="#about">About</a>
        <a className="nav-link" href="#contact">Contact</a>
      </nav>

      <button
        className="navbar-cart"
        type="button"
        aria-label={`Open basket with ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
        aria-haspopup="dialog"
        onClick={onCartClick}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="cart-icon">
          <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 7H6" />
          <circle cx="10" cy="18.5" r="1.5" />
          <circle cx="18" cy="18.5" r="1.5" />
        </svg>
        <span>Cart</span>
        <span className="cart-count" aria-hidden="true">{itemCount}</span>
      </button>
    </header>
  );
}

export default Navbar;