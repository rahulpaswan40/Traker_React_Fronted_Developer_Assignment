import React from 'react';
import { Driver } from '../../types';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';
import { formatCurrency, getVehicleBadgeColor } from '../../utils/formatters';
import { StarIcon, PhoneIcon, MailIcon, CarIcon } from '../common/Icons';
import { useRides } from '../../context/RidesContext';

interface DriverDetailsModalProps {
  driver: Driver | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DriverDetailsModal: React.FC<DriverDetailsModalProps> = ({
  driver,
  isOpen,
  onClose
}) => {
  const { toggleDriverStatus } = useRides();

  if (!driver) return null;

  const vehicleStyle = getVehicleBadgeColor(driver.vehicleType);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Driver Profile & Telemetry"
      subtitle={`Fleet Member ID: ${driver.id}`}
      maxWidth="620px"
      footer={
        <div className="flex-between" style={{ width: '100%' }}>
          <button
            type="button"
            className={`btn ${driver.status === 'Online' ? 'btn-danger' : 'btn-primary'}`}
            onClick={() => {
              toggleDriverStatus(driver.id);
            }}
          >
            {driver.status === 'Online' ? 'Set Driver Offline' : 'Set Driver Online'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Profile Card Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '16px',
            backgroundColor: 'var(--bg-input)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)'
          }}
        >
          <img
            src={driver.avatar}
            alt={driver.name}
            style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '4px' }}>
            <div className="flex-between">
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                {driver.name}
              </h4>
              <StatusBadge status={driver.status} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <PhoneIcon size={14} />
                {driver.phone}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MailIcon size={14} />
                {driver.email}
              </span>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid-4" style={{ gap: '10px' }}>
          <div style={{ padding: '12px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Rating</span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '4px' }}>
              <StarIcon size={16} style={{ color: '#fbbf24' }} />
              <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{driver.rating}</strong>
            </div>
          </div>

          <div style={{ padding: '12px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Trips</span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)', display: 'block', marginTop: '4px' }}>{driver.totalRides}</strong>
          </div>

          <div style={{ padding: '12px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Completion</span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--accent-emerald)', display: 'block', marginTop: '4px' }}>{driver.completionRate}%</strong>
          </div>

          <div style={{ padding: '12px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Today</span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--primary)', display: 'block', marginTop: '4px' }}>{formatCurrency(driver.earningsToday)}</strong>
          </div>
        </div>

        {/* Vehicle & Assignment Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Assigned Vehicle & Zone
          </h5>
          <div
            style={{
              padding: '14px',
              backgroundColor: 'var(--bg-input)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div className="flex-between">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CarIcon size={18} style={{ color: 'var(--primary)' }} />
                <strong style={{ color: 'var(--text-primary)' }}>{driver.vehicle}</strong>
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

            <div className="flex-between" style={{ fontSize: '0.84rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>License Plate:</span>
              <strong style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{driver.vehicleNumber}</strong>
            </div>

            <div className="flex-between" style={{ fontSize: '0.84rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Current Live Zone:</span>
              <span style={{ color: 'var(--text-primary)' }}>📍 {driver.currentLocation}</span>
            </div>

            <div className="flex-between" style={{ fontSize: '0.84rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Lifetime Career Earnings:</span>
              <strong style={{ color: 'var(--accent-emerald)' }}>{formatCurrency(driver.earningsTotal)}</strong>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
