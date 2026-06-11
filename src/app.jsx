// App.jsx — defines all routes using createBrowserRouter 
// createBrowserRouter is preferred over BrowserRouter for better data handling

import { createBrowserRouter, Outlet } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Header from './components/Header'
import LoadingSpinner from './components/LoadingSpinner'

// ── Lazy load all page components for code splitting ──
// React.lazy means the component's JS is only downloaded when that route is visited
const ProductList = lazy(() => import('./pages/ProductList'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Layout component — renders Header on all valid routes via Outlet
function MainLayout() {
  return (
    <>
      <Header />
      {/* Suspense shows a fallback while the lazy component is loading */}
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
    </>
  )
}

// createBrowserRouter defines all routes and their components in one place
// Gives better data handling, error boundaries, and loader support
export const router = createBrowserRouter([
  {
    // MainLayout wraps all valid routes — Header is shown on these pages
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <ProductList />,
      },
      {
        // Dynamic route — :id is the product's id from the API
        path: '/product/:id',
        element: <ProductDetail />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
    ],
  },
  {
    // NotFound is outside MainLayout — no Header on the 404 page
    path: '*',
    element: <NotFound />,
  },
])