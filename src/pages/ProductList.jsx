// ProductList.jsx — home page that displays all products in a grid
// Uses the custom useFetch hook to load products from the API
// Filters products based on the Redux search query

import { useSelector, useDispatch } from 'react-redux'
import { lazy, Suspense } from 'react'
import useFetch from '../hooks/useFetch'
import { selectSearchQuery } from '../store/cartSlice'
import LoadingSpinner from '../components/LoadingSpinner'
import './ProductList.css'

// Lazy load ProductItem so each card is code-split
const ProductItem = lazy(() => import('../components/ProductItem'))

function ProductList() {
  const dispatch = useDispatch()

  // Fetch all products from the API when component mounts
  const { data, loading, error } = useFetch('https://dummyjson.com/products')

  // Read the search query from Redux state
  const searchQuery = useSelector(selectSearchQuery)

  // Filter products by title or description based on search query
  const filteredProducts = data?.products?.filter((product) => {
    const query = searchQuery.toLowerCase()
    return (
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    )
  })

  // Show spinner while loading
  if (loading) return <LoadingSpinner />

  // Show error message if fetch failed — graceful error handling
  if (error) {
    return (
      <div className="productlist__error">
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    )
  }

  return (
    <main className="productlist">
      <div className="productlist__inner">

        {/* Page heading and result count */}
        <div className="productlist__header">
          <h1 className="productlist__title">
            {searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
          </h1>
          <span className="productlist__count">
            {filteredProducts?.length} results
          </span>
        </div>

        {/* Empty state — shown when search finds nothing */}
        {filteredProducts?.length === 0 ? (
          <div className="productlist__empty">
            <p>No products found for "<strong>{searchQuery}</strong>"</p>
          </div>
        ) : (
          // Product grid — each ProductItem gets a unique key from product.id
          <div className="productlist__grid">
            <Suspense fallback={<LoadingSpinner />}>
              {filteredProducts?.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                />
              ))}
            </Suspense>
          </div>
        )}

      </div>
    </main>
  )
}

export default ProductList