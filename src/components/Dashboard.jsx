import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { programs, subjects } from '../data/mockData';
import './Dashboard.css';

export default function Dashboard() {
  const stats = useMemo(() => {
    const activePrograms = programs.filter((p) => p.status === 'active').length;
    const inactivePrograms = programs.length - activePrograms;
    const withPrereqs = subjects.filter((s) => s.prereqs?.length > 0).length;
    const bySemester = subjects.filter((s) => s.semesterType === 'semester').length;
    const byTerm = subjects.filter((s) => s.semesterType === 'term').length;
    const byBoth = subjects.filter((s) => s.semesterType === 'both').length;

    return {
      totalPrograms: programs.length,
      totalSubjects: subjects.length,
      activePrograms,
      inactivePrograms,
      subjectsWithPrereqs: withPrereqs,
      subjectsPerSemester: bySemester,
      subjectsPerTerm: byTerm,
      subjectsBoth: byBoth,
      recentlyAddedPrograms: [...programs]
        .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
        .slice(0, 3),
      recentlyAddedSubjects: [...subjects]
        .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
        .slice(0, 4),
    };
  }, []);

  const chartData = [
    { name: 'Semester', value: stats.subjectsPerSemester, color: '#14b8a6' },
    { name: 'Term', value: stats.subjectsPerTerm, color: '#38bdf8' },
    { name: 'Both', value: stats.subjectsBoth, color: '#f59e0b' },
  ];

  const statusChartData = [
    { name: 'Active', value: stats.activePrograms, color: '#22c55e' },
    { name: 'Inactive/Other', value: stats.inactivePrograms, color: '#64748b' },
  ];

  return (
    <div className="dashboard">
      <header className="page-header">
        <h1>Dashboard</h1>
        <p className="page-subtitle">Overview of programs and subject offerings</p>
      </header>

      {/* Stat Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Programs"
          value={stats.totalPrograms}
          icon="◉"
          delay="0.1s"
        />
        <StatCard
          title="Total Subjects"
          value={stats.totalSubjects}
          icon="◇"
          delay="0.15s"
        />
        <StatCard
          title="Active Programs"
          value={stats.activePrograms}
          subValue={`${stats.inactivePrograms} inactive`}
          icon="✓"
          delay="0.2s"
        />
        <StatCard
          title="Subjects with Pre-requisites"
          value={stats.subjectsWithPrereqs}
          icon="→"
          delay="0.25s"
        />
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        <div className="chart-card" style={{ animationDelay: '0.2s' }}>
          <h3>Subjects by Semester/Term</h3>
          <div className="chart-inner">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--color-bg-elevated)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                  }}
                />
                <Bar dataKey="value" fill="#14b8a6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="chart-card" style={{ animationDelay: '0.25s' }}>
          <h3>Program Status</h3>
          <div className="chart-inner">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={statusChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusChartData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'var(--color-bg-elevated)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recently Added */}
      <div className="recent-section">
        <div className="recent-card" style={{ animationDelay: '0.3s' }}>
          <div className="recent-header">
            <h3>Recently Added Programs</h3>
            <Link to="/programs" className="link-more">View all →</Link>
          </div>
          <ul className="recent-list">
            {stats.recentlyAddedPrograms.map((p, i) => (
              <li key={p.id} className="recent-item">
                <span className="recent-code">{p.code}</span>
                <span className="recent-name">{p.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="recent-card" style={{ animationDelay: '0.35s' }}>
          <div className="recent-header">
            <h3>Recently Added Subjects</h3>
            <Link to="/subjects" className="link-more">View all →</Link>
          </div>
          <ul className="recent-list">
            {stats.recentlyAddedSubjects.map((s, i) => (
              <li key={s.id} className="recent-item">
                <span className="recent-code">{s.code}</span>
                <span className="recent-name">{s.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subValue, icon, delay }) {
  return (
    <div className="stat-card" style={{ animationDelay: delay }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <span className="stat-value">{value}</span>
        <span className="stat-title">{title}</span>
        {subValue && <span className="stat-sub">{subValue}</span>}
      </div>
    </div>
  );
}
