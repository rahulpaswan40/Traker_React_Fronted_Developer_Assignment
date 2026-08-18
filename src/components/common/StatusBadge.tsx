import React from 'react';
import { RideStatus } from '../../types';

interface StatusBadgeProps {
  status: RideStatus | 'Online' | 'Offline';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const statusClass = `badge badge-${status.toLowerCase()} ${size === 'sm' ? 'badge-sm' : ''}`;

  return (
    <span className={statusClass}>
      <span className="badge-dot" />
      {status}
    </span>
  );
};
