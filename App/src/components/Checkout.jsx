import { useState } from "react";
import "./Checkout.css";

function Checkout({ cartItems, onPlaceOrder, onBack }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    instructions: "",
    paymentMethod: "Mobile Money",
  });

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onPlaceOrder(formData);
  }

  return (
    <section className="checkout-page">
      <div className="checkout-container">
        <button className="checkout-back" type="button" onClick={onBack}>
          ← Back to cart
        </button>

        <div className="checkout-heading">
          <span>ALMOST THERE</span>
          <h1>Complete your order</h1>
          <p>Enter your delivery details to place your order.</p>
        </div>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Delivery information</h2>

            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <label htmlFor="phone">Phone number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="e.g. 0241234567"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <label htmlFor="address">Delivery address</label>
            <textarea
              id="address"
              name="address"
              placeholder="Enter your complete delivery address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              required
            />

            <label htmlFor="instructions">
              Additional instructions (optional)
            </label>
            <textarea
              id="instructions"
              name="instructions"
              placeholder="Landmarks, directions or special instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows="2"
            />

            <h2 className="payment-heading">Payment method</h2>

            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="Mobile Money"
                checked={formData.paymentMethod === "Mobile Money"}
                onChange={handleChange}
              />
              <span>
                <strong>Mobile Money</strong>
                <small>MTN MoMo, Telecel Cash or AT Money</small>
              </span>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={formData.paymentMethod === "Cash on Delivery"}
                onChange={handleChange}
              />
              <span>
                <strong>Cash on Delivery</strong>
                <small>Pay when your order arrives</small>
              </span>
            </label>

            <button className="place-order-button" type="submit">
              Place Order
            </button>
          </form>

          <aside className="checkout-summary">
            <h2>Your order</h2>

            {cartItems.map((item) => (
              <div className="checkout-summary-item" key={item.id}>
                <span>
                  {item.name} × {item.quantity}
                </span>
                <strong>
                  GH₵ {(item.price * item.quantity).toFixed(2)}
                </strong>
              </div>
            ))}

            <div className="checkout-total">
              <span>Subtotal</span>
              <strong>GH₵ {subtotal.toFixed(2)}</strong>
            </div>

            <p>Delivery fee will be confirmed before payment.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Checkout;