import React, { useState } from 'react';
import { useRides } from '../context/RidesContext';
import { Driver } from '../types';
import { DriverFilters } from '../components/drivers/DriverFilters';
import { DriverTable } from '../components/drivers/DriverTable';
import { DriverCard } from '../components/drivers/DriverCard';
import { DriverDetailsModal } from '../components/drivers/DriverDetailsModal';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorState } from '../components/common/ErrorState';
import { UsersIcon, RefreshIcon } from '../components/common/Icons';

export const DriversPage: React.FC = () => {
  const { drivers, isLoading, error, fetchDrivers, clearDriverFilters } = useRides();
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleSelectDriver = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsDetailsOpen(true);
  };

  const onlineDriversCount = drivers.filter(d => d.status === 'Online').length;

  return (
    <div className="page-container animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Driver Fleet Directory</h1>
          <p className="page-header-subtitle">
            Manage chauffeur profiles, vehicle assignments, real-time availability & ratings
          </p>
        </div>

        <div className="page-actions">
          {/* Quick Active Stat Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              backgroundColor: 'var(--status-online-bg)',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--status-completed-border)',
              fontSize: '0.78rem',
              color: 'var(--status-online-text)',
              fontWeight: 500
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            {onlineDriversCount} Active Drivers Online
          </div>

          {/* View Mode Toggle */}
          <div className="segmented-control">
            <button
              type="button"
              className={`segmented-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              Table View
            </button>
            <button
              type="button"
              className={`segmented-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid Cards
            </button>
          </div>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={fetchDrivers}
            title="Refresh fleet data"
          >
            <RefreshIcon size={14} />
            Refresh
          </button>
        </div>
      </div>

      {/* Driver Filters & Search Bar */}
      <DriverFilters />

      {/* Content Section */}
      {isLoading ? (
        <SkeletonLoader type="table" count={5} />
      ) : error ? (
        <ErrorState
          title="Fleet Fetch Error"
          message={error}
          onRetry={fetchDrivers}
        />
      ) : drivers.length === 0 ? (
        <EmptyState
          title="No Drivers Found"
          description="There are no fleet members matching the selected online status or category criteria."
          actionText="Reset Driver Filters"
          onAction={clearDriverFilters}
          icon={<UsersIcon size={28} />}
        />
      ) : viewMode === 'table' ? (
        <DriverTable drivers={drivers} onSelectDriver={handleSelectDriver} />
      ) : (
        <div className="stat-cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {drivers.map(driver => (
            <DriverCard
              key={driver.id}
              driver={driver}
              onSelect={handleSelectDriver}
            />
          ))}
        </div>
      )}

      {/* Driver Details Modal Dialog */}
      <DriverDetailsModal
        driver={selectedDriver}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </div>
  );
};
