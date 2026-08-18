import React from 'react';
import { Driver } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { formatCurrency, getVehicleBadgeColor } from '../../utils/formatters';
import { StarIcon, CarIcon, EyeIcon } from '../common/Icons';
import { useRides } from '../../context/RidesContext';

interface DriverCardProps {
  driver: Driver;
  onSelect: (driver: Driver) => void;
}

export const DriverCard: React.FC<DriverCardProps> = ({ driver, onSelect }) => {
  const { toggleDriverStatus } = useRides();
  const vehicleStyle = getVehicleBadgeColor(driver.vehicleType);

  return (
    <div
      className="card"
      onClick={() => onSelect(driver)}
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        padding: '18px'
      }}
    >
      <div className="flex-between">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src={driver.avatar}
            alt={driver.name}
            style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
              {driver.name}
            </span>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
              {driver.id} • {driver.joinedDate}
            </span>
          </div>
        </div>

        <div onClick={e => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => toggleDriverStatus(driver.id)}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <StatusBadge status={driver.status} size="sm" />
          </button>
        </div>
      </div>

      {/* Vehicle Spec */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 12px',
          backgroundColor: 'var(--bg-input)',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.82rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CarIcon size={16} style={{ color: 'var(--primary)' }} />
          <span>{driver.vehicle}</span>
        </div>
        <span
          className="vehicle-tag"
          style={{
            backgroundColor: vehicleStyle.bg,
            color: vehicleStyle.color,
            borderColor: vehicleStyle.border
          }}
        >
          {driver.vehicleType}
        </span>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid-3" style={{ gap: '8px', textAlign: 'center' }}>
        <div style={{ padding: '8px', backgroundColor: 'var(--bg-surface-raised)', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
            <StarIcon size={12} style={{ color: '#fbbf24' }} />
            <strong style={{ fontSize: '0.86rem', color: 'var(--text-primary)' }}>{driver.rating}</strong>
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Rating</span>
        </div>

        <div style={{ padding: '8px', backgroundColor: 'var(--bg-surface-raised)', borderRadius: 'var(--radius-sm)' }}>
          <strong style={{ fontSize: '0.86rem', color: 'var(--text-primary)', display: 'block' }}>{driver.totalRides}</strong>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Trips</span>
        </div>

        <div style={{ padding: '8px', backgroundColor: 'var(--bg-surface-raised)', borderRadius: 'var(--radius-sm)' }}>
          <strong style={{ fontSize: '0.86rem', color: 'var(--text-primary)', display: 'block' }}>
            {formatCurrency(driver.earningsToday)}
          </strong>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Today</span>
        </div>
      </div>

      <div className="flex-between" style={{ paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          📍 {driver.currentLocation.split(',')[0]}
        </span>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={e => {
            e.stopPropagation();
            onSelect(driver);
          }}
        >
          <EyeIcon size={14} />
          Details
        </button>
      </div>
    </div>
  );
};
