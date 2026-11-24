import { useState } from 'react'
import { stations, type StationStatus } from '../data/stations'
import { fetchRuntimeRecords, isAlive, type RuntimeRecord } from '../data/runtime'

interface StationOverviewProps {
  onOpenStation: (id: string) => void
}

const statusLabel: Record<StationStatus, string> = {
  connected: 'Connected',
  disconnected: 'Disconnected',
  maintenance: 'Maintenance',
}

export default function StationOverview({ onOpenStation }: StationOverviewProps) {
  const [runtimeRecords, setRuntimeRecords] = useState<RuntimeRecord[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fetchedAt, setFetchedAt] = useState<Date | null>(null)

  async function loadRuntime() {
    setLoading(true)
    setError(null)
    try {
      const records = await fetchRuntimeRecords()
      setRuntimeRecords(records)
      setFetchedAt(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load runtime records.')
    } finally {
      setLoading(false)
    }
  }

  const toolbar = (
    <div className="records-toolbar">
      <button
        type="button"
        className="btn btn-primary"
        onClick={loadRuntime}
        disabled={loading}
      >
        {loading ? 'Loading…' : 'Load runtime from database'}
      </button>
      {fetchedAt && (
        <span className="field-label">Fetched {fetchedAt.toLocaleTimeString()}</span>
      )}
      {error && <span className="field-label">Error: {error}</span>}
    </div>
  )

  if (runtimeRecords) {
    // Judge liveness as of the moment the records were fetched (keeps render pure).
    const now = fetchedAt?.getTime() ?? 0
    const alive = runtimeRecords.filter((r) => isAlive(r, now)).length
    return (
      <div>
        <div className="report-header">
          <h1>Station overview</h1>
          <p>Runtime records from the database.</p>
        </div>

        {toolbar}

        <div className="stats">
          <div className="stat-card">
            <div className="stat-label">Runs found</div>
            <div className="stat-value">{runtimeRecords.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Alive</div>
            <div className="stat-value">{alive}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Not alive</div>
            <div className="stat-value">{runtimeRecords.length - alive}</div>
          </div>
        </div>

        <div className="report-table-wrap">
          <table className="report-table">
            <thead>
              <tr>
                <th>Station ID</th>
                <th>Started</th>
                <th>Last ping</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {runtimeRecords.map((r) => {
                const ok = isAlive(r, now)
                return (
                  <tr key={r._id}>
                    <td>{r.station_id ?? '—'}</td>
                    <td>{r.start_time}</td>
                    <td>{r.last_ping}</td>
                    <td>
                      <span className={`status-badge status-${ok ? 'connected' : 'disconnected'}`}>
                        {ok ? 'Alive' : 'Not alive'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const connected = stations.filter((s) => s.status === 'connected')
  const disconnected = stations.filter((s) => s.status === 'disconnected').length
  const maintenance = stations.filter((s) => s.status === 'maintenance').length

  return (
    <div>
      <div className="report-header">
        <h1>Station overview</h1>
        <p>All stations and their connection status.</p>
      </div>

      {toolbar}

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
