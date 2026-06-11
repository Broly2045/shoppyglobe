// App.jsx — defines all routes using createBrowserRouter 
// All components are lazy loaded using React.lazy for code splitting

import { createBrowserRouter, Outlet } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// ── Lazy load ALL components and pages ──
const Header = lazy(() => import('./components/Header'))
const LoadingSpinner = lazy(() => import('./components/LoadingSpinner'))
const ProductList = lazy(() => import('./pages/ProductList'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Layout component — renders Header + child page via Outlet
// Suspense wraps everything so any lazy component shows the spinner while loading
function MainLayout() {
  return (
    // Suspense at layout level catches lazy loads for both Header and pages
    <Suspense fallback={<div className="spinner-wrapper"><div className="spinner" /></div>}>
      <Header />
      <Outlet />
    </Suspense>
  )
}

// createBrowserRouter — React Router v7 recommended approach
export const router = createBrowserRouter([
  {
    // All valid routes rendered inside MainLayout (with Header)
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<div className="spinner-wrapper"><div className="spinner" /></div>}>
            <ProductList />
          </Suspense>
        ),
      },
      {
        // Dynamic route — :id maps to a product's id from the API
        path: '/product/:id',
        element: (
          <Suspense fallback={<div className="spinner-wrapper"><div className="spinner" /></div>}>
            <ProductDetail />
          </Suspense>
        ),
      },
      {
        path: '/cart',
        element: (
          <Suspense fallback={<div className="spinner-wrapper"><div className="spinner" /></div>}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: '/checkout',
        element: (
          <Suspense fallback={<div className="spinner-wrapper"><div className="spinner" /></div>}>
            <Checkout />
          </Suspense>
        ),
      },
    ],
  },
  {
    // 404 — outside MainLayout so Header is NOT rendered
    path: '*',
    element: (
      <Suspense fallback={<div className="spinner-wrapper"><div className="spinner" /></div>}>
        <NotFound />
      </Suspense>
    ),
  },
])