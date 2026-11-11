import "./OrderSuccess.css";

function OrderSuccess({ order, onBackHome }) {
  if (!order) return null;

  const subtotal = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section className="order-success-page">
      <div className="order-success-card">
        <div className="success-icon">
          ✓
        </div>

        <span className="success-kicker">ORDER RECEIVED</span>

        <h1>Thank you for your order!</h1>

        <p className="success-message">
          Your order details have been recorded in this demonstration.
          We appreciate you choosing Dishdat.
        </p>

        <div className="order-reference">
          <span>ORDER REFERENCE</span>
          <strong>{order.reference}</strong>
        </div>

        <div className="success-section">
          <h2>Order summary</h2>

          {order.items.map((item) => (
            <div className="success-order-item" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <span>Quantity: {item.quantity}</span>
              </div>

              <strong>
                GH₵ {(item.price * item.quantity).toFixed(2)}
              </strong>
            </div>
          ))}

          <div className="success-total">
            <span>Subtotal</span>
            <strong>GH₵ {subtotal.toFixed(2)}</strong>
          </div>
        </div>

        <div className="success-section customer-details">
          <h2>Delivery information</h2>

          <p><strong>Name:</strong> {order.customer.fullName}</p>
          <p><strong>Phone:</strong> {order.customer.phone}</p>
          <p><strong>Address:</strong> {order.customer.address}</p>
          <p>
            <strong>Payment:</strong> {order.customer.paymentMethod}
          </p>
        </div>

      

        <button
          className="success-home-button"
          type="button"
          onClick={onBackHome}
        >
          Back to Homepage
        </button>
      </div>
    </section>
  );
}

export default OrderSuccess;