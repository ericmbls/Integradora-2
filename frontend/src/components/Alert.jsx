import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import './Alert.css';

export function useAlert() {
  const [alert, setAlert] = useState(null);

  const showSuccess = (message, duration = 3000) => {
    setAlert({ type: 'success', message });
    setTimeout(() => setAlert(null), duration);
  };

  const showError = (message, duration = 3000) => {
    setAlert({ type: 'error', message });
    setTimeout(() => setAlert(null), duration);
  };

  const showInfo = (message, duration = 3000) => {
    setAlert({ type: 'info', message });
    setTimeout(() => setAlert(null), duration);
  };

  const dismiss = () => setAlert(null);

  return { alert, showSuccess, showError, showInfo, dismiss };
}

export function Alert({ alert, onDismiss }) {
  if (!alert) return null;

  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    info: <Info size={20} />,
  };

  return (
    <div className={`alert alert-${alert.type}`}>
      <div className="alert-content">
        {icons[alert.type]}
        <span>{alert.message}</span>
      </div>
      <button className="alert-close" onClick={onDismiss}>
        <X size={18} />
      </button>
    </div>
  );
}
