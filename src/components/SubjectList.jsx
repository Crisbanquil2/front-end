import { useState, useMemo } from 'react';
import FilterBar from './FilterBar';
import SubjectCard from './SubjectCard';
import SubjectDetails from './SubjectDetails';
import { subjects, programs } from '../data/mockData';
import './SubjectList.css';

export default function SubjectList() {
  const [search, setSearch] = useState('');
  const [filterSemester, setFilterSemester] = useState('');
  const [filterUnits, setFilterUnits] = useState('');
  const [filterPrereq, setFilterPrereq] = useState('');
  const [filterProgram, setFilterProgram] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null);

  const filteredSubjects = useMemo(() => {
    return subjects.filter((s) => {
      const matchesSearch =
        !search ||
        s.code.toLowerCase().includes(search.toLowerCase()) ||
        s.title.toLowerCase().includes(search.toLowerCase());
      const matchesSemester = !filterSemester || s.semesterType === filterSemester;
      const matchesUnits = !filterUnits || s.units === parseInt(filterUnits, 10);
      const matchesPrereq =
        filterPrereq === '' ||
        (filterPrereq === 'with' && s.prereqs?.length > 0) ||
        (filterPrereq === 'without' && (!s.prereqs || s.prereqs.length === 0));
      const matchesProgram = !filterProgram || s.programId === parseInt(filterProgram, 10);
      return matchesSearch && matchesSemester && matchesUnits && matchesPrereq && matchesProgram;
    });
  }, [search, filterSemester, filterUnits, filterPrereq, filterProgram]);

  const filters = [
    { id: 'semester', label: 'Semester/Term', value: filterSemester, options: [
      { value: 'semester', label: 'Semester' },
      { value: 'term', label: 'Term' },
      { value: 'both', label: 'Both' },
    ]},
    { id: 'units', label: 'Units', value: filterUnits, options: [
      { value: '3', label: '3 units' },
      { value: '4', label: '4 units' },
    ]},
    { id: 'prereq', label: 'Pre-requisites', value: filterPrereq, options: [
      { value: 'with', label: 'With pre-req' },
      { value: 'without', label: 'Without pre-req' },
    ]},
    { id: 'program', label: 'Program', value: filterProgram, options: programs.map((p) => ({
      value: String(p.id),
      label: p.code,
    })) },
  ];

  const handleFilterChange = (id, value) => {
    if (id === 'semester') setFilterSemester(value);
    if (id === 'units') setFilterUnits(value);
    if (id === 'prereq') setFilterPrereq(value);
    if (id === 'program') setFilterProgram(value);
  };

  return (
    <div className="subject-list-page">
      <header className="page-header">
        <h1>Subject Offerings</h1>
        <p className="page-subtitle">Browse and view subject details</p>
      </header>

      <FilterBar
        searchPlaceholder="Search by subject code or title..."
        searchValue={search}
        onSearchChange={setSearch}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <div className="subject-grid">
        {filteredSubjects.map((subject, i) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onClick={setSelectedSubject}
            index={i}
          />
        ))}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon">◇</span>
          <p>No subjects match your filters.</p>
        </div>
      )}

      {selectedSubject && (
        <SubjectDetails
          subject={selectedSubject}
          onClose={() => setSelectedSubject(null)}
        />
      )}
    </div>
  );
}
