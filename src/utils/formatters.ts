import { RideStatus, VehicleType } from '../types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num);
};

export const formatCompactNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN', {
    notation: 'compact',
    compactDisplay: 'short'
  }).format(num);
};

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  } catch {
    return dateString;
  }
};

export const formatDateTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  } catch {
    return dateString;
  }
};

export const formatRelativeTime = (dateString: string): string => {
  try {
    const now = new Date('2026-08-18T20:15:00Z').getTime();
    const target = new Date(dateString).getTime();
    const diffSec = Math.floor((now - target) / 1000);

    if (diffSec < 60) return 'Just now';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    if (diffSec < 604800) return `${Math.floor(diffSec / 86400)}d ago`;
    return formatDate(dateString);
  } catch {
    return dateString;
  }
};

export const getStatusBadgeStyle = (status: RideStatus) => {
  switch (status) {
    case 'Completed':
      return {
        bg: 'var(--status-completed-bg)',
        color: 'var(--status-completed-text)',
        border: 'var(--status-completed-border)',
        dot: 'var(--status-completed-dot)'
      };
    case 'Ongoing':
      return {
        bg: 'var(--status-ongoing-bg)',
        color: 'var(--status-ongoing-text)',
        border: 'var(--status-ongoing-border)',
        dot: 'var(--status-ongoing-dot)'
      };
    case 'Cancelled':
      return {
        bg: 'var(--status-cancelled-bg)',
        color: 'var(--status-cancelled-text)',
        border: 'var(--status-cancelled-border)',
        dot: 'var(--status-cancelled-dot)'
      };
    case 'Pending':
      return {
        bg: 'var(--status-pending-bg)',
        color: 'var(--status-pending-text)',
        border: 'var(--status-pending-border)',
        dot: 'var(--status-pending-dot)'
      };
    default:
      return {
        bg: 'var(--bg-tertiary)',
        color: 'var(--text-secondary)',
        border: 'var(--border-subtle)',
        dot: 'var(--text-muted)'
      };
  }
};

export const getVehicleBadgeColor = (type: VehicleType) => {
  switch (type) {
    case 'Premium':
      return { bg: 'rgba(99, 102, 241, 0.08)', color: '#6366f1', border: 'rgba(99, 102, 241, 0.2)' };
    case 'SUV':
      return { bg: 'rgba(14, 165, 233, 0.08)', color: '#0ea5e9', border: 'rgba(14, 165, 233, 0.2)' };
    case 'Sedan':
      return { bg: 'rgba(16, 185, 129, 0.08)', color: '#10b981', border: 'rgba(16, 185, 129, 0.2)' };
    case 'Auto':
      return { bg: 'rgba(245, 158, 11, 0.08)', color: '#d97706', border: 'rgba(245, 158, 11, 0.2)' };
    case 'Bike':
      return { bg: 'rgba(236, 72, 153, 0.08)', color: '#db2777', border: 'rgba(236, 72, 153, 0.2)' };
    default:
      return { bg: 'rgba(107, 114, 128, 0.08)', color: '#6b7280', border: 'rgba(107, 114, 128, 0.2)' };
  }
};
