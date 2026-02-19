import '../MetricCard.css';

export default function MetricCard({ icon, title, subtitle, value, unit, status }) {
  return (
    <div className={`metric-card ${status ? `status-${status}` : ''}`}>
      <div className="metric-icon">{icon}</div>
      <div className="metric-content">
        <h3 className="metric-title">{title}</h3>
        <p className="metric-subtitle">{subtitle}</p>
      </div>
      {value && (
        <div className="metric-value">
          {value}<span className="metric-unit">{unit}</span>
        </div>
      )}
    </div>
  );
}
