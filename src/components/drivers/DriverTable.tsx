import React, { useState } from 'react';
import { Driver } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { Pagination } from '../common/Pagination';
import { formatCurrency, getVehicleBadgeColor } from '../../utils/formatters';
import { StarIcon, PhoneIcon, EyeIcon } from '../common/Icons';
import { useRides } from '../../context/RidesContext';

interface DriverTableProps {
  drivers: Driver[];
  onSelectDriver: (driver: Driver) => void;
}

export const DriverTable: React.FC<DriverTableProps> = ({ drivers, onSelectDriver }) => {
  const { toggleDriverStatus } = useRides();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedDrivers = drivers.slice(startIndex, startIndex + pageSize);

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Driver</th>
              <th>Phone Number</th>
              <th>Vehicle Model</th>
              <th>License Plate</th>
              <th>Rating</th>
              <th>Total Rides</th>
              <th>Status</th>
              <th>Today's Earnings</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDrivers.map(driver => {
              const vehicleStyle = getVehicleBadgeColor(driver.vehicleType);

              return (
                <tr key={driver.id} onClick={() => onSelectDriver(driver)}>
                  {/* Driver Name & Avatar */}
                  <td>
                    <div className="entity-cell">
                      <img
                        src={driver.avatar}
                        alt={driver.name}
                        className="avatar-img"
                      />
                      <div className="entity-info-col">
                        <span className="entity-name">{driver.name}</span>
                        <span className="entity-sub">{driver.id}</span>
                      </div>
                    </div>
                  </td>

                  {/* Phone */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                      <PhoneIcon size={14} style={{ color: 'var(--text-muted)' }} />
                      <span>{driver.phone}</span>
                    </div>
                  </td>

                  {/* Vehicle */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.86rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                        {driver.vehicle}
                      </span>
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
                  </td>

                  {/* Vehicle Number */}
                  <td>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontWeight: 600,
                        fontSize: '0.84rem',
                        backgroundColor: 'var(--bg-input)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      {driver.vehicleNumber}
                    </span>
                  </td>

                  {/* Rating */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <StarIcon size={14} style={{ color: '#fbbf24' }} />
                      <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                        {driver.rating.toFixed(2)}
                      </strong>
                    </div>
                  </td>

                  {/* Total Rides */}
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {driver.totalRides.toLocaleString()}
                    </span>
                  </td>

                  {/* Status Toggle */}
                  <td onClick={e => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => toggleDriverStatus(driver.id)}
                      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                      title={`Click to set ${driver.status === 'Online' ? 'Offline' : 'Online'}`}
                    >
                      <StatusBadge status={driver.status} />
                    </button>
                  </td>

                  {/* Today Earnings */}
                  <td>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                      {formatCurrency(driver.earningsToday)}
                    </strong>
                  </td>

                  {/* Actions */}
                  <td style={{ textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={() => onSelectDriver(driver)}
                      title="View driver profile"
                    >
                      <EyeIcon size={16} />
                      <span>Profile</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ padding: '0 20px 16px' }}>
        <Pagination
          currentPage={currentPage}
          totalItems={drivers.length}
          pageSize={pageSize}
          onPageChange={p => setCurrentPage(p)}
          onPageSizeChange={s => {
            setPageSize(s);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};
