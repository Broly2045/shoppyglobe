// Checkout.jsx — dummy form to collect user details with a cart summary
// On clicking "Place Order", shows success message, clears cart, redirects home

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from '../store/cartSlice'
import './Checkout.css'

// Initial empty form state
const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  zipCode: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
}

function Checkout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Read cart data from Redux
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)

  // Local form state
  const [form, setForm] = useState(INITIAL_FORM)

  // Validation errors per field
  const [errors, setErrors] = useState({})

  // Controls whether the success message is shown
  const [orderPlaced, setOrderPlaced] = useState(false)

  // Update form field and clear its error on change
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // Validate all fields before placing order
  const validate = () => {
    const newErrors = {}

    if (!form.firstName.trim())
      newErrors.firstName = 'First name is required'
    if (!form.lastName.trim())
      newErrors.lastName = 'Last name is required'
    if (!form.email.trim())
      newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = 'Enter a valid email'
    if (!form.phone.trim())
      newErrors.phone = 'Phone number is required'
    if (!form.address.trim())
      newErrors.address = 'Address is required'
    if (!form.city.trim())
      newErrors.city = 'City is required'
    if (!form.zipCode.trim())
      newErrors.zipCode = 'ZIP code is required'
    if (!form.cardNumber.trim())
      newErrors.cardNumber = 'Card number is required'
    else if (form.cardNumber.replace(/\s/g, '').length !== 16)
      newErrors.cardNumber = 'Enter a valid 16-digit card number'
    if (!form.cardExpiry.trim())
      newErrors.cardExpiry = 'Expiry date is required'
    if (!form.cardCvc.trim())
      newErrors.cardCvc = 'CVC is required'

    return newErrors
  }

  // Handle Place Order click
  const handlePlaceOrder = () => {
    const validationErrors = validate()

    // If errors exist, show them and stop
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // Show "Order placed" message
    setOrderPlaced(true)

    // Clear the cart in Redux
    dispatch(clearCart())

    // Redirect to home page after 2.5 seconds
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }

  // If cart is empty and order not placed, redirect to home
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="checkout__empty">
        <h2>Your cart is empty</h2>
        <p>Add products before checking out</p>
        <button onClick={() => navigate('/')}>Browse Products</button>
      </div>
    )
  }

  // Order success state
  if (orderPlaced) {
    return (
      <div className="checkout__success">
        <div className="checkout__success-icon">✓</div>
        <h2>Order Placed!</h2>
        <p>Thank you for your purchase. Redirecting you to home...</p>
      </div>
    )
  }

  return (
    <main className="checkout">
      <div className="checkout__inner">

        <h1 className="checkout__title">Checkout</h1>

        <div className="checkout__layout">

          {/* Left — user details form */}
          <div className="checkout__form">

            {/* Personal details section */}
            <div className="checkout__section">
              <h2 className="checkout__section-title">Personal Details</h2>

              <div className="checkout__row">
                <div className={`checkout__field ${errors.firstName ? 'has-error' : ''}`}>
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <span className="checkout__error">{errors.firstName}</span>
                  )}
                </div>
                <div className={`checkout__field ${errors.lastName ? 'has-error' : ''}`}>
                  <label>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <span className="checkout__error">{errors.lastName}</span>
                  )}
                </div>
              </div>

              <div className="checkout__row">
                <div className={`checkout__field ${errors.email ? 'has-error' : ''}`}>
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <span className="checkout__error">{errors.email}</span>
                  )}
                </div>
                <div className={`checkout__field ${errors.phone ? 'has-error' : ''}`}>
                  <label>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 234 567 8900"
                  />
                  {errors.phone && (
                    <span className="checkout__error">{errors.phone}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping address section */}
            <div className="checkout__section">
              <h2 className="checkout__section-title">Shipping Address</h2>

              <div className={`checkout__field ${errors.address ? 'has-error' : ''}`}>
                <label>Street Address *</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="123 Main Street"
                />
                {errors.address && (
                  <span className="checkout__error">{errors.address}</span>
                )}
              </div>

              <div className="checkout__row">
                <div className={`checkout__field ${errors.city ? 'has-error' : ''}`}>
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="New York"
                  />
                  {errors.city && (
                    <span className="checkout__error">{errors.city}</span>
                  )}
                </div>
                <div className={`checkout__field ${errors.zipCode ? 'has-error' : ''}`}>
                  <label>ZIP Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={form.zipCode}
                    onChange={handleChange}
                    placeholder="10001"
                  />
                  {errors.zipCode && (
                    <span className="checkout__error">{errors.zipCode}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Payment details section */}
            <div className="checkout__section">
              <h2 className="checkout__section-title">Payment Details</h2>

              <div className={`checkout__field ${errors.cardNumber ? 'has-error' : ''}`}>
                <label>Card Number *</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                {errors.cardNumber && (
                  <span className="checkout__error">{errors.cardNumber}</span>
                )}
              </div>

              <div className="checkout__row">
                <div className={`checkout__field ${errors.cardExpiry ? 'has-error' : ''}`}>
                  <label>Expiry Date *</label>
                  <input
                    type="text"
                    name="cardExpiry"
                    value={form.cardExpiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                  {errors.cardExpiry && (
                    <span className="checkout__error">{errors.cardExpiry}</span>
                  )}
                </div>
                <div className={`checkout__field ${errors.cardCvc ? 'has-error' : ''}`}>
                  <label>CVC *</label>
                  <input
                    type="text"
                    name="cardCvc"
                    value={form.cardCvc}
                    onChange={handleChange}
                    placeholder="123"
                    maxLength={3}
                  />
                  {errors.cardCvc && (
                    <span className="checkout__error">{errors.cardCvc}</span>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Right — cart summary */}
          <div className="checkout__summary">
            <h2 className="checkout__summary-title">Order Summary</h2>

            {/* List of products in cart */}
            <div className="checkout__summary-items">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout__summary-item">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    loading="lazy"
                  />
                  <div className="checkout__summary-item-info">
                    <span className="checkout__summary-item-title">
                      {item.title}
                    </span>
                    <span className="checkout__summary-item-qty">
                      Qty: {item.quantity}
                    </span>
                  </div>
                  <span className="checkout__summary-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="checkout__summary-divider" />

            {/* Order total */}
            <div className="checkout__summary-total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            {/* Place Order button */}
            <button
              className="checkout__place-btn"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>

          </div>
        </div>
      </div>
    </main>
  )
}

export default Checkout