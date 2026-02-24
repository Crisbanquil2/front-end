import { programs } from '../data/mockData';
import './SubjectCard.css';

export default function SubjectCard({ subject, onClick, index = 0 }) {
  const program = programs.find((p) => p.id === subject.programId);

  const semesterBadge = {
    semester: { label: 'Semester', class: 'tag-semester' },
    term: { label: 'Term', class: 'tag-term' },
    both: { label: 'Both', class: 'tag-both' },
  }[subject.semesterType] || { label: 'N/A', class: 'tag-default' };

  const hasPrereq = subject.prereqs?.length > 0;

  return (
    <article
      className="subject-card"
      style={{ animationDelay: `${0.1 + index * 0.04}s` }}
      onClick={() => onClick?.(subject)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(subject)}
    >
      <div className="subject-card-header">
        <span className="subject-code">{subject.code}</span>
        <span className={`tag ${semesterBadge.class}`}>{semesterBadge.label}</span>
      </div>
      <h3 className="subject-title">{subject.title}</h3>
      <div className="subject-meta">
        <span className="meta-badge">{subject.units} units</span>
        {program && <span className="meta-badge program">{program.code}</span>}
        {hasPrereq && <span className="meta-badge prereq">Pre-req</span>}
      </div>
      {subject.description && (
        <p className="subject-desc">{subject.description}</p>
      )}
    </article>
  );
}
