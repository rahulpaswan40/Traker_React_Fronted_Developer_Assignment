import React, { useState } from 'react';
import { useRides } from '../context/RidesContext';
import { RideFilters } from '../components/rides/RideFilters';
import { RideTable } from '../components/rides/RideTable';
import { RideCard } from '../components/rides/RideCard';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorState } from '../components/common/ErrorState';
import { CarIcon, RefreshIcon } from '../components/common/Icons';

export const RidesPage: React.FC = () => {
  const { rides, isLoading, error, fetchRides, clearRideFilters } = useRides();
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Ride Management</h1>
          <p className="page-header-subtitle">
            Search, filter, inspect, and manage real-time passenger ride bookings
          </p>
        </div>

        <div className="page-actions">
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
            onClick={fetchRides}
            title="Refresh rides data"
          >
            <RefreshIcon size={14} />
            Refresh
          </button>
        </div>
      </div>

      {/* Search & Filter Bar (Live updating without page refresh) */}
      <RideFilters />

      {/* Content Rendering: Loading, Error, Empty, or Table */}
      {isLoading ? (
        <SkeletonLoader type="table" count={6} />
      ) : error ? (
        <ErrorState
          title="Failed to Load Rides"
          message={error}
          onRetry={fetchRides}
        />
      ) : rides.length === 0 ? (
        <EmptyState
          title="No Rides Match Filter Criteria"
          description="Try broadening your search query or resetting active status/vehicle filters."
          actionText="Clear Active Filters"
          onAction={clearRideFilters}
          icon={<CarIcon size={28} />}
        />
      ) : viewMode === 'table' ? (
        <RideTable rides={rides} />
      ) : (
        <div className="stat-cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {rides.map(ride => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      )}
    </div>
  );
};
