import { useState } from 'react'
import { sendFrameworkCommand, type FrameworkAction } from '../data/framework'
import { stations, type StationStatus } from '../data/stations'

interface StationPanelProps {
  stationId: string
  onSelectStation: (id: string) => void
}

const statusLabel: Record<StationStatus, string> = {
  connected: 'Connected',
  disconnected: 'Disconnected',
  maintenance: 'Maintenance',
}

export default function StationPanel({ stationId, onSelectStation }: StationPanelProps) {
  const station = stations.find((s) => s.id === stationId) ?? stations[0]
  const [pending, setPending] = useState<FrameworkAction | null>(null)
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null)

  async function runCommand(action: FrameworkAction) {
    setPending(action)
    setMessage(null)
    try {
      await sendFrameworkCommand(action, 'dut_test')
      setMessage({ ok: true, text: action === 'start' ? 'Test started.' : 'Test stopped.' })
    } catch (err) {
      const text = err instanceof Error ? err.message : String(err)
      setMessage({ ok: false, text: `Failed to ${action} test: ${text}` })
    } finally {
      setPending(null)
    }
  }

  return (
    <div>
      <div className="report-header">
        <h1>Station panel</h1>
        <p>Details for the selected station.</p>
      </div>

      <div className="records-toolbar">
        <label htmlFor="station-select" className="field-label">
          Station
        </label>
        <select
          id="station-select"
          className="select"
          value={station.id}
          onChange={(e) => onSelectStation(e.target.value)}
        >
          {stations.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.location})
            </option>
          ))}
        </select>
        <button
          type="button"
          className="btn btn-primary"
          disabled={pending !== null}
          onClick={() => void runCommand('start')}
        >
          {pending === 'start' ? 'Starting…' : 'Start'}
        </button>
        <button
          type="button"
          className="btn btn-danger"
          disabled={pending !== null}
          onClick={() => void runCommand('stop')}
        >
          {pending === 'stop' ? 'Stopping…' : 'Stop'}
        </button>
      </div>

      {message && <p className={message.ok ? 'success' : 'error'}>{message.text}</p>}

      <div className="stats">
        <div className="stat-card">
          <div className="stat-label">Status</div>
          <div className="stat-value">
            <span className={`status-badge status-${station.status}`}>
              {statusLabel[station.status]}
            </span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Tests today</div>
          <div className="stat-value">{station.testsToday}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Uptime (hours)</div>
          <div className="stat-value">{station.uptimeHours}</div>
        </div>
      </div>

      <div className="stat-card">
        <dl className="info-grid">
          <dt>Station ID</dt>
          <dd>{station.id}</dd>
          <dt>Location</dt>
          <dd>{station.location}</dd>
          <dt>IP address</dt>
          <dd>{station.ip}</dd>
          <dt>Firmware</dt>
          <dd>{station.firmware}</dd>
          <dt>Current session</dt>
          <dd>{station.currentSession ?? 'None'}</dd>
          <dt>Last seen</dt>
          <dd>{station.lastSeen}</dd>
        </dl>
      </div>
    </div>
  )
}
