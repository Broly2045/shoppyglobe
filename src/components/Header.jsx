// Header.jsx — navigation bar with logo, search bar, and cart icon

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartCount, selectSearchQuery, setSearchQuery } from '../store/cartSlice'
import './Header.css'

function Header() {
  const dispatch = useDispatch()

  // Get total number of items in cart for the badge
  const cartCount = useSelector(selectCartCount)

  // Get current search query from Redux state
  const searchQuery = useSelector(selectSearchQuery)

  // Dispatch search query to Redux on every keystroke
  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value))
  }

  return (
    <header className="header">
      <div className="header__inner">

        {/* Logo — clicking takes you back to home */}
        <Link to="/" className="header__logo">
          ShoppyGlobe
        </Link>

        {/* Search bar — updates Redux searchQuery state on every keystroke */}
        <div className="header__search">
          <span className="header__search-icon">⌕</span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            className="header__search-input"
            aria-label="Search products"
          />
          {/* Clear button — only shows when there is a query */}
          {searchQuery && (
            <button
              className="header__search-clear"
              onClick={() => dispatch(setSearchQuery(''))}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Cart icon with item count badge */}
        <Link to="/cart" className="header__cart" aria-label="View cart">
          <span className="header__cart-icon">🛒</span>
          {/* Badge only shows when cart has items */}
          {cartCount > 0 && (
            <span className="header__cart-badge">{cartCount}</span>
          )}
        </Link>

      </div>
    </header>
  )
}

export default Header