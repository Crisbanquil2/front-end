import { programs } from '../data/mockData';
import './SubjectDetails.css';

export default function SubjectDetails({ subject, onClose }) {
  const program = programs.find((p) => p.id === subject.programId);

  const semesterLabel = {
    semester: 'Per Semester',
    term: 'Per Term',
    both: 'Both Semester & Term',
  }[subject.semesterType] || 'N/A';

  const prereqText = subject.prereqs?.length > 0
    ? subject.prereqs.join(', ')
    : 'None';

  const coreqText = subject.coreqs?.length > 0
    ? subject.coreqs.join(', ')
    : 'None';

  return (
    <div className="subject-modal-overlay" onClick={onClose}>
      <div className="subject-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>

        <div className="subject-modal-header">
          <div className="modal-header-top">
            <span className="subject-code-big">{subject.code}</span>
            <span className={`tag tag-${subject.semesterType}`}>
              {semesterLabel}
            </span>
          </div>
          <h2>{subject.title}</h2>
        </div>

        <div className="subject-modal-body">
          <div className="detail-row">
            <span className="detail-label">Units</span>
            <span className="detail-value">{subject.units}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Semester/Term Offered</span>
            <span className="detail-value">{semesterLabel}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Pre-requisites</span>
            <span className="detail-value">{prereqText}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Co-requisites</span>
            <span className="detail-value">{coreqText}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Program Assignment</span>
            <span className="detail-value">{program ? `${program.code} - ${program.name}` : 'None'}</span>
          </div>
          {subject.description && (
            <div className="detail-block">
              <span className="detail-label">Description</span>
              <p className="detail-desc">{subject.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
