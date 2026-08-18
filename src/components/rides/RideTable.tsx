import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ride } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { Pagination } from '../common/Pagination';
import { formatCurrency, formatDateTime, getVehicleBadgeColor } from '../../utils/formatters';
import { EyeIcon, MapPinIcon, StarIcon } from '../common/Icons';

interface RideTableProps {
  rides: Ride[];
  onSelectRide?: (ride: Ride) => void;
}

export const RideTable: React.FC<RideTableProps> = ({ rides, onSelectRide }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRides = rides.slice(startIndex, startIndex + pageSize);

  const handleRowClick = (ride: Ride) => {
    if (onSelectRide) {
      onSelectRide(ride);
    } else {
      navigate(`/rides/${ride.id}`);
    }
  };

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Ride ID</th>
              <th>Customer</th>
              <th>Driver</th>
              <th>Vehicle</th>
              <th>Pickup Location</th>
              <th>Drop Location</th>
              <th>Fare</th>
              <th>Status</th>
              <th>Date & Time</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRides.map(ride => {
              const vehicleStyle = getVehicleBadgeColor(ride.vehicleType);

              return (
                <tr key={ride.id} onClick={() => handleRowClick(ride)}>
                  {/* Ride ID */}
                  <td>
                    <span
                      style={{
                        fontWeight: 700,
                        color: 'var(--primary)',
                        fontFamily: 'monospace',
                        fontSize: '0.86rem'
                      }}
                    >
                      {ride.id}
                    </span>
                  </td>

                  {/* Customer */}
                  <td>
                    <div className="entity-cell">
                      <img
                        src={ride.customer.avatar}
                        alt={ride.customer.name}
                        className="avatar-img"
                      />
                      <div className="entity-info-col">
                        <span className="entity-name">{ride.customer.name}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <StarIcon size={12} style={{ color: '#fbbf24' }} />
                          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                            {ride.customer.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Driver */}
                  <td>
                    {ride.driver ? (
                      <div className="entity-cell">
                        <img
                          src={ride.driver.avatar}
                          alt={ride.driver.name}
                          className="avatar-img"
                        />
                        <div className="entity-info-col">
                          <span className="entity-name">{ride.driver.name}</span>
                          <span className="entity-sub">{ride.driver.vehicleNumber}</span>
                        </div>
                      </div>
                    ) : (
                      <span
                        style={{
                          fontSize: '0.78rem',
                          fontStyle: 'italic',
                          color: 'var(--text-muted)'
                        }}
                      >
                        Unassigned
                      </span>
                    )}
                  </td>

                  {/* Vehicle Type */}
                  <td>
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
                  </td>

                  {/* Pickup */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', maxWidth: '200px' }}>
                      <MapPinIcon size={14} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.82rem', lineHeight: 1.3, color: 'var(--text-secondary)' }}>
                        {ride.pickup.address.split(',')[0]}
                      </span>
                    </div>
                  </td>

                  {/* Drop */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', maxWidth: '200px' }}>
                      <MapPinIcon size={14} style={{ color: 'var(--accent-rose)', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.82rem', lineHeight: 1.3, color: 'var(--text-secondary)' }}>
                        {ride.drop.address.split(',')[0]}
                      </span>
                    </div>
                  </td>

                  {/* Fare */}
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                        {formatCurrency(ride.fare.totalFare)}
                      </strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {ride.fare.paymentMethod}
                      </span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td>
                    <StatusBadge status={ride.status} />
                  </td>

                  {/* Date & Time */}
                  <td>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                      {formatDateTime(ride.createdAt)}
                    </span>
                  </td>

                  {/* Action */}
                  <td style={{ textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={() => handleRowClick(ride)}
                      title="View details"
                    >
                      <EyeIcon size={16} />
                      <span>Details</span>
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
          totalItems={rides.length}
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
