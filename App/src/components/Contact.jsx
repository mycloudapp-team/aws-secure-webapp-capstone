
import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    event.target.setCustomValidity("");

    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const nameInput = form.elements.name;
    const emailInput = form.elements.email;
    const messageInput = form.elements.message;

    nameInput.setCustomValidity(
      nameInput.value.trim() ? "" : "Please enter your name."
    );

    emailInput.setCustomValidity(
      emailInput.value.trim() ? "" : "Please enter your email."
    );

    messageInput.setCustomValidity(
      messageInput.value.trim() ? "" : "Please enter a message."
    );

    if (!form.reportValidity()) {
      return;
    }

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  }

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
            <a href="mailto:info@alpha.com.gh">
              info@alpha.com.gh
            </a>
          </div>
        </div>

        <div className="contact-detail">
          <span className="contact-icon">☎</span>
          <div>
            <h4>Call us</h4>
            <a href="tel:+233545498852">
              +233 (0) 54 549 8852
            </a>
          </div>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <h3>Send us a message</h3>

        {submitted && (
          <p className="contact-success" role="status">
            Thank you! Your message has been received in this demo.
          </p>
        )}

        <label htmlFor="contact-name">Your name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          autoComplete="name"
          required
        />

        <label htmlFor="contact-email">Email address</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />

        <label htmlFor="contact-message">Your message</label>
        <textarea
          id="contact-message"
          name="message"
          rows="5"
          placeholder="Write your message..."
          value={formData.message}
          onChange={handleChange}
          maxLength={500}
          required
        />

        <div className="message-counter">
          {formData.message.length}/500 characters
        </div>

        <button type="submit" disabled={submitted}>
          {submitted ? "Message received ✓" : "Send message →"}
        </button>
      </form>
    </section>
  );
}

export default Contact;
