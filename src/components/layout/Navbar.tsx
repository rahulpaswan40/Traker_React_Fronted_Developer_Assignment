import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useRides } from '../../context/RidesContext';
import {
  SunIcon,
  MoonIcon,
  MenuIcon,
  RefreshIcon,
  ShieldAlertIcon
} from '../common/Icons';

interface NavbarProps {
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileMenu }) => {
  const { theme, toggleTheme } = useTheme();
  const {
    simulateError,
    simulateEmpty,
    fetchDashboard,
    fetchRides,
    fetchDrivers,
    isLoading
  } = useRides();

  const handleRefreshAll = () => {
    fetchDashboard();
    fetchRides();
    fetchDrivers();
  };

  return (
    <header className="app-navbar">
      <div className="navbar-left">
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={onOpenMobileMenu}
          aria-label="Open mobile navigation"
        >
          <MenuIcon size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Region:
          </span>
          <span
            className="badge"
            style={{
              backgroundColor: 'var(--bg-surface-raised)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.75rem',
              fontWeight: 500
            }}
          >
            🇮🇳 India Operations (BLR & BOM)
          </span>
        </div>
      </div>

      <div className="navbar-right">
        {/* Active Simulation Alerts */}
        {simulateError && (
          <span
            className="badge badge-cancelled"
            style={{ fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px' }}
            title="Simulated API errors active"
          >
            <ShieldAlertIcon size={12} /> Error Sim
          </span>
        )}

        {simulateEmpty && (
          <span
            className="badge badge-pending"
            style={{ fontSize: '0.72rem' }}
            title="Simulated empty dataset active"
          >
            Empty Sim
          </span>
        )}

        {/* Global Refresh Button */}
        <button
          type="button"
          className={`btn btn-secondary btn-icon ${isLoading ? 'animate-spin' : ''}`}
          onClick={handleRefreshAll}
          title="Refresh real-time data"
          aria-label="Refresh data"
          disabled={isLoading}
        >
          <RefreshIcon size={14} />
        </button>

        {/* Dark/Light Mode Switcher */}
        <button
          type="button"
          className="btn btn-secondary btn-icon"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <SunIcon size={15} style={{ color: '#fbbf24' }} /> : <MoonIcon size={15} style={{ color: '#475569' }} />}
        </button>

        {/* Admin Profile Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '3px 8px 3px 4px',
            background: 'var(--bg-surface-raised)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-color)'
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Admin"
            style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Rahul Paswan
            </span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
              Fleet Operations
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
