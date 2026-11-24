import { reports, type ReportKey } from '../data/reports'

interface SidebarProps {
  active: ReportKey
  onSelect: (key: ReportKey) => void
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
    </aside>
  )
}
