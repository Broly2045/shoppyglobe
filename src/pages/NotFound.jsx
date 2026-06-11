// NotFound.jsx — 404 page shown for any unknown/undefined routes
// Displays the invalid URL the user tried to visit
// No Header is rendered on this page (it is outside MainLayout in App.jsx)

import { useLocation, Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  // useLocation gives us the current URL object
  // We use pathname to display exactly what invalid route was visited
  const location = useLocation()

  return (
    <div className="notfound">

      {/* Decorative background grid */}
      <div className="notfound__bg" aria-hidden="true" />

      <div className="notfound__content">

        {/* Large 404 display */}
        <h1 className="notfound__code">404</h1>

        {/* Error heading */}
        <h2 className="notfound__title">Page Not Found</h2>

        {/* Description with the exact invalid URL displayed */}
        <p className="notfound__desc">
          The page{' '}
          <code className="notfound__url">{location.pathname}</code>{' '}
          does not exist or has been moved.
        </p>

        {/* Error details block */}
        <div className="notfound__details">
          <div className="notfound__detail-row">
            <span className="notfound__detail-label">Error Code</span>
            <span className="notfound__detail-value">404 NOT FOUND</span>
          </div>
          <div className="notfound__detail-row">
            <span className="notfound__detail-label">Requested URL</span>
            <span className="notfound__detail-value">{location.pathname}</span>
          </div>
          <div className="notfound__detail-row">
            <span className="notfound__detail-label">Suggestion</span>
            <span className="notfound__detail-value">
              Check the URL or return to home
            </span>
          </div>
        </div>

        {/* Link back to Home page */}
        <Link to="/" className="notfound__btn">
          ← Back to Home
        </Link>

      </div>
    </div>
  )
}

export default NotFound