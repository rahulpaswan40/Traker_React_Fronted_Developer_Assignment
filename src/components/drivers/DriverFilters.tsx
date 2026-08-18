import React, { useCallback } from 'react';
import { useRides } from '../../context/RidesContext';
import { SearchInput } from '../common/SearchInput';
import { VehicleType } from '../../types';
import { RefreshIcon, DownloadIcon, ArrowUpDownIcon } from '../common/Icons';
import { exportDriversToCsv } from '../../utils/exportCsv';

export const DriverFilters: React.FC = () => {
  const { driverFilters, setDriverFilters, clearDriverFilters, drivers } = useRides();

  const statuses: ('All' | 'Online' | 'Offline')[] = ['All', 'Online', 'Offline'];
  const vehicleTypes: ('All' | VehicleType)[] = ['All', 'Auto', 'Bike', 'Sedan', 'SUV', 'Premium'];

  const handleSearchChange = useCallback((val: string) => {
    setDriverFilters(prev => ({ ...prev, searchQuery: val }));
  }, [setDriverFilters]);

  const handleStatusChange = (val: 'All' | 'Online' | 'Offline') => {
    setDriverFilters(prev => ({ ...prev, status: val }));
  };

  const handleVehicleChange = (val: 'All' | VehicleType) => {
    setDriverFilters(prev => ({ ...prev, vehicleType: val }));
  };

  const toggleSortOrder = () => {
    setDriverFilters(prev => ({
      ...prev,
      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  const hasActiveFilters =
    driverFilters.searchQuery !== '' ||
    driverFilters.status !== 'All' ||
    driverFilters.vehicleType !== 'All';

  return (
    <div
      className="card"
      style={{
        padding: '14px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      <div className="flex-between" style={{ flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '260px' }}>
          <SearchInput
            placeholder="Search by driver name, phone, plate number..."
            value={driverFilters.searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {hasActiveFilters && (
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={clearDriverFilters}
              title="Clear driver filters"
            >
              <RefreshIcon size={12} />
              Reset Filters
            </button>
          )}

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => exportDriversToCsv(drivers)}
            title="Download CSV report of drivers"
          >
            <DownloadIcon size={12} />
            Export Fleet CSV
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '10px',
          alignItems: 'center'
        }}
      >
        {/* Online / Offline Filter */}
        <div>
          <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px' }}>
            Fleet Status
          </label>
          <select
            className="form-select"
            value={driverFilters.status}
            onChange={e => handleStatusChange(e.target.value as any)}
          >
            {statuses.map(s => (
              <option key={s} value={s}>
                {s === 'All' ? 'All Drivers' : `${s} Only`}
              </option>
            ))}
          </select>
        </div>

        {/* Vehicle Type Filter */}
        <div>
          <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px' }}>
            Assigned Category
          </label>
          <select
            className="form-select"
            value={driverFilters.vehicleType}
            onChange={e => handleVehicleChange(e.target.value as any)}
          >
            {vehicleTypes.map(v => (
              <option key={v} value={v}>
                {v === 'All' ? 'All Categories' : v}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px' }}>
            Sort Fleet By
          </label>
          <div style={{ display: 'flex', gap: '4px' }}>
            <select
              className="form-select"
              value={driverFilters.sortBy}
              onChange={e => setDriverFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              style={{ flex: 1 }}
            >
              <option value="rating">Rating (Highest)</option>
              <option value="totalRides">Total Trips</option>
              <option value="earningsToday">Today's Earnings</option>
              <option value="name">Driver Name</option>
            </select>
            <button
              type="button"
              className="btn btn-secondary btn-icon"
              onClick={toggleSortOrder}
              title={`Sort ${driverFilters.sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
              style={{ height: '32px', width: '32px', flexShrink: 0 }}
            >
              <ArrowUpDownIcon size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
