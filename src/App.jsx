import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(1)
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('INR')
  const [convertedAmount, setConvertedAmount] = useState(0)

  const { data: currencyData, error } = useCurrencyInfo(fromCurrency)
  const options = currencyData ? Object.keys(currencyData) : []

  const swap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setAmount(convertedAmount)
    setConvertedAmount(amount)
  }

  const convert = () => {
    if (!currencyData || !currencyData[toCurrency]) {
      alert('Conversion data not available.')
      return
    }
    const rate = currencyData[toCurrency].value
    const result = parseFloat(amount) * rate
    setConvertedAmount(result.toFixed(2))
  }

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">💱 Currency Converter</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            convert()
          }}
        >
          <InputBox
            label="From"
            amount={amount}
            onAmountChange={(val) => setAmount(val)}
            selectCurrency={fromCurrency}
            onCurrencyChange={(val) => setFromCurrency(val)}
            currencyOptions={options}
          />

          <div className="flex justify-center my-4">
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              onClick={swap}
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
            currencyOptions={options}
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
