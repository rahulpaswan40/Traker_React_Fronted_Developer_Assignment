import React from 'react';
import { SearchIcon, RefreshIcon } from './Icons';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records found',
  description = 'There are no matching items for your active filter criteria.',
  actionText = 'Reset Filters',
  onAction,
  icon
}) => {
  return (
    <div className="empty-state-box animate-fade-in">
      <div className="empty-state-icon">
        {icon || <SearchIcon size={28} />}
      </div>
      <h4 className="empty-state-title">{title}</h4>
      <p className="empty-state-desc">{description}</p>
      {onAction && (
        <button type="button" className="btn btn-secondary btn-sm" onClick={onAction} style={{ marginTop: '8px' }}>
          <RefreshIcon size={14} />
          {actionText}
        </button>
      )}
    </div>
  );
};
