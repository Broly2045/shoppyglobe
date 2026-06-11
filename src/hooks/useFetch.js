// useFetch.js — custom hook for fetching data from any API endpoint
// Reusable across ProductList and ProductDetail components

import { useState, useEffect } from 'react'

function useFetch(url) {
  // Stores the fetched data
  const [data, setData] = useState(null)

  // Tracks loading state — true while request is in flight
  const [loading, setLoading] = useState(true)

  // Stores any error message if the fetch fails
  const [error, setError] = useState(null)

  useEffect(() => {
    // Reset states when url changes
    setLoading(true)
    setError(null)
    setData(null)

    // AbortController lets us cancel the fetch if the component unmounts
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal: controller.signal })

        // If server returns a non-ok status, throw a proper error
        if (!response.ok) {
          throw new Error(`Failed to fetch. Status: ${response.status}`)
        }

        const json = await response.json()
        setData(json)
      } catch (err) {
        // Ignore abort errors — they are expected on cleanup
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Cleanup — cancel the fetch if the component unmounts mid-request
    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}

export default useFetch