import './FilterBar.css';

export default function FilterBar({
  searchPlaceholder = 'Search...',
  searchValue,
  onSearchChange,
  filters = [],
  onFilterChange,
}) {
  return (
    <div className="filterbar" style={{ animationDelay: '0.1s' }}>
      <div className="filterbar-search">
        <span className="search-icon">⌕</span>
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchValue || ''}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="search-input"
        />
      </div>
      {filters.length > 0 && (
        <div className="filterbar-filters">
          {filters.map((filter) => (
            <div key={filter.id} className="filter-group">
              <label className="filter-label">{filter.label}</label>
              <select
                value={filter.value || ''}
                onChange={(e) => onFilterChange?.(filter.id, e.target.value)}
                className="filter-select"
              >
                <option value="">All</option>
                {filter.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
