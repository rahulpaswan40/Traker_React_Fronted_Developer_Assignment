import React from 'react';
import { ArrowUpRightIcon, ArrowDownRightIcon } from './Icons';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'cyan';
  growth?: number;
  growthPeriod?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subValue,
  icon,
  variant = 'primary',
  growth,
  growthPeriod = 'vs previous period',
  onClick
}) => {
  const isPositive = growth !== undefined ? growth >= 0 : true;

  return (
    <div
      className={`stat-card ${variant} ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="stat-card-top">
        <span className="stat-card-label">{label}</span>
        <div className="stat-icon-wrapper" style={{ background: `var(--primary-subtle)` }}>
          {icon}
        </div>
      </div>

      <div>
        <h3 className="stat-card-value">{value}</h3>
        {subValue && <p className="stat-card-sub" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>{subValue}</p>}
      </div>

      {growth !== undefined && (
        <div className="stat-card-bottom">
          <span className={`stat-trend ${isPositive ? 'up' : 'down'}`}>
            {isPositive ? <ArrowUpRightIcon size={14} /> : <ArrowDownRightIcon size={14} />}
            {Math.abs(growth)}%
          </span>
          <span style={{ color: 'var(--text-muted)' }}>{growthPeriod}</span>
        </div>
      )}
    </div>
  );
};
