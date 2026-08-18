import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRides } from '../../context/RidesContext';
import { StatusBadge } from '../common/StatusBadge';
import { formatCurrency, formatRelativeTime } from '../../utils/formatters';
import { ChevronRightIcon, CarIcon, ClockIcon } from '../common/Icons';

export const RecentRidesWidget: React.FC = () => {
  const { rides } = useRides();
  const navigate = useNavigate();

  const recentRides = rides.slice(0, 5);

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="card-header" style={{ marginBottom: 0 }}>
        <div>
          <h3 className="card-title">
            <ClockIcon size={20} style={{ color: 'var(--accent-cyan)' }} />
            Recent Dispatch Stream
          </h3>
          <p className="card-subtitle">
            Live ride bookings and fulfillment status
          </p>
        </div>

        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => navigate('/rides')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <span>View All Rides</span>
          <ChevronRightIcon size={16} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {recentRides.map(ride => (
          <div
            key={ride.id}
            onClick={() => navigate(`/rides/${ride.id}`)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            className="hover-highlight"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface-raised)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)'
                }}
              >
                <CarIcon size={18} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    {ride.id}
                  </strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>•</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {ride.customer.name}
                  </span>
                </div>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  {ride.pickup.address.split(',')[0]} → {ride.drop.address.split(',')[0]}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {formatCurrency(ride.fare.totalFare)}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {formatRelativeTime(ride.createdAt)}
                </div>
              </div>
              <StatusBadge status={ride.status} size="sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
