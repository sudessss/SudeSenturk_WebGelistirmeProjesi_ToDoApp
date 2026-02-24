import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (err) {
      console.error(`LocalStorage okuma hatası (${key}):`, err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.error(`LocalStorage yazma hatası (${key}):`, err);
    }
  }, [key, state]);

  return [state, setState];
}