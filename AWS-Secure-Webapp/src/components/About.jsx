
import "./About.css";
import aboutImage from "../assets/images/strawberry.jpg";

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-content">
        <span className="about-label">OUR STORY</span>

        <h2>
          Good food brings
          <span> people together.</span>
        </h2>

        <p>
          At Dishdat, we believe every meal should be a memorable
          experience. We bring you freshly prepared meals made with
          quality ingredients, care, and passion.
        </p>

        <a href="#menu" className="about-button">
          Explore our menu
        </a>
      </div>

      <div className="about-image">
        <img
          src={aboutImage}
          alt="Fresh raspberry-topped cake, freshly prepared"
        />
      </div>
    </section>
  );
}

export default About;
