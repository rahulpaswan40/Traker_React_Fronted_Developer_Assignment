import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { Ride, RideStatus } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { FareBreakdown } from '../components/rides/FareBreakdown';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { ErrorState } from '../components/common/ErrorState';
import { useToast } from '../context/ToastContext';
import { formatDateTime, getVehicleBadgeColor } from '../utils/formatters';
import {
  ArrowLeftIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  StarIcon,
  CarIcon,
  XIcon
} from '../components/common/Icons';

export const RideDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [ride, setRide] = useState<Ride | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRide = async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      setError(null);
      const data = await apiService.getRideById(id);
      if (!data) {
        setError(`Ride with ID "${id}" was not found in the fleet database.`);
      } else {
        setRide(data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch ride details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRide();
  }, [id]);

  const handleStatusChange = async (newStatus: RideStatus) => {
    if (!ride) return;
    try {
      const updated = await apiService.updateRideStatus(ride.id, newStatus);
      setRide(updated);
      showToast(`Ride ${ride.id} status changed to ${newStatus}`, 'success', 'Status Updated');
    } catch (err: any) {
      showToast(err.message || 'Status update failed', 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="page-container">
        <SkeletonLoader type="details" />
      </div>
    );
  }

  if (error || !ride) {
    return (
      <div className="page-container">
        <ErrorState
          title="Ride Record Not Found"
          message={error || 'The requested ride ID does not exist.'}
          onRetry={() => navigate('/rides')}
        />
        <div style={{ textAlign: 'center', marginTop: '12px' }}>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/rides')}>
            <ArrowLeftIcon size={16} /> Return to Rides
          </button>
        </div>
      </div>
    );
  }

  const vehicleStyle = getVehicleBadgeColor(ride.vehicleType);

  return (
    <div className="page-container animate-fade-in">
      {/* Top Navigation & Status Bar */}
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            type="button"
            className="btn btn-secondary btn-icon"
            onClick={() => navigate('/rides')}
            title="Return to Rides List"
            aria-label="Back to Rides"
          >
            <ArrowLeftIcon size={16} />
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 className="page-header-title" style={{ fontFamily: 'monospace' }}>
                {ride.id}
              </h1>
              <StatusBadge status={ride.status} />
            </div>
            <p className="page-header-subtitle">
              Booked on {formatDateTime(ride.createdAt)} • Trip Duration: {ride.durationMins} mins ({ride.distanceKm} km)
            </p>
          </div>
        </div>

        {/* Quick Status Modifiers */}
        <div className="page-actions">
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Status:</span>
          <div className="segmented-control">
            {(['Pending', 'Ongoing', 'Completed', 'Cancelled'] as RideStatus[]).map(st => (
              <button
                key={st}
                type="button"
                className={`segmented-btn ${ride.status === st ? 'active' : ''}`}
                onClick={() => handleStatusChange(st)}
              >
                {st}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => window.print()}
            title="Print or export ride invoice"
          >
            Print Receipt
          </button>
        </div>
      </div>

      {/* Main Grid: Details Left + Fare Right */}
      <div className="grid-3" style={{ gridTemplateColumns: '2fr 1fr', alignItems: 'start' }}>
        {/* Left Column: Route, Customer, Driver */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Simulated Route & Live Map Visualization */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {/* Map Header Graphic */}
            <div
              style={{
                height: '160px',
                backgroundColor: 'var(--bg-surface-raised)',
                borderBottom: '1px solid var(--border-color)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              {/* Map grid simulation lines */}
              <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
                <defs>
                  <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="var(--border-color)" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Route Path Polyline */}
                <path
                  d="M 60 110 Q 180 30, 320 90 T 520 50"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3"
                  strokeDasharray="5 3"
                />
              </svg>

              {/* Waypoint Markers */}
              <div
                style={{
                  position: 'absolute',
                  left: '14%',
                  top: '52%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--bg-surface)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid #2563eb',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2563eb' }} />
                Pickup: {ride.pickup.address.split(',')[0]}
              </div>

              <div
                style={{
                  position: 'absolute',
                  right: '14%',
                  top: '24%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--bg-surface)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--accent-rose)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-rose)' }} />
                Drop: {ride.drop.address.split(',')[0]}
              </div>
            </div>

            {/* Route Timeline Description */}
            <div style={{ padding: '18px' }}>
              <h3 className="card-title" style={{ marginBottom: '14px' }}>
                <MapPinIcon size={16} style={{ color: '#2563eb' }} />
                Route Timeline
              </h3>

              <div className="timeline-track">
                {/* Pickup point */}
                <div className="timeline-item">
                  <div className="timeline-dot">
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#2563eb' }} />
                  </div>
                  <span className="timeline-time">
                    {ride.pickup.time ? formatDateTime(ride.pickup.time) : 'Estimated Departure'}
                  </span>
                  <div className="timeline-address">{ride.pickup.address}</div>
                  <div className="timeline-landmark">
                    {ride.pickup.city} {ride.pickup.landmark ? `• ${ride.pickup.landmark}` : ''}
                  </div>
                </div>

                {/* Dropoff point */}
                <div className="timeline-item">
                  <div className="timeline-dot drop">
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--accent-rose)' }} />
                  </div>
                  <span className="timeline-time">
                    {ride.drop.time ? formatDateTime(ride.drop.time) : 'Estimated Arrival'}
                  </span>
                  <div className="timeline-address">{ride.drop.address}</div>
                  <div className="timeline-landmark">
                    {ride.drop.city} {ride.drop.landmark ? `• ${ride.drop.landmark}` : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Driver Entity Cards */}
          <div className="grid-2">
            {/* Customer Card */}
            <div className="card">
              <h4 className="card-title" style={{ fontSize: '0.88rem', marginBottom: '12px' }}>
                Customer Information
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <img
                  src={ride.customer.avatar}
                  alt={ride.customer.name}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                    {ride.customer.name}
                  </strong>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <StarIcon size={12} style={{ color: '#f59e0b' }} />
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      {ride.customer.rating} • {ride.customer.totalRides} lifetime rides
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                  <PhoneIcon size={13} />
                  <span>{ride.customer.phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                  <MailIcon size={13} />
                  <span>{ride.customer.email}</span>
                </div>
              </div>
            </div>

            {/* Driver Card */}
            <div className="card">
              <h4 className="card-title" style={{ fontSize: '0.88rem', marginBottom: '12px' }}>
                Assigned Driver & Vehicle
              </h4>
              {ride.driver ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <img
                      src={ride.driver.avatar}
                      alt={ride.driver.name}
                      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                        {ride.driver.name}
                      </strong>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <StarIcon size={12} style={{ color: '#f59e0b' }} />
                        <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                          {ride.driver.rating} • {ride.driver.totalRides} trips
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                      <PhoneIcon size={13} />
                      <span>{ride.driver.phone}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                        <CarIcon size={13} />
                        <span>{ride.driver.vehicle}</span>
                      </div>
                      <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.78rem' }}>
                        {ride.driver.vehicleNumber}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ padding: '14px', textAlign: 'center', background: 'var(--bg-surface-raised)', borderRadius: 'var(--radius-sm)' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    No driver assigned yet for this pending trip.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => handleStatusChange('Ongoing')}
                  >
                    Dispatch Driver
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Cancellation Notice if applicable */}
          {ride.cancellationReason && (
            <div
              style={{
                padding: '12px 14px',
                backgroundColor: 'var(--status-cancelled-bg)',
                border: '1px solid var(--status-cancelled-border)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <XIcon size={16} style={{ color: 'var(--accent-rose)', flexShrink: 0 }} />
              <div>
                <strong style={{ fontSize: '0.82rem', color: 'var(--status-cancelled-text)' }}>
                  Cancellation Reason:
                </strong>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                  {ride.cancellationReason}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Fare Breakdown & Vehicle Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Vehicle Category Badge Card */}
          <div className="card">
            <div className="flex-between">
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Category</span>
              <span
                className="vehicle-tag"
                style={{
                  backgroundColor: vehicleStyle.bg,
                  color: vehicleStyle.color,
                  borderColor: vehicleStyle.border
                }}
              >
                {ride.vehicleType}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '8px' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {ride.distanceKm}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>km total distance</span>
            </div>
          </div>

          {/* Detailed Itemized Fare Breakdown */}
          <FareBreakdown fare={ride.fare} />

          {/* Action to Return to Rides page */}
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate('/rides')}
            style={{ width: '100%' }}
          >
            <ArrowLeftIcon size={14} />
            Return to Rides
          </button>
        </div>
      </div>
    </div>
  );
};
