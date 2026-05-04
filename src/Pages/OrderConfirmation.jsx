import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';

export default function OrderConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate('/');
    return null;
  }

  const { phone, location, deliveryFee, subtotal, total, prepayment, items } = state;

  return (
    <div className="order-confirm">
      <div className="order-confirm-inner">

        <div className="order-icon">✦</div>
        <h1 className="order-title">Order Placed!</h1>
        <p className="order-subtitle">
          Thank you for your order. We've received your payment screenshot and will confirm shortly.
        </p>

        <div className="order-details">
          <div className="order-detail-row">
            <span>Phone</span>
            <span>{phone}</span>
          </div>
          <div className="order-detail-row">
            <span>Delivery to</span>
            <span>{location}</span>
          </div>
          <div className="order-detail-row">
            <span>Delivery Fee</span>
            <span>{deliveryFee > 0 ? `${deliveryFee} ETB` : 'Free'}</span>
          </div>
          <div className="order-detail-row">
            <span>Order Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="order-detail-row highlight">
            <span>Prepayment Confirmed</span>
            <span>{prepayment} ETB ✓</span>
          </div>
        </div>

        <div className="order-items">
          <h3>Items Ordered</h3>
          {items.map(item => (
            <div key={item.id} className="order-item">
              <span>{item.name}</span>
              <span>x{item.quantity} — ${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <p className="order-note">
          We will contact you on <strong>{phone}</strong> to confirm your delivery details.
        </p>

        <button className="order-home-btn" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
}