// Cart.jsx — displays all items in the cart with a summary and checkout link
// Reads cart items and total from Redux selectors

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCartItems, selectCartTotal } from '../store/cartSlice'
import CartItem from '../components/CartItem'
import './Cart.css'

function Cart() {
  // Get all cart items and the total price from Redux
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="cart__empty">
        <span className="cart__empty-icon">🛒</span>
        <h2>Your cart is empty</h2>
        <p>Add some products to get started</p>
        <Link to="/" className="cart__empty-btn">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <main className="cart">
      <div className="cart__inner">

        <h1 className="cart__title">Your Cart</h1>
        <p className="cart__item-count">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>

        <div className="cart__layout">

          {/* Left — list of cart items */}
          {/* Each CartItem gets item.id as the unique key */}
          <div className="cart__items">
            <div className="cart__items-header">
              <span>Product</span>
              <span></span>
              <span>Quantity</span>
              <span>Total</span>
              <span></span>
            </div>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Right — order summary */}
          <div className="cart__summary">
            <h2 className="cart__summary-title">Order Summary</h2>

            {/* Line items breakdown */}
            <div className="cart__summary-lines">
              {cartItems.map((item) => (
                <div key={item.id} className="cart__summary-line">
                  <span className="cart__summary-name">
                    {item.title} × {item.quantity}
                  </span>
                  <span className="cart__summary-amount">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="cart__summary-divider" />

            {/* Total */}
            <div className="cart__summary-total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            {/* Proceed to checkout */}
            <Link to="/checkout" className="cart__checkout-btn">
              Proceed to Checkout
            </Link>

            {/* Continue shopping link */}
            <Link to="/" className="cart__continue">
              ← Continue Shopping
            </Link>
          </div>

        </div>
      </div>
    </main>
  )
}

export default Cart