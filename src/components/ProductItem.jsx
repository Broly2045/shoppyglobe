// ProductItem.jsx — single product card displayed in the ProductList grid
// Shows image, category, title, star rating, availability and price
// Has an "Add to Cart" button that dispatches to Redux

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { addToCart, selectCartItems } from '../store/cartSlice'
import './ProductItem.css'

// Helper — renders star icons based on a numeric rating out of 5
function StarRating({ rating }) {
  return (
    <div className="stars" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < Math.round(rating) ? 'star star--filled' : 'star'}
        >
          ★
        </span>
      ))}
    </div>
  )
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
}

function ProductItem({ product }) {
  const dispatch = useDispatch()

  // Check if this product is already in the cart
  const cartItems = useSelector(selectCartItems)
  const isInCart = cartItems.some((item) => item.id === product.id)

  // Dispatch addToCart action with the full product object
  const handleAddToCart = (e) => {
    // Prevent click from bubbling up to the Link wrapper
    e.preventDefault()
    dispatch(addToCart(product))
  }

  return (
    // Clicking the card navigates to the product detail page
    <Link to={`/product/${product.id}`} className="product-item">

      {/* Product image — lazy loaded for performance */}
      <div className="product-item__image-wrap">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-item__image"
          loading="lazy"
        />
        {/* Category badge — top right of image like in reference */}
        <span className="product-item__category">{product.category}</span>
      </div>

      {/* Card body */}
      <div className="product-item__body">

        {/* Product title */}
        <h3 className="product-item__title">{product.title}</h3>

        {/* Star rating row */}
        <div className="product-item__rating">
          <StarRating rating={product.rating} />
        </div>

        {/* Availability — shows stock count or Sold Out */}
        <p className={`product-item__stock ${product.stock === 0 ? 'product-item__stock--out' : ''}`}>
          {product.stock === 0
            ? 'Sold out!'
            : `${product.stock} in stock`}
        </p>

        {/* Price and Add to Cart button row */}
        <div className="product-item__footer">
          <span className="product-item__price">
            ${product.price.toFixed(2)}
          </span>
          <button
            className={`product-item__btn ${isInCart ? 'product-item__btn--added' : ''}`}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            aria-label={`Add ${product.title} to cart`}
          >
            {isInCart ? 'Added ✓' : '+ Cart'}
          </button>
        </div>

      </div>
    </Link>
  )
}

// PropTypes ensure the correct data shape is passed from ProductList
ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
}

export default ProductItem