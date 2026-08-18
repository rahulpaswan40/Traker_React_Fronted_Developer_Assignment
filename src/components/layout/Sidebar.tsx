import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LogoIcon,
  DashboardIcon,
  CarIcon,
  UsersIcon,
  ChartIcon,
  RefreshIcon
} from '../common/Icons';
import { useRides } from '../../context/RidesContext';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const {
    totalRidesCount,
    totalDriversCount,
    simulateError,
    setSimulateErrorToggle,
    simulateEmpty,
    setSimulateEmptyToggle,
    resetToDefaults
  } = useRides();

  return (
    <aside className="app-sidebar">
      {/* Brand Header */}
      <div className="sidebar-header">
        <NavLink to="/" className="brand-logo" onClick={onCloseMobile}>
          <div className="brand-icon-box">
            <LogoIcon size={18} />
          </div>
          <span>Traker</span>
          <span className="brand-badge">India</span>
        </NavLink>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        <div className="sidebar-section-title">Operations</div>

        <NavLink
          to="/"
          className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
          onClick={onCloseMobile}
          end
        >
          <div className="nav-link-left">
            <DashboardIcon size={16} />
            <span>Dashboard</span>
          </div>
        </NavLink>

        <NavLink
          to="/rides"
          className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
          onClick={onCloseMobile}
        >
          <div className="nav-link-left">
            <CarIcon size={16} />
            <span>Rides</span>
          </div>
          {totalRidesCount > 0 && <span className="nav-link-badge">{totalRidesCount}</span>}
        </NavLink>

        <NavLink
          to="/drivers"
          className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
          onClick={onCloseMobile}
        >
          <div className="nav-link-left">
            <UsersIcon size={16} />
            <span>Drivers</span>
          </div>
          {totalDriversCount > 0 && <span className="nav-link-badge">{totalDriversCount}</span>}
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
          onClick={onCloseMobile}
        >
          <div className="nav-link-left">
            <ChartIcon size={16} />
            <span>Analytics</span>
          </div>
        </NavLink>

        <div className="sidebar-section-title" style={{ marginTop: '12px' }}>
          Test Controls
        </div>

        {/* State Simulation Tools */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '0 4px' }}>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--text-secondary)', cursor: 'pointer', padding: '5px 8px', borderRadius: '4px', background: 'var(--bg-input)' }}>
            <span>Simulate Error</span>
            <input
              type="checkbox"
              checked={simulateError}
              onChange={e => setSimulateErrorToggle(e.target.checked)}
              style={{ cursor: 'pointer', accentColor: 'var(--accent-rose)' }}
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--text-secondary)', cursor: 'pointer', padding: '5px 8px', borderRadius: '4px', background: 'var(--bg-input)' }}>
            <span>Simulate Empty</span>
            <input
              type="checkbox"
              checked={simulateEmpty}
              onChange={e => setSimulateEmptyToggle(e.target.checked)}
              style={{ cursor: 'pointer', accentColor: 'var(--accent-amber)' }}
            />
          </label>

          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={resetToDefaults}
            style={{ width: '100%', fontSize: '0.75rem', marginTop: '2px' }}
          >
            <RefreshIcon size={11} />
            Reset Data
          </button>
        </div>
      </nav>

      {/* Footer System Status */}
      <div className="sidebar-footer">
        <div className="system-status-card">
          <span className="status-indicator-dot" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              India Fleet Engine
            </span>
            <span style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>
              BLR, BOM, DEL • 99.9%
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
