import { useSubscribeDev } from '@subscribe.dev/react';
import './SubscriptionPanel.css';

export function SubscriptionPanel() {
  const { usage, subscriptionStatus, subscribe } = useSubscribeDev();

  const remainingCredits = usage?.remainingCredits ?? 0;
  const allocatedCredits = usage?.allocatedCredits ?? 0;
  const usedCredits = usage?.usedCredits ?? 0;
  const planName = subscriptionStatus?.plan?.name ?? 'Free';
  const planStatus = subscriptionStatus?.status ?? 'none';

  const usagePercentage = allocatedCredits > 0
    ? Math.round((usedCredits / allocatedCredits) * 100)
    : 0;

  return (
    <div className="subscription-panel">
      <div className="panel-header">
        <h3>Subscription Status</h3>
      </div>

      <div className="plan-info">
        <div className="info-row">
          <span className="info-label">Plan:</span>
          <span className={`plan-badge plan-${planStatus}`}>{planName}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Status:</span>
          <span className={`status-badge status-${planStatus}`}>
            {planStatus === 'active' && '✓ Active'}
            {planStatus === 'inactive' && '○ Inactive'}
            {planStatus === 'cancelled' && '⊘ Cancelled'}
            {planStatus === 'expired' && '⚠ Expired'}
            {planStatus === 'none' && '− None'}
          </span>
        </div>
      </div>

      <div className="usage-info">
        <div className="usage-header">
          <span className="usage-label">Credits</span>
          <span className="usage-value">{remainingCredits.toLocaleString()} remaining</span>
        </div>
        <div className="usage-bar">
          <div
            className="usage-bar-fill"
            style={{ width: `${usagePercentage}%` }}
            role="progressbar"
            aria-valuenow={usagePercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${usagePercentage}% credits used`}
          ></div>
        </div>
        <div className="usage-details">
          <span>{usedCredits.toLocaleString()} used</span>
          <span>{allocatedCredits.toLocaleString()} total</span>
        </div>
      </div>

      <button className="btn-manage" onClick={subscribe!}>
        Manage Subscription
      </button>
    </div>
  );
}