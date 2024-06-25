import { useEffect } from 'react';
import { create } from 'zustand';

/**
 * Currency store and hooks to manage the currency selected by the user.
 * ! Using 'useCurrency' hook in header to fetch exchange rate and set currency sign to store based on user choice.
 * ? If EUR selected, fetch exchange rate from USD to EUR and set currency sign to Euro sign.
 * ? If USD selected, set exchange rate to 1 and set currency sign to Dollar sign.
 * ! In other places using 'useCurrencyStore' hook to get and set currency selected from/to store directly.
 */

enum CurrencyEnum {
  EUR = 'EUR',
  USD = 'USD'
};

type State = {
  exchangeRate: number;
  setExchangeRate: (value: number) => void;
  currencySelected: CurrencyEnum;
  setCurrencySelected: (value: CurrencyEnum) => void;
  currencySign: string;
  setCurrencySign: (value: string) => void;
};

const getCookie = (name: string) => {
  if (typeof window !== 'undefined') {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) return parts.pop()?.split(';').shift();
  }
};

const useCurrencyStore = create<State>((set) => ({
  exchangeRate: 1,
  setExchangeRate: (value: number) => set(() => ({ exchangeRate: value })),
  currencySelected: (getCookie('currency') as CurrencyEnum) || CurrencyEnum.USD,
  setCurrencySelected: (value: CurrencyEnum) => {
    const date = new Date();
    date.setTime(date.getTime() + (365*24*60*60*1000)); // 365 days
    const expires = '; expires=' + date.toUTCString();
    document.cookie = `currency=${value}; path=/;${expires}`;
    set(() => ({ currencySelected: value }));
  },
  currencySign: '$',
  setCurrencySign: (value: string) => set(() => ({ currencySign: value })),
}));

const useCurrency = () => {
  const currencySelected = useCurrencyStore((state) => state.currencySelected);
  const setExchangeRate = useCurrencyStore((state) => state.setExchangeRate);
  const setCurrencySign = useCurrencyStore((state) => state.setCurrencySign);

  useEffect(() => {
    if (currencySelected === CurrencyEnum.EUR) {
      // TODO: replace with backend endpoint
      fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => response.json())
        .then(data => {
          setExchangeRate(data.rates.EUR);
          setCurrencySign('\u20AC'); // Euro sign
        })
        .catch(error => console.error('Error:', error));
    } else if (currencySelected === CurrencyEnum.USD) {
      setExchangeRate(1);
      setCurrencySign('$'); // Dollar sign
    }
  }, [currencySelected, setExchangeRate, setCurrencySign]);
};

export { useCurrency, useCurrencyStore, CurrencyEnum };