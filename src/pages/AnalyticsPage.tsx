import React from 'react';
import { StatCard } from '../components/common/StatCard';
import { ChartIcon, DollarSignIcon, CarIcon, UsersIcon } from '../components/common/Icons';
import { formatCurrency, formatNumber } from '../utils/formatters';

export const AnalyticsPage: React.FC = () => {

  const zonePerformance = [
    { zone: 'Outer Ring Road (ORR) & Bellandur, Bengaluru', rides: 8420, revenue: 4250000, growth: 16.4, share: 36 },
    { zone: 'Bandra Kurla Complex (BKC) & Airport, Mumbai', rides: 6810, revenue: 3840000, growth: 19.2, share: 29 },
    { zone: 'Cyber City DLF Phase 2 & 3, Gurugram', rides: 5120, revenue: 2980000, growth: 14.8, share: 22 },
    { zone: 'HITEC City & Financial District, Hyderabad', rides: 3100, revenue: 1680000, growth: 11.5, share: 13 }
  ];

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Mobility Analytics & Revenue</h1>
          <p className="page-header-subtitle">
            Indian metro dispatch heatmaps, peak surge telemetry & monetization KPIs
          </p>
        </div>
      </div>

      {/* Analytics KPI Row */}
      <div className="stat-cards-grid">
        <StatCard
          label="Average Trip Value"
          value="₹520"
          subValue="+₹45 vs last week"
          icon={<DollarSignIcon size={18} style={{ color: 'var(--accent-emerald)' }} />}
          variant="success"
          growth={9.4}
        />
        <StatCard
          label="Fleet Utilization Rate"
          value="89.2%"
          subValue="Peak 96% between 5-8 PM"
          icon={<CarIcon size={18} style={{ color: 'var(--primary)' }} />}
          variant="primary"
          growth={4.8}
        />
        <StatCard
          label="Driver Acceptance SLA"
          value="98.6%"
          subValue="Avg response time 14s"
          icon={<UsersIcon size={18} style={{ color: 'var(--accent-purple)' }} />}
          variant="purple"
          growth={2.1}
        />
        <StatCard
          label="Surge Revenue Multiple"
          value="1.25x"
          subValue="During rain & airport peaks"
          icon={<ChartIcon size={18} style={{ color: 'var(--accent-amber)' }} />}
          variant="warning"
          growth={12.0}
        />
      </div>

      {/* Regional Zone Performance Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <ChartIcon size={18} style={{ color: 'var(--primary)' }} />
              High Density Metro Dispatch Corridors
            </h3>
            <p className="card-subtitle">
              Revenue distribution and volume across key Indian IT corridors
            </p>
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Metro Corridor</th>
                <th>Ride Volume</th>
                <th>Gross GMV</th>
                <th>Share</th>
                <th>Growth</th>
              </tr>
            </thead>
            <tbody>
              {zonePerformance.map((item, i) => (
                <tr key={i}>
                  <td>
                    <strong style={{ color: 'var(--text-primary)' }}>📍 {item.zone}</strong>
                  </td>
                  <td>{formatNumber(item.rides)} trips</td>
                  <td>
                    <strong style={{ color: 'var(--accent-emerald)' }}>{formatCurrency(item.revenue)}</strong>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ flex: 1, height: '4px', backgroundColor: 'var(--bg-surface-raised)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: `${item.share}%`, height: '100%', backgroundColor: 'var(--primary)' }} />
                      </div>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{item.share}%</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-completed">+{item.growth}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
