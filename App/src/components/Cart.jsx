import "./Cart.css";

function Cart({
    cartItems,
    onClose,
    onUpdateQuantity,
    onRemoveItem,
    onCheckout,
}) {
    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <>
            <button
                className="cart-overlay"
                type="button"
                aria-label="Close shopping cart"
                onClick={onClose}
            />

            <aside className="cart-drawer" aria-label="Shopping cart">
                <div className="cart-header">
                    <div>
                        <span className="cart-kicker">YOUR ORDER</span>
                        <h2>Shopping Cart</h2>
                    </div>

                    <button
                        className="cart-close"
                        type="button"
                        aria-label="Close cart"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                {cartItems.length === 0 ? (
                    <div className="cart-empty">
                        <span className="cart-empty-icon" aria-hidden="true">
                            🛒
                        </span>
                        <h3>Your cart is empty</h3>
                        <p>Add something delicious from our menu.</p>
                        <button type="button" onClick={onClose}>
                            Explore menu
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <article className="cart-item" key={item.id}>
                                    <img src={item.image} alt={item.name} />

                                    <div className="cart-item-info">
                                        <h3>{item.name}</h3>
                                        <p>GH₵ {item.price.toFixed(2)}</p>

                                        <div className="cart-item-actions">
                                            <div className="quantity-control">
                                                <button
                                                    type="button"
                                                    aria-label={`Decrease ${item.name} quantity`}
                                                    onClick={() => onUpdateQuantity(item.id, -1)}
                                                >
                                                    −
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    type="button"
                                                    aria-label={`Increase ${item.name} quantity`}
                                                    onClick={() => onUpdateQuantity(item.id, 1)}
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                className="remove-item"
                                                type="button"
                                                onClick={() => onRemoveItem(item.id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <div className="cart-subtotal">
                                <span>Subtotal</span>
                                <strong>GH₵ {subtotal.toFixed(2)}</strong>
                            </div>
                            <p>Delivery fee is calculated at checkout.</p>

                            <button
                                className="checkout-button"
                                type="button"
                                onClick={onCheckout}
                            >
                                Proceed to Checkout →
                            </button>
                        </div>
                    </>
                )}
            </aside>
        </>
    );
}

export default Cart;