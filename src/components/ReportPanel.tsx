import { reports, type ReportKey } from '../data/reports'

interface ReportPanelProps {
  report: ReportKey
}

export default function ReportPanel({ report }: ReportPanelProps) {
  const data = reports.find((r) => r.key === report)

  if (!data) {
    return <p>Report not found.</p>
  }

  return (
    <div>
      <div className="report-header">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </div>

      <div className="stats">
        {data.stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="report-table-wrap">
        <table className="report-table">
          <thead>
            <tr>
              {data.columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
