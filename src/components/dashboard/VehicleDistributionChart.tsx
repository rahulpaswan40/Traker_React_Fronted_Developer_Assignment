import React from 'react';
import { useRides } from '../../context/RidesContext';
import { formatCurrency } from '../../utils/formatters';
import { CarIcon } from '../common/Icons';

export const VehicleDistributionChart: React.FC = () => {
  const { dashboardData } = useRides();

  const vehicleStats = dashboardData?.vehicleStats || [];

  const getVehicleColor = (type: string) => {
    switch (type) {
      case 'Sedan': return '#10b981';
      case 'SUV': return '#3b82f6';
      case 'Premium': return '#a855f7';
      case 'Auto': return '#f59e0b';
      case 'Bike': return '#ec4899';
      default: return '#64748b';
    }
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="card-header" style={{ marginBottom: 0 }}>
        <div>
          <h3 className="card-title">
            <CarIcon size={20} style={{ color: 'var(--accent-purple)' }} />
            Vehicle Fleet Mix
          </h3>
          <p className="card-subtitle">
            Fleet category utilization and revenue contribution
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {vehicleStats.map(stat => {
          const color = getVehicleColor(stat.type);

          return (
            <div key={stat.type} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div className="flex-between" style={{ fontSize: '0.84rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: color }} />
                  <strong style={{ color: 'var(--text-primary)' }}>{stat.type}</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>({stat.count} rides)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{stat.percentage}%</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{formatCurrency(stat.revenue)}</span>
                </div>
              </div>

              {/* Progress Track */}
              <div
                style={{
                  height: '6px',
                  width: '100%',
                  backgroundColor: 'var(--bg-surface-raised)',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${stat.percentage}%`,
                    backgroundColor: color,
                    borderRadius: 'var(--radius-full)',
                    transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
