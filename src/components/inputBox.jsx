import React, { useId } from 'react'

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = 'USD',
  amountDisable = false,
  currencyDisable = false,
  className = '',
}) {
  const amountInputId = useId()

  return (
    <div className={`bg-gray-50 p-4 rounded-lg mb-3 flex flex-col md:flex-row items-center gap-4 ${className}`}>
      <div className="flex-1 w-full">
        <label htmlFor={amountInputId} className="block text-sm text-gray-600 mb-1">
          {label}
        </label>
        <input
          id={amountInputId}
          className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          type="number"
          placeholder="Enter amount"
          disabled={amountDisable}
          value={amount}
          onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
        />
      </div>
      <div className="w-full md:w-1/3">
        <label className="block text-sm text-gray-600 mb-1">Currency</label>
        <select
          className="w-full p-2 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default InputBox
