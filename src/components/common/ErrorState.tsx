import React from 'react';
import { ShieldAlertIcon, RefreshIcon } from './Icons';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Data Fetch Failed',
  message = 'An unexpected error occurred while communicating with the mobility server API.',
  onRetry
}) => {
  return (
    <div className="error-state-box animate-fade-in">
      <div className="error-state-icon">
        <ShieldAlertIcon size={32} />
      </div>
      <h4 className="error-state-title">{title}</h4>
      <p className="error-state-desc">{message}</p>
      {onRetry && (
        <button type="button" className="btn btn-primary btn-sm" onClick={onRetry} style={{ marginTop: '10px' }}>
          <RefreshIcon size={14} />
          Retry Request
        </button>
      )}
    </div>
  );
};
