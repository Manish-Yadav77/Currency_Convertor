import { useEffect, useState } from 'react'

function useCurrencyInfo(baseCurrency) {
  const [data, setData] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await fetch(
          `https://api.currencyapi.com/v3/latest?apikey=cur_live_7tbJChV0QCxQaiJX6S2tT3VIrYy3eZorFoKvCJrX&base_currency=${baseCurrency}`
        )
        const result = await response.json()
        if (result.data) {
          setData(result.data)
        } else {
          setError('Failed to fetch currency rates.')
        }
      } catch (err) {
        setError(err.message)
      }
    }

    if (baseCurrency) fetchCurrencyData()
  }, [baseCurrency])

  return { data, error }
}

export default useCurrencyInfo
