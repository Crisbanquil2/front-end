import { Link } from 'react-router-dom';
import './ProgramCard.css';

export default function ProgramCard({ program, index = 0 }) {
  const statusClass = program.status === 'active'
    ? 'badge-active'
    : program.status === 'phased out'
    ? 'badge-phased-out'
    : 'badge-under-review';

  return (
    <Link to={`/programs/${program.id}`} className="program-card-link" style={{ animationDelay: `${0.1 + index * 0.04}s` }}>
      <article className="program-card">
        <div className="program-card-header">
          <span className="program-code">{program.code}</span>
          <span className={`badge ${statusClass}`}>{program.status}</span>
        </div>
        <h3 className="program-name">{program.name}</h3>
        <div className="program-meta">
          <span className="meta-item">
            <span className="meta-label">Type</span>
            <span className="meta-value">{program.type}</span>
          </span>
          <span className="meta-item">
            <span className="meta-label">Duration</span>
            <span className="meta-value">{program.duration}</span>
          </span>
          <span className="meta-item">
            <span className="meta-label">Units</span>
            <span className="meta-value">{program.totalUnits}</span>
          </span>
        </div>
        <div className="program-card-footer">
          <span className="view-detail">View details →</span>
        </div>
      </article>
    </Link>
  );
}
