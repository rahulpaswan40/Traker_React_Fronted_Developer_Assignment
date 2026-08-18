import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ride } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { formatCurrency, formatDateTime, getVehicleBadgeColor } from '../../utils/formatters';
import { MapPinIcon, StarIcon, EyeIcon } from '../common/Icons';

interface RideCardProps {
  ride: Ride;
  onSelect?: (ride: Ride) => void;
}

export const RideCard: React.FC<RideCardProps> = ({ ride, onSelect }) => {
  const navigate = useNavigate();
  const vehicleStyle = getVehicleBadgeColor(ride.vehicleType);

  const handleClick = () => {
    if (onSelect) onSelect(ride);
    else navigate(`/rides/${ride.id}`);
  };

  return (
    <div
      className="card"
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        padding: '16px'
      }}
    >
      <div className="flex-between">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 700, color: 'var(--primary)', fontFamily: 'monospace' }}>
            {ride.id}
          </span>
          <span
            className="vehicle-tag"
            style={{
              backgroundColor: vehicleStyle.bg,
              color: vehicleStyle.color,
              borderColor: vehicleStyle.border
            }}
          >
            {ride.vehicleType}
          </span>
        </div>
        <StatusBadge status={ride.status} size="sm" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img
          src={ride.customer.avatar}
          alt={ride.customer.name}
          className="avatar-img"
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="entity-name">{ride.customer.name}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <StarIcon size={12} style={{ color: '#fbbf24' }} />
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              {ride.customer.rating} • {ride.customer.phone}
            </span>
          </div>
        </div>
      </div>

      {/* Locations */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MapPinIcon size={14} style={{ color: 'var(--primary)' }} />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {ride.pickup.address.split(',')[0]}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MapPinIcon size={14} style={{ color: 'var(--accent-rose)' }} />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {ride.drop.address.split(',')[0]}
          </span>
        </div>
      </div>

      <div className="flex-between" style={{ paddingTop: '6px', borderTop: '1px solid var(--border-color)' }}>
        <div>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block' }}>
            {formatDateTime(ride.createdAt)}
          </span>
          <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>
            {formatCurrency(ride.fare.totalFare)}
          </strong>
        </div>

        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={e => {
            e.stopPropagation();
            handleClick();
          }}
        >
          <EyeIcon size={14} />
          Details
        </button>
      </div>
    </div>
  );
};
