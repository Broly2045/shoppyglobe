// main.jsx — entry point of the app
// Wraps the app in Redux Provider and renders the router

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { RouterProvider } from 'react-router-dom'
import { router } from './App'
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Redux store provided at the top level so all components can access it */}
    <Provider store={store}>
      {/* RouterProvider is how you use createBrowserRouter  */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)