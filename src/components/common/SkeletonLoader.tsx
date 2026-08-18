import React from 'react';

interface SkeletonProps {
  type?: 'card' | 'table' | 'chart' | 'details';
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonProps> = ({ type = 'card', count = 1 }) => {
  if (type === 'card') {
    return (
      <div className="stat-cards-grid">
        {Array.from({ length: count || 6 }).map((_, i) => (
          <div key={i} className="stat-card" style={{ gap: '16px' }}>
            <div className="stat-card-top">
              <div className="skeleton-line" style={{ width: '40%', height: '14px' }} />
              <div className="skeleton-circle" style={{ width: '38px', height: '38px' }} />
            </div>
            <div className="skeleton-line" style={{ width: '65%', height: '28px' }} />
            <div className="skeleton-line" style={{ width: '50%', height: '12px' }} />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <div className="card" style={{ height: '360px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="flex-between">
          <div className="skeleton-line" style={{ width: '220px', height: '20px' }} />
          <div className="skeleton-line" style={{ width: '180px', height: '32px' }} />
        </div>
        <div className="skeleton-line" style={{ flex: 1, width: '100%', borderRadius: '12px' }} />
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '16px', display: 'flex', gap: '12px' }}>
          <div className="skeleton-line" style={{ width: '260px', height: '36px' }} />
          <div className="skeleton-line" style={{ width: '140px', height: '36px' }} />
          <div className="skeleton-line" style={{ width: '140px', height: '36px' }} />
        </div>
        <div style={{ padding: '0 16px 16px' }}>
          {Array.from({ length: count || 5 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0', borderBottom: '1px solid var(--border-color)' }}>
              <div className="skeleton-circle" style={{ width: '36px', height: '36px', flexShrink: 0 }} />
              <div className="skeleton-line" style={{ width: '20%', height: '16px' }} />
              <div className="skeleton-line" style={{ width: '25%', height: '16px' }} />
              <div className="skeleton-line" style={{ width: '15%', height: '16px' }} />
              <div className="skeleton-line" style={{ width: '15%', height: '16px' }} />
              <div className="skeleton-line" style={{ width: '10%', height: '16px' }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="skeleton-line" style={{ width: '40%', height: '24px' }} />
      <div className="skeleton-line" style={{ width: '100%', height: '140px' }} />
      <div className="skeleton-line" style={{ width: '70%', height: '20px' }} />
    </div>
  );
};
