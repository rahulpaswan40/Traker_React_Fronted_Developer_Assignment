import React, { useState } from 'react';
import { useRides } from '../../context/RidesContext';
import { StatPeriod, ChartDataPoint } from '../../types';
import { ChartIcon } from '../common/Icons';

export const RideStatisticsChart: React.FC = () => {
  const { dashboardData, selectedPeriod, setSelectedPeriod } = useRides();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeSeries, setActiveSeries] = useState<{ total: boolean; completed: boolean; cancelled: boolean }>({
    total: true,
    completed: true,
    cancelled: true
  });

  const chartData: ChartDataPoint[] = dashboardData?.charts[selectedPeriod] || [];

  const periods: StatPeriod[] = ['Today', 'Last 7 Days', 'Last 30 Days'];

  // Calculate SVG bounds & scaling
  const maxVal = Math.max(...chartData.map(d => Math.max(d.totalRides, d.completedRides, d.cancelledRides)), 10);
  const chartHeight = 220;
  const chartWidth = 700;
  const paddingX = 36;
  const paddingY = 24;

  const pointsCount = chartData.length;
  const stepX = pointsCount > 1 ? (chartWidth - paddingX * 2) / (pointsCount - 1) : 0;

  const getY = (val: number) => {
    const usableHeight = chartHeight - paddingY * 2;
    return chartHeight - paddingY - (val / maxVal) * usableHeight;
  };

  const getPath = (key: keyof ChartDataPoint) => {
    if (chartData.length === 0) return '';
    return chartData.reduce((acc, curr, index) => {
      const x = paddingX + index * stepX;
      const y = getY(curr[key] as number);
      return index === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  };

  const getAreaPath = (key: keyof ChartDataPoint) => {
    if (chartData.length === 0) return '';
    const linePath = getPath(key);
    const lastX = paddingX + (chartData.length - 1) * stepX;
    const firstX = paddingX;
    const bottomY = chartHeight - paddingY;
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  };

  const hoveredData = hoveredIndex !== null ? chartData[hoveredIndex] : null;

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Chart Header & Period Selector */}
      <div className="card-header" style={{ marginBottom: 0 }}>
        <div>
          <h3 className="card-title">
            <ChartIcon size={16} style={{ color: '#2563eb' }} />
            Ride Demand & Completion
          </h3>
          <p className="card-subtitle">
            Daily telemetry for total, fulfilled, and cancelled requests
          </p>
        </div>

        {/* Period Selector Tabs */}
        <div className="segmented-control" role="tablist">
          {periods.map(period => (
            <button
              key={period}
              type="button"
              className={`segmented-btn ${selectedPeriod === period ? 'active' : ''}`}
              onClick={() => setSelectedPeriod(period)}
              role="tab"
              aria-selected={selectedPeriod === period}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Series Toggle Legends */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', fontSize: '0.78rem' }}>
        <button
          type="button"
          onClick={() => setActiveSeries(p => ({ ...p, total: !p.total }))}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: activeSeries.total ? 'var(--text-primary)' : 'var(--text-muted)',
            opacity: activeSeries.total ? 1 : 0.4
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563eb' }} />
          <strong>Total Rides</strong>
        </button>

        <button
          type="button"
          onClick={() => setActiveSeries(p => ({ ...p, completed: !p.completed }))}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: activeSeries.completed ? 'var(--text-primary)' : 'var(--text-muted)',
            opacity: activeSeries.completed ? 1 : 0.4
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
          <strong>Completed</strong>
        </button>

        <button
          type="button"
          onClick={() => setActiveSeries(p => ({ ...p, cancelled: !p.cancelled }))}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: activeSeries.cancelled ? 'var(--text-primary)' : 'var(--text-muted)',
            opacity: activeSeries.cancelled ? 1 : 0.4
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f43f5e' }} />
          <strong>Cancelled</strong>
        </button>
      </div>

      {/* Interactive Responsive SVG Chart */}
      <div style={{ width: '100%', position: 'relative', overflowX: 'auto' }}>
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          style={{ width: '100%', minWidth: '460px', height: 'auto', display: 'block', overflow: 'visible' }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.33, 0.66, 1].map((ratio, i) => {
            const y = paddingY + (chartHeight - paddingY * 2) * ratio;
            const labelVal = Math.round(maxVal * (1 - ratio));
            return (
              <g key={i}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={chartWidth - paddingX}
                  y2={y}
                  stroke="var(--chart-grid)"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 8}
                  y={y + 3}
                  fill="var(--text-muted)"
                  fontSize="10"
                  textAnchor="end"
                >
                  {labelVal}
                </text>
              </g>
            );
          })}

          {/* Area Fills */}
          {activeSeries.total && (
            <path
              d={getAreaPath('totalRides')}
              fill="url(#totalGradient)"
              style={{ transition: 'all 0.3s ease' }}
            />
          )}
          {activeSeries.completed && (
            <path
              d={getAreaPath('completedRides')}
              fill="url(#completedGradient)"
              style={{ transition: 'all 0.3s ease' }}
            />
          )}

          {/* Trend Lines */}
          {activeSeries.total && (
            <path
              d={getPath('totalRides')}
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          {activeSeries.completed && (
            <path
              d={getPath('completedRides')}
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          {activeSeries.cancelled && (
            <path
              d={getPath('cancelledRides')}
              fill="none"
              stroke="#f43f5e"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="3 3"
            />
          )}

          {/* Data Points and Interaction Zones */}
          {chartData.map((d, index) => {
            const x = paddingX + index * stepX;
            const yTotal = getY(d.totalRides);
            const isHovered = hoveredIndex === index;

            return (
              <g
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                style={{ cursor: 'pointer' }}
              >
                {/* Vertical Hover Guide Line */}
                {isHovered && (
                  <line
                    x1={x}
                    y1={paddingY}
                    x2={x}
                    y2={chartHeight - paddingY}
                    stroke="#94a3b8"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                )}

                {/* Circles */}
                {activeSeries.total && (
                  <circle
                    cx={x}
                    cy={yTotal}
                    r={isHovered ? 5 : 3}
                    fill="#2563eb"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                )}
                {activeSeries.completed && (
                  <circle
                    cx={x}
                    cy={getY(d.completedRides)}
                    r={isHovered ? 4.5 : 2.5}
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                )}
                {activeSeries.cancelled && (
                  <circle
                    cx={x}
                    cy={getY(d.cancelledRides)}
                    r={isHovered ? 4 : 2}
                    fill="#f43f5e"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                )}

                {/* X Axis Label */}
                <text
                  x={x}
                  y={chartHeight - 6}
                  fill={isHovered ? 'var(--text-primary)' : 'var(--text-muted)'}
                  fontSize="10"
                  fontWeight={isHovered ? 600 : 400}
                  textAnchor="middle"
                >
                  {d.label}
                </text>

                {/* Hitbox */}
                <rect
                  x={x - stepX / 2}
                  y={0}
                  width={stepX}
                  height={chartHeight}
                  fill="transparent"
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredData && hoveredIndex !== null && (
          <div
            style={{
              position: 'absolute',
              top: '8px',
              left: `${Math.min(Math.max((hoveredIndex / (chartData.length - 1)) * 85, 10), 75)}%`,
              backgroundColor: 'var(--chart-tooltip-bg)',
              color: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 12px',
              boxShadow: 'var(--shadow-modal)',
              zIndex: 10,
              pointerEvents: 'none',
              minWidth: '140px',
              animation: 'fadeIn 0.12s ease-out'
            }}
          >
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '4px', fontWeight: 600 }}>
              {hoveredData.date} ({hoveredData.label})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '0.78rem' }}>
              <div className="flex-between">
                <span style={{ color: '#60a5fa', fontWeight: 500 }}>Total:</span>
                <strong style={{ color: '#ffffff' }}>{hoveredData.totalRides}</strong>
              </div>
              <div className="flex-between">
                <span style={{ color: '#34d399', fontWeight: 500 }}>Completed:</span>
                <strong style={{ color: '#ffffff' }}>{hoveredData.completedRides}</strong>
              </div>
              <div className="flex-between">
                <span style={{ color: '#fb7185', fontWeight: 500 }}>Cancelled:</span>
                <strong style={{ color: '#ffffff' }}>{hoveredData.cancelledRides}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
