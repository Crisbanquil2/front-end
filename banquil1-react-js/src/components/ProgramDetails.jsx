import { useParams, Link } from 'react-router-dom';
import { programs, programYearLevels, subjects } from '../data/mockData';
import './ProgramDetails.css';

export default function ProgramDetails() {
  const { id } = useParams();
  const program = programs.find((p) => p.id === parseInt(id, 10));

  if (!program) {
    return (
      <div className="program-details">
        <p className="error-msg">Program not found.</p>
        <Link to="/programs" className="btn btn-ghost">← Back to programs</Link>
      </div>
    );
  }

  const yearLevels = programYearLevels[program.id] || [];
  const programSubjects = new Map();
  subjects.forEach((s) => programSubjects.set(s.code, s));

  const statusClass = program.status === 'active'
    ? 'badge-active'
    : program.status === 'phased out'
    ? 'badge-phased-out'
    : 'badge-under-review';

  return (
    <div className="program-details">
      <div className="details-header">
        <Link to="/programs" className="back-link">← Back to programs</Link>
      </div>

      <div className="details-hero" style={{ animationDelay: '0.05s' }}>
        <div className="hero-top">
          <span className="program-code-big">{program.code}</span>
          <span className={`badge ${statusClass}`}>{program.status}</span>
        </div>
        <h1>{program.name}</h1>
        <p className="hero-desc">{program.description}</p>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-value">{program.duration}</span>
            <span className="hero-stat-label">Duration</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">{program.totalUnits}</span>
            <span className="hero-stat-label">Total Units</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">{program.type}</span>
            <span className="hero-stat-label">Program Type</span>
          </div>
        </div>
      </div>

      <div className="year-levels-section">
        <h2>Year Levels & Subjects</h2>
        <div className="year-levels-grid">
          {yearLevels.map((yl, i) => (
            <div key={yl.year} className="year-level-card" style={{ animationDelay: `${0.1 + i * 0.05}s` }}>
              <h3 className="year-title">{getOrdinal(yl.year)} Year</h3>
              <ul className="subject-list">
                {(yl.subjects || []).map((code) => {
                  const subj = programSubjects.get(code);
                  return (
                    <li key={code} className="subject-item">
                      <span className="subj-code">{code}</span>
                      <span className="subj-title">{subj?.title || code}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getOrdinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
