// App.jsx
import { useState } from 'react'
import InputBox from './components/InputBox'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(1)
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("INR")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const { data: currencyData, error } = useCurrencyInfo(fromCurrency)

  const currencyOptions = currencyData ? Object.keys(currencyData) : []

  const handleConvert = () => {
    if (!currencyData || !currencyData[toCurrency]) {
      alert("Conversion data not available.")
      return
    }
    const rate = currencyData[toCurrency]
    setConvertedAmount((amount * rate).toFixed(2))
  }

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setAmount(convertedAmount)
    setConvertedAmount(amount)
  }

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          💱 Currency Converter
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleConvert()
          }}
        >
          <InputBox
            label="From"
            amount={amount}
            onAmountChange={(val) => setAmount(val)}
            selectCurrency={fromCurrency}
            onCurrencyChange={(val) => setFromCurrency(val)}
            currencyOptions={currencyOptions}
          />

          <div className="flex justify-center my-4">
            <button
              type="button"
              onClick={handleSwap}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              🔁 Swap
            </button>
          </div>

          <InputBox
            label="To"
            amount={convertedAmount}
            amountDisable
            selectCurrency={toCurrency}
            onCurrencyChange={(val) => setToCurrency(val)}
            currencyOptions={currencyOptions}
          />

          <button
            type="submit"
            className="w-full mt-6 bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-700 transition"
          >
            Convert {fromCurrency} to {toCurrency}
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
