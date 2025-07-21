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

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const handleConvert = () => {
    if (!currencyData || !currencyData[toCurrency]) {
      alert("Conversion rate not available.")
      return
    }
    const rate = currencyData[toCurrency]
    setConvertedAmount((amount * rate).toFixed(2))
  }

  const currencyOptions = currencyData ? Object.keys(currencyData) : []

  if (error) return <p className="text-red-500 text-center mt-10">Error: {error}</p>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-500 to-indigo-600 p-4">
      <div className="bg-white/30 backdrop-blur-xl rounded-2xl p-8 shadow-lg w-full max-w-xl">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          🌐 Currency Converter
        </h1>
        <form onSubmit={(e) => { e.preventDefault(); handleConvert() }}>
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
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              onClick={handleSwap}
            >
              🔄 Swap
            </button>
          </div>

          <InputBox
            label="To"
            amount={convertedAmount}
            selectCurrency={toCurrency}
            onCurrencyChange={(val) => setToCurrency(val)}
            currencyOptions={currencyOptions}
            amountDisable
          />

          <button
            type="submit"
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
          >
            Convert {fromCurrency} to {toCurrency}
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
