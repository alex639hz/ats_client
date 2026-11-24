import { stations, type StationStatus } from '../data/stations'

interface StationOverviewProps {
  onOpenStation: (id: string) => void
}

const statusLabel: Record<StationStatus, string> = {
  connected: 'Connected',
  disconnected: 'Disconnected',
  maintenance: 'Maintenance',
}

export default function StationOverview({ onOpenStation }: StationOverviewProps) {
  const connected = stations.filter((s) => s.status === 'connected')
  const disconnected = stations.filter((s) => s.status === 'disconnected').length
  const maintenance = stations.filter((s) => s.status === 'maintenance').length

  return (
    <div>
      <div className="report-header">
        <h1>Station overview</h1>
        <p>All stations and their connection status.</p>
      </div>

      <div className="stats">
        <div className="stat-card">
          <div className="stat-label">Connected</div>
          <div className="stat-value">{connected.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Disconnected</div>
          <div className="stat-value">{disconnected}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Maintenance</div>
          <div className="stat-value">{maintenance}</div>
        </div>
      </div>

      <div className="report-table-wrap">
        <table className="report-table">
          <thead>
            <tr>
              <th>Station</th>
              <th>Location</th>
              <th>Status</th>
              <th>IP address</th>
              <th>Current session</th>
              <th>Last seen</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {stations.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.location}</td>
                <td>
                  <span className={`status-badge status-${s.status}`}>
                    {statusLabel[s.status]}
                  </span>
                </td>
                <td>{s.ip}</td>
                <td>{s.currentSession ?? '—'}</td>
                <td>{s.lastSeen}</td>
                <td>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => onOpenStation(s.id)}
                  >
                    Open
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
