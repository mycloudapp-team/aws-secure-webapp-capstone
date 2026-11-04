// Import footer styling
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">

      {/* Brand name */}
      <a href="#home" className="footer-logo">
        Dish<span>dat</span>
      </a>

      {/* Footer description */}
      <p>
        Fresh food, delicious moments.
      </p>

      {/* Copyright information */}
      <div className="footer-bottom">
        © 2026 Dishdat. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;