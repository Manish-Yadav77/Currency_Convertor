import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await fetch(
          `https://api.currencyapi.com/v3/latest?apikey=cur_live_7tbJChV0QCxQaiJX6S2tT3VIrYy3eZorFoKvCJrX`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch currency data");
        }

        const result = await response.json();
        if (result.data && result.data[currency]) {
          setData(result.data);
        } else {
          setError(`Currency data for '${currency}' not available.`);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    if (currency) {
      fetchCurrencyData();
    }
  }, [currency]);

  return { data, error };
}

export default useCurrencyInfo;

