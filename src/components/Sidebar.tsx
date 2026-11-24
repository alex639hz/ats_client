import { reports, type View } from '../data/reports'

interface SidebarProps {
  active: View
  onSelect: (view: View) => void
}

export default function Sidebar({ active, onSelect }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Reports</div>
      <nav className="sidebar-nav">
        {reports.map((report) => (
          <button
            key={report.key}
            type="button"
            className={`sidebar-item${report.key === active ? ' active' : ''}`}
            aria-current={report.key === active ? 'page' : undefined}
            onClick={() => onSelect(report.key)}
          >
            {report.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-title sidebar-section">Data</div>
      <nav className="sidebar-nav">
        <button
          type="button"
          className={`sidebar-item${active === 'records' ? ' active' : ''}`}
          aria-current={active === 'records' ? 'page' : undefined}
          onClick={() => onSelect('records')}
        >
          Records (CSV)
        </button>
      </nav>

      <div className="sidebar-title sidebar-section">Station</div>
      <nav className="sidebar-nav">
        <button
          type="button"
          className={`sidebar-item${active === 'station-overview' ? ' active' : ''}`}
          aria-current={active === 'station-overview' ? 'page' : undefined}
          onClick={() => onSelect('station-overview')}
        >
          Overview
        </button>
        <button
          type="button"
          className={`sidebar-item${active === 'station-panel' ? ' active' : ''}`}
          aria-current={active === 'station-panel' ? 'page' : undefined}
          onClick={() => onSelect('station-panel')}
        >
          Station panel
        </button>
      </nav>
    </aside>
  )
}
