// ProductDetail.jsx — shows full details of a single product
// Uses the useFetch hook with a dynamic URL built from the route parameter :id
// Fetches fresh data from the API based on the product id in the URL

import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useFetch from '../hooks/useFetch'
import { addToCart, selectCartItems } from '../store/cartSlice'
import LoadingSpinner from '../components/LoadingSpinner'
import './ProductDetail.jsx'

function ProductDetail() {
  // Get the dynamic :id from the URL — e.g. /product/5 gives id = "5"
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Fetch this specific product's details from the API using the id
  const { data: product, loading, error } = useFetch(
    `https://dummyjson.com/products/${id}`
  )

  // Check if product is already in cart
  const cartItems = useSelector(selectCartItems)
  const isInCart = cartItems.some((item) => item.id === product?.id)

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  // Show spinner while fetching
  if (loading) return <LoadingSpinner />

  // Graceful error handling — show message if fetch fails
  if (error) {
    return (
      <div className="detail__error">
        <h2>Failed to load product</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    )
  }

  return (
    <main className="detail">
      <div className="detail__inner">

        {/* Back button */}
        <button
          className="detail__back"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="detail__layout">

          {/* Left — image gallery */}
          <div className="detail__images">
            {/* Main product image */}
            <div className="detail__main-image">
              <img
                src={product.thumbnail}
                alt={product.title}
                loading="lazy"
              />
            </div>
            {/* Thumbnail strip — shows extra product images */}
            {product.images?.length > 1 && (
              <div className="detail__thumbnails">
                {product.images.map((img, index) => (
                  <div key={index} className="detail__thumb">
                    <img src={img} alt={`${product.title} view ${index + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right — product info */}
          <div className="detail__info">

            {/* Category */}
            <span className="detail__category">{product.category}</span>

            {/* Title */}
            <h1 className="detail__title">{product.title}</h1>

            {/* Brand */}
            {product.brand && (
              <p className="detail__brand">by {product.brand}</p>
            )}

            {/* Star rating + numeric score */}
            <div className="detail__rating">
              <div className="stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={i < Math.round(product.rating) ? 'star star--filled' : 'star'}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="detail__rating-value">
                {product.rating.toFixed(1)} / 5
              </span>
            </div>

            {/* Price */}
            <div className="detail__price-row">
              <span className="detail__price">
                ${product.price.toFixed(2)}
              </span>
              {/* Show discount percentage if available */}
              {product.discountPercentage > 0 && (
                <span className="detail__discount">
                  -{product.discountPercentage.toFixed(0)}% OFF
                </span>
              )}
            </div>

            {/* Description */}
            <p className="detail__description">{product.description}</p>

            {/* Stock availability */}
            <p className={`detail__stock ${product.stock === 0 ? 'detail__stock--out' : ''}`}>
              {product.stock === 0
                ? 'Out of stock'
                : `${product.stock} items available`}
            </p>

            {/* Add to Cart button */}
            <button
              className={`detail__btn ${isInCart ? 'detail__btn--added' : ''}`}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {isInCart ? 'Added to Cart ✓' : 'Add to Cart'}
            </button>

          </div>
        </div>

        {/* Reviews section */}
        {product.reviews?.length > 0 && (
          <div className="detail__reviews">
            <h2 className="detail__reviews-title">Customer Reviews</h2>
            <div className="detail__reviews-grid">
              {product.reviews.map((review, index) => (
                <div key={index} className="detail__review-card">
                  <div className="detail__review-header">
                    <span className="detail__reviewer">{review.reviewerName}</span>
                    {/* Star rating for each review */}
                    <div className="stars">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={i < review.rating ? 'star star--filled' : 'star'}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="detail__review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  )
}

export default ProductDetail