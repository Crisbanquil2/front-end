import { useState, useMemo } from 'react';
import FilterBar from './FilterBar';
import ProgramCard from './ProgramCard';
import { programs } from '../data/mockData';
import './ProgramList.css';

export default function ProgramList() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => {
      const matchesSearch =
        !search ||
        p.code.toLowerCase().includes(search.toLowerCase()) ||
        p.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !filterStatus || p.status === filterStatus;
      const matchesType = !filterType || p.type === filterType;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [search, filterStatus, filterType]);

  const statusOptions = [...new Set(programs.map((p) => p.status))].map((s) => ({
    value: s,
    label: s.charAt(0).toUpperCase() + s.slice(1).replace(' ', ' '),
  }));

  const typeOptions = [...new Set(programs.map((p) => p.type))].map((t) => ({
    value: t,
    label: t,
  }));

  const filters = [
    { id: 'status', label: 'Status', value: filterStatus, options: statusOptions },
    { id: 'type', label: 'Program Type', value: filterType, options: typeOptions },
  ];

  const handleFilterChange = (id, value) => {
    if (id === 'status') setFilterStatus(value);
    if (id === 'type') setFilterType(value);
  };

  return (
    <div className="program-list-page">
      <header className="page-header page-header-row">
        <div>
          <h1>Program Offerings</h1>
          <p className="page-subtitle">Browse and manage academic programs</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + Add Program
        </button>
      </header>

      <FilterBar
        searchPlaceholder="Search by program code or name..."
        searchValue={search}
        onSearchChange={setSearch}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <div className="program-grid">
        {filteredPrograms.map((program, i) => (
          <ProgramCard key={program.id} program={program} index={i} />
        ))}
      </div>

      {filteredPrograms.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon">◉</span>
          <p>No programs match your filters.</p>
        </div>
      )}

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-form program-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Program</h3>
              <button className="modal-close-btn" onClick={() => setShowAddModal(false)} aria-label="Close">×</button>
            </div>
            <form className="modal-body" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Program Code</label>
                <input type="text" placeholder="e.g. BSIT" disabled />
              </div>
              <div className="form-group">
                <label>Program Name</label>
                <input type="text" placeholder="Full program name" disabled />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Program Type</label>
                  <select disabled>
                    <option>Bachelor's</option>
                    <option>Diploma</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input type="text" placeholder="e.g. 4 years" disabled />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Total Units</label>
                  <input type="number" placeholder="168" disabled />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select disabled>
                    <option>active</option>
                    <option>under review</option>
                    <option>phased out</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea rows={3} placeholder="Program description..." disabled />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled>Save (Design Only)</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
