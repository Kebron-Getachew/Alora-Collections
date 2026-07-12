import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

export default function CartDrawer() {
  const {
    cartItems,
    totalItems,
    totalPrice,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const navigate = useNavigate();

  // If the cart isn't open, render nothing at all — no backdrop, no drawer.
  if (!isCartOpen) return null;

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    closeCart();
    navigate('/shop');
  };

  return (
    <>
      <div className="cart-backdrop" onClick={closeCart} />

      <div className="cart-drawer">
        <div className="cart-header">
          <div className="cart-title">
            Your Cart
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </div>
          <button className="cart-close" onClick={closeCart} aria-label="Close cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon">✦</span>
            <p>Your cart is empty</p>
            <button className="cart-shop-btn" onClick={handleContinueShopping}>
              Browse Collections
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-img">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <span>✦</span>
                    )}
                  </div>

                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-category">{item.category}</div>
                    <div className="cart-item-price">${item.price}</div>

                    <div className="cart-item-qty">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18" />
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <span className="cart-subtotal-price">${totalPrice.toFixed(2)}</span>
              </div>
              <p className="cart-note">Shipping and delivery fee calculated at checkout</p>
              <button className="cart-checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
              <button className="cart-continue" onClick={handleContinueShopping}>
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}