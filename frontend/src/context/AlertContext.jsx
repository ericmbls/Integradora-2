import { createContext, useState, useCallback } from 'react';

export const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);

  const showSuccess = useCallback((message, duration = 3000) => {
    setAlert({ type: 'success', message });
    if (duration > 0) {
      setTimeout(() => setAlert(null), duration);
    }
  }, []);

  const showError = useCallback((message, duration = 3000) => {
    setAlert({ type: 'error', message });
    if (duration > 0) {
      setTimeout(() => setAlert(null), duration);
    }
  }, []);

  const showInfo = useCallback((message, duration = 3000) => {
    setAlert({ type: 'info', message });
    if (duration > 0) {
      setTimeout(() => setAlert(null), duration);
    }
  }, []);

  const dismiss = useCallback(() => {
    setAlert(null);
  }, []);

  const value = {
    alert,
    showSuccess,
    showError,
    showInfo,
    dismiss,
  };

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
}
