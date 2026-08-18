import React from 'react';
import { FareBreakdown as FareBreakdownType } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { DollarSignIcon } from '../common/Icons';

interface FareBreakdownProps {
  fare: FareBreakdownType;
}

export const FareBreakdown: React.FC<FareBreakdownProps> = ({ fare }) => {
  return (
    <div className="fare-breakdown-card">
      <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <DollarSignIcon size={16} style={{ color: 'var(--primary)' }} />
          <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>
            Fare Breakdown
          </strong>
        </div>
        <span
          className="badge"
          style={{
            backgroundColor: fare.paymentStatus === 'Paid' ? 'var(--status-completed-bg)' : 'var(--status-pending-bg)',
            color: fare.paymentStatus === 'Paid' ? 'var(--status-completed-text)' : 'var(--status-pending-text)',
            fontSize: '0.72rem'
          }}
        >
          {fare.paymentStatus} • {fare.paymentMethod}
        </span>
      </div>

      <div className="fare-row">
        <span>Base Fare</span>
        <span>{formatCurrency(fare.baseFare)}</span>
      </div>

      <div className="fare-row">
        <span>Distance Rate</span>
        <span>{formatCurrency(fare.distanceFare)}</span>
      </div>

      <div className="fare-row">
        <span>Time / Waiting Charges</span>
        <span>{formatCurrency(fare.timeFare)}</span>
      </div>

      {fare.surgeMultiplier > 1 && (
        <div className="fare-row" style={{ color: 'var(--accent-amber)' }}>
          <span>Peak Demand Surge</span>
          <span>{fare.surgeMultiplier}x</span>
        </div>
      )}

      <div className="fare-row">
        <span>GST (5%) & FastTag Tolls</span>
        <span>{formatCurrency(fare.taxAndFees)}</span>
      </div>

      {fare.discount > 0 && (
        <div className="fare-row discount">
          <span>UPI Promo Discount</span>
          <span>-{formatCurrency(fare.discount)}</span>
        </div>
      )}

      <div className="fare-row total">
        <span>Total Fare</span>
        <span style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>
          {formatCurrency(fare.totalFare)}
        </span>
      </div>
    </div>
  );
};
