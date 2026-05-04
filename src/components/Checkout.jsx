import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const DELIVERY_LOCATIONS = [
  { name: 'Summit', fee: 0 },
  { name: '4 Kilo', fee: 0 },
  { name: 'Bole', fee: 50 },
  { name: 'Kasanchis', fee: 50 },
  { name: 'Piassa', fee: 60 },
  { name: 'Merkato', fee: 60 },
  { name: 'Hayahulet', fee: 50 },
  { name: 'CMC', fee: 70 },
  { name: 'Sarbet', fee: 60 },
  { name: 'Other', fee: 80 },
];

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const selectedLocation = DELIVERY_LOCATIONS.find(l => l.name === location);
  const deliveryFee = selectedLocation ? selectedLocation.fee : 0;
  const hasExtraFee = deliveryFee > 0;
  const subtotal = totalPrice;
  const total = subtotal + deliveryFee;
  const prepayment = (total * 0.1).toFixed(2);

  const handleScreenshot = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshot(file);
      setScreenshotPreview(URL.createObjectURL(file));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!phone || phone.length < 9) newErrors.phone = 'Please enter a valid phone number';
    if (!location) newErrors.location = 'Please select a delivery location';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handlePlaceOrder = () => {
    if (!screenshot) {
      setErrors({ screenshot: 'Please upload your payment screenshot' });
      return;
    }
    // Will connect to backend later
    navigate('/order-confirmation', {
      state: {
        phone,
        location,
        deliveryFee,
        subtotal,
        total,
        prepayment,
        items: cartItems,
      }
    });
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/shop')}>Browse Collection</button>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkout-inner">

        {/* Left — Form */}
        <div className="checkout-form">
          <div className="checkout-steps">
            <div className={`checkout-step ${step >= 1 ? 'active' : ''}`}>
              <span>1</span> Delivery
            </div>
            <div className="checkout-step-line" />
            <div className={`checkout-step ${step >= 2 ? 'active' : ''}`}>
              <span>2</span> Payment
            </div>
          </div>

          {step === 1 && (
            <div className="checkout-section">
              <h2 className="checkout-title">Delivery Details</h2>

              {/* Phone */}
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="+251 9XX XXX XXX"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
              </div>

              {/* Location */}
              <div className="form-group">
                <label>Delivery Location</label>
                <select
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className={errors.location ? 'error' : ''}
                >
                  <option value="">Select your location</option>
                  {DELIVERY_LOCATIONS.map(loc => (
                    <option key={loc.name} value={loc.name}>
                      {loc.name} {loc.fee > 0 ? `(+${loc.fee} ETB delivery)` : '(Free delivery)'}
                    </option>
                  ))}
                </select>
                {errors.location && <span className="error-msg">{errors.location}</span>}

                {/* Extra fee warning */}
                {hasExtraFee && (
                  <div className="fee-warning">
                    <span>⚠</span>
                    An additional delivery fee of <strong>{deliveryFee} ETB</strong> will apply for {location}.
                  </div>
                )}

                {location && !hasExtraFee && (
                  <div className="fee-success">
                    <span>✓</span>
                    Free delivery to {location}!
                  </div>
                )}
              </div>

              <button className="checkout-next-btn" onClick={handleNext}>
                Continue to Payment
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="checkout-section">
              <h2 className="checkout-title">Payment</h2>

              <div className="payment-info">
                <p className="payment-label">Required Prepayment (10%)</p>
                <div className="payment-amount">{prepayment} ETB</div>
                <p className="payment-instruction">
                  Please transfer <strong>{prepayment} ETB</strong> to the following account and upload the screenshot below.
                </p>

                <div className="payment-account">
                  <div className="account-row">
                    <span>Bank</span>
                    <span>Commercial Bank of Ethiopia</span>
                  </div>
                  <div className="account-row">
                    <span>Account Name</span>
                    <span>Alora Collections</span>
                  </div>
                  <div className="account-row">
                    <span>Account Number</span>
                    <span>1000XXXXXXXXXX</span>
                  </div>
                </div>

                {/* Screenshot upload */}
                <div className="form-group">
                  <label>Upload Payment Screenshot</label>
                  <div
                    className={`upload-area ${screenshotPreview ? 'has-preview' : ''}`}
                    onClick={() => document.getElementById('screenshot-input').click()}
                  >
                    {screenshotPreview ? (
                      <img src={screenshotPreview} alt="Payment receipt" className="upload-preview" />
                    ) : (
                      <>
                        <span className="upload-icon">↑</span>
                        <span>Click to upload receipt</span>
                        <span className="upload-sub">PNG, JPG up to 10MB</span>
                      </>
                    )}
                  </div>
                  <input
                    id="screenshot-input"
                    type="file"
                    accept="image/*"
                    onChange={handleScreenshot}
                    style={{ display: 'none' }}
                  />
                  {errors.screenshot && <span className="error-msg">{errors.screenshot}</span>}
                </div>
              </div>

              <div className="checkout-btn-row">
                <button className="checkout-back-btn" onClick={() => setStep(1)}>
                  ← Back
                </button>
                <button className="checkout-place-btn" onClick={handlePlaceOrder}>
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right — Order Summary */}
        <div className="checkout-summary">
          <h3 className="summary-title">Order Summary</h3>

          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <div className="summary-item-img"
                  style={{ background: item.image ? 'none' : 'linear-gradient(145deg, #c8a040, #5C4209)' }}>
                  {item.image
                    ? <img src={item.image} alt={item.name} />
                    : <span>✦</span>
                  }
                  <span className="summary-item-qty">{item.quantity}</span>
                </div>
                <div className="summary-item-info">
                  <div className="summary-item-name">{item.name}</div>
                  <div className="summary-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>{deliveryFee > 0 ? `${deliveryFee} ETB` : 'Free'}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row prepay">
              <span>Required Prepayment (10%)</span>
              <span>{prepayment} ETB</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}