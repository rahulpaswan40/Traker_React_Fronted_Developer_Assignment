import React from 'react';
import { StatCard } from '../common/StatCard';
import {
  CarIcon,
  CheckIcon,
  XIcon,
  UsersIcon,
  DollarSignIcon
} from '../common/Icons';
import { useRides } from '../../context/RidesContext';
import { formatCurrency, formatNumber } from '../../utils/formatters';

export const MetricsOverview: React.FC = () => {
  const { dashboardData, selectedPeriod } = useRides();

  if (!dashboardData) return null;

  const currentMetrics = dashboardData.metrics[selectedPeriod] || dashboardData.metrics['Today'];
  const growth = currentMetrics.growth;

  return (
    <div className="stat-cards-grid">
      {/* 1. Total Rides */}
      <StatCard
        label="Total Rides"
        value={formatNumber(currentMetrics.totalRides)}
        icon={<CarIcon size={20} style={{ color: 'var(--primary)' }} />}
        variant="primary"
        growth={growth.rides}
        growthPeriod={`in ${selectedPeriod.toLowerCase()}`}
      />

      {/* 2. Completed Rides */}
      <StatCard
        label="Completed Rides"
        value={formatNumber(currentMetrics.completedRides)}
        icon={<CheckIcon size={20} style={{ color: 'var(--accent-emerald)' }} />}
        variant="success"
        growth={growth.rides}
        growthPeriod="success rate 92%"
      />

      {/* 3. Cancelled Rides */}
      <StatCard
        label="Cancelled Rides"
        value={formatNumber(currentMetrics.cancelledRides)}
        icon={<XIcon size={20} style={{ color: 'var(--accent-rose)' }} />}
        variant="danger"
        growth={-2.4}
        growthPeriod="cancellation 6.8%"
      />

      {/* 4. Active Drivers */}
      <StatCard
        label="Active Drivers"
        value={formatNumber(currentMetrics.activeDrivers)}
        icon={<UsersIcon size={20} style={{ color: 'var(--accent-amber)' }} />}
        variant="warning"
        growth={growth.drivers}
        growthPeriod="on-duty fleet"
      />

      {/* 5. Total Customers */}
      <StatCard
        label="Total Customers"
        value={formatNumber(currentMetrics.totalCustomers)}
        icon={<UsersIcon size={20} style={{ color: 'var(--accent-purple)' }} />}
        variant="purple"
        growth={growth.customers}
        growthPeriod="active riders"
      />

      {/* 6. Total Revenue */}
      <StatCard
        label="Total Revenue"
        value={formatCurrency(currentMetrics.totalRevenue)}
        icon={<DollarSignIcon size={20} style={{ color: 'var(--accent-cyan)' }} />}
        variant="cyan"
        growth={growth.revenue}
        growthPeriod="gross mobility GMV"
      />
    </div>
  );
};
