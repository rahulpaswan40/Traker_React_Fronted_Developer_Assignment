import React, { useCallback } from 'react';
import { useRides } from '../../context/RidesContext';
import { SearchInput } from '../common/SearchInput';
import { RideStatus, VehicleType } from '../../types';
import { RefreshIcon, DownloadIcon, ArrowUpDownIcon } from '../common/Icons';
import { exportRidesToCsv } from '../../utils/exportCsv';

export const RideFilters: React.FC = () => {
  const { rideFilters, setRideFilters, clearRideFilters, rides } = useRides();

  const statuses: ('All' | RideStatus)[] = ['All', 'Completed', 'Ongoing', 'Cancelled', 'Pending'];
  const vehicleTypes: ('All' | VehicleType)[] = ['All', 'Auto', 'Bike', 'Sedan', 'SUV', 'Premium'];
  const dateOptions = [
    { label: 'All Dates', value: 'all' },
    { label: 'Today (Aug 18)', value: 'today' },
    { label: 'Last 7 Days', value: 'last7' },
    { label: 'Last 30 Days', value: 'last30' }
  ];

  const handleSearchChange = useCallback((val: string) => {
    setRideFilters(prev => ({ ...prev, searchQuery: val }));
  }, [setRideFilters]);

  const handleStatusChange = (val: 'All' | RideStatus) => {
    setRideFilters(prev => ({ ...prev, status: val }));
  };

  const handleVehicleChange = (val: 'All' | VehicleType) => {
    setRideFilters(prev => ({ ...prev, vehicleType: val }));
  };

  const handleDateChange = (val: string) => {
    setRideFilters(prev => ({ ...prev, dateFilter: val }));
  };

  const toggleSortOrder = () => {
    setRideFilters(prev => ({
      ...prev,
      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  const hasActiveFilters =
    rideFilters.searchQuery !== '' ||
    rideFilters.status !== 'All' ||
    rideFilters.vehicleType !== 'All' ||
    rideFilters.dateFilter !== 'all';

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
      {/* Top Search and Export Row */}
      <div className="flex-between" style={{ flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '260px' }}>
          <SearchInput
            placeholder="Search by Ride ID, Customer, Driver..."
            value={rideFilters.searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {hasActiveFilters && (
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={clearRideFilters}
              title="Clear all active filters"
            >
              <RefreshIcon size={12} />
              Reset Filters
            </button>
          )}

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => exportRidesToCsv(rides)}
            title="Download CSV report of filtered rides"
          >
            <DownloadIcon size={12} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filter Controls Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '10px',
          alignItems: 'center'
        }}
      >
        {/* Status Filter */}
        <div>
          <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px' }}>
            Ride Status
          </label>
          <select
            className="form-select"
            value={rideFilters.status}
            onChange={e => handleStatusChange(e.target.value as any)}
          >
            {statuses.map(s => (
              <option key={s} value={s}>
                {s === 'All' ? 'All Statuses' : s}
              </option>
            ))}
          </select>
        </div>

        {/* Vehicle Type Filter */}
        <div>
          <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px' }}>
            Vehicle Category
          </label>
          <select
            className="form-select"
            value={rideFilters.vehicleType}
            onChange={e => handleVehicleChange(e.target.value as any)}
          >
            {vehicleTypes.map(v => (
              <option key={v} value={v}>
                {v === 'All' ? 'All Vehicles' : v}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter */}
        <div>
          <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px' }}>
            Booking Date
          </label>
          <select
            className="form-select"
            value={rideFilters.dateFilter}
            onChange={e => handleDateChange(e.target.value)}
          >
            {dateOptions.map(d => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Order Selector */}
        <div>
          <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px' }}>
            Sort Order
          </label>
          <div style={{ display: 'flex', gap: '4px' }}>
            <select
              className="form-select"
              value={rideFilters.sortBy}
              onChange={e => setRideFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              style={{ flex: 1 }}
            >
              <option value="createdAt">Date & Time</option>
              <option value="fare">Fare (₹)</option>
              <option value="distanceKm">Distance (km)</option>
              <option value="id">Ride ID</option>
            </select>
            <button
              type="button"
              className="btn btn-secondary btn-icon"
              onClick={toggleSortOrder}
              title={`Sort ${rideFilters.sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
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
