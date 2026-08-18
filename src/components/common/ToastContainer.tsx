import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckIcon, AlertCircleIcon, XIcon } from './Icons';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map(toast => {
        let Icon = CheckIcon;
        let iconColor = 'var(--accent-emerald)';

        if (toast.type === 'error') {
          Icon = AlertCircleIcon;
          iconColor = 'var(--accent-rose)';
        } else if (toast.type === 'warning') {
          Icon = AlertCircleIcon;
          iconColor = 'var(--accent-amber)';
        } else if (toast.type === 'info') {
          Icon = AlertCircleIcon;
          iconColor = 'var(--primary)';
        }

        return (
          <div key={toast.id} className={`toast-item ${toast.type}`}>
            <span style={{ color: iconColor, marginTop: '2px', flexShrink: 0 }}>
              <Icon size={18} />
            </span>
            <div className="toast-content">
              {toast.title && <div className="toast-title">{toast.title}</div>}
              <div className="toast-message">{toast.message}</div>
            </div>
            <button
              type="button"
              className="toast-close-btn"
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss toast"
            >
              <XIcon size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
