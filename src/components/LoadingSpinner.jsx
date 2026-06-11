// LoadingSpinner.jsx — shown while lazy-loaded components are being fetched

function LoadingSpinner() {
  return (
    <div className="spinner-wrapper">
      <div className="spinner" />
    </div>
  )
}

export default LoadingSpinner