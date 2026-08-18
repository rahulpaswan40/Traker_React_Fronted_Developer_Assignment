import React from 'react';
import { useRides } from '../context/RidesContext';
import { MetricsOverview } from '../components/dashboard/MetricsOverview';
import { RideStatisticsChart } from '../components/dashboard/RideStatisticsChart';
import { VehicleDistributionChart } from '../components/dashboard/VehicleDistributionChart';
import { RecentRidesWidget } from '../components/dashboard/RecentRidesWidget';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { ErrorState } from '../components/common/ErrorState';
import { EmptyState } from '../components/common/EmptyState';
import { RefreshIcon } from '../components/common/Icons';

export const DashboardPage: React.FC = () => {
  const { isLoading, error, fetchDashboard, fetchRides, simulateEmpty, resetToDefaults } = useRides();

  if (isLoading) {
    return (
      <div className="page-container">
        <div className="page-header">
          <div>
            <h1 className="page-header-title">Executive Mobility Dashboard</h1>
            <p className="page-header-subtitle">Real-time fleet operations, rides & revenue performance</p>
          </div>
        </div>
        <SkeletonLoader type="card" count={6} />
        <div className="grid-2" style={{ marginTop: '20px' }}>
          <SkeletonLoader type="chart" />
          <SkeletonLoader type="chart" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <ErrorState
          title="Dashboard Telemetry Offline"
          message={error}
          onRetry={() => {
            fetchDashboard();
            fetchRides();
          }}
        />
      </div>
    );
  }

  if (simulateEmpty) {
    return (
      <div className="page-container">
        <EmptyState
          title="No Active Mobility Metrics"
          description="Empty simulation mode is currently turned on. Reset to restore sample data."
          actionText="Restore System Defaults"
          onAction={resetToDefaults}
        />
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Executive Mobility Dashboard</h1>
          <p className="page-header-subtitle">
            Real-time fleet operations, ride telemetry & revenue performance
          </p>
        </div>

        <div className="page-actions">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              fetchDashboard();
              fetchRides();
            }}
          >
            <RefreshIcon size={14} />
            Sync Telemetry
          </button>
        </div>
      </div>

      {/* 1. KPI Metric Cards (6 cards required by assignment) */}
      <MetricsOverview />

      {/* 2. Charts & Insights Row */}
      <div className="grid-2">
        {/* Ride Statistics Chart (Daily rides, Completed, Cancelled with Today/7D/30D filter) */}
        <RideStatisticsChart />

        {/* Vehicle Fleet Mix & Revenue */}
        <VehicleDistributionChart />
      </div>

      {/* 3. Live Dispatch Stream */}
      <RecentRidesWidget />
    </div>
  );
};
