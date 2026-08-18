import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CarIcon } from '../components/common/Icons';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="page-container flex-center"
      style={{ minHeight: '60vh', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary-subtle)',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CarIcon size={36} />
      </div>

      <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>404</h1>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-secondary)', margin: 0 }}>
        Page Route Off-Course
      </h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '400px', fontSize: '0.9rem' }}>
        The mobility dashboard page or ride resource you are trying to reach does not exist or has been relocated.
      </p>

      <button
        type="button"
        className="btn btn-primary"
        onClick={() => navigate('/')}
        style={{ marginTop: '8px' }}
      >
        <ArrowLeftIcon size={16} />
        Return to Dashboard
      </button>
    </div>
  );
};
