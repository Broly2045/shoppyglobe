// CartItem.jsx — represents a single item in the cart
// Has quantity controls and a remove button
// All actions dispatch to Redux

import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from '../store/cartSlice'
import './CartItem.css'

function CartItem({ item }) {
  const dispatch = useDispatch()

  return (
    <div className="cart-item">

      {/* Product image */}
      <div className="cart-item__image">
        <img
          src={item.thumbnail}
          alt={item.title}
          loading="lazy"
        />
      </div>

      {/* Product info — title, category, unit price */}
      <div className="cart-item__info">
        <h3 className="cart-item__title">{item.title}</h3>
        <span className="cart-item__category">{item.category}</span>
        <p className="cart-item__unit-price">
          ${item.price.toFixed(2)} each
        </p>
      </div>

      {/* Quantity controls — decrease, count, increase */}
      {/* Quantity cannot go below 1 — enforced in the Redux reducer */}
      <div className="cart-item__quantity">
        <button
          className="cart-item__qty-btn"
          onClick={() => dispatch(decreaseQuantity(item.id))}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="cart-item__qty-value">{item.quantity}</span>
        <button
          className="cart-item__qty-btn"
          onClick={() => dispatch(increaseQuantity(item.id))}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* Line total — price × quantity */}
      <span className="cart-item__subtotal">
        ${(item.price * item.quantity).toFixed(2)}
      </span>

      {/* Remove button — removes item from cart entirely */}
      <button
        className="cart-item__remove"
        onClick={() => dispatch(removeFromCart(item.id))}
        aria-label={`Remove ${item.title} from cart`}
      >
        ✕
      </button>

    </div>
  )
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
}

export default CartItem