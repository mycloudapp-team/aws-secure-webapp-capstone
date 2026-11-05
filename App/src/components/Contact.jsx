
import "./contact.css";

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-info">
        <span className="contact-label">GET IN TOUCH</span>

        <h2>
          We'd love to
          <span> hear from you.</span>
        </h2>

        <p>
          Have a question, suggestion, or feedback?
          Send us a message. We'd be happy to hear from you.
        </p>

        <div className="contact-detail">
          <span className="contact-icon">✉</span>
          <div>
            <h4>Email us</h4>
            <p>Get in touch with our team.</p>
          </div>
        </div>

        <div className="contact-detail">
          <span className="contact-icon">☎</span>
          <div>
            <h4>Call us</h4>
            <p>We're happy to assist you.</p>
          </div>
        </div>
      </div>

      <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
        <h3>Send us a message</h3>

        <label htmlFor="contact-name">Your name</label>
        <input
          id="contact-name"
          type="text"
          placeholder="Enter your name"
          required
        />

        <label htmlFor="contact-email">Email address</label>
        <input
          id="contact-email"
          type="email"
          placeholder="Enter your email"
          required
        />

        <label htmlFor="contact-message">Your message</label>
        <textarea
          id="contact-message"
          rows="5"
          placeholder="Write your message..."
          required
        />

        <button type="submit">Send message →</button>
      </form>
    </section>
  );
}

export default Contact;
