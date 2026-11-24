import { useRef, useState, type ChangeEvent } from 'react'
import { parseCsv } from '../utils/csv'

const SAMPLE_URL = '/sample-records.csv'

interface Dataset {
  name: string
  headers: string[]
  rows: string[][]
}

export default function RecordsPanel() {
  const [dataset, setDataset] = useState<Dataset | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInput = useRef<HTMLInputElement>(null)

  function applyText(name: string, text: string) {
    const table = parseCsv(text)
    if (table.length === 0) {
      setError(`"${name}" is empty.`)
      return
    }
    const [headers, ...rows] = table
    setDataset({ name, headers, rows })
    setError(null)
  }

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = '' // allow picking the same file again later
    if (!file) return
    try {
      applyText(file.name, await file.text())
    } catch {
      setError(`Could not read "${file.name}".`)
    }
  }

  async function loadSample() {
    try {
      const res = await fetch(SAMPLE_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      applyText('sample-records.csv', await res.text())
    } catch {
      setError('Could not load the sample file.')
    }
  }

  return (
    <div>
      <div className="report-header">
        <h1>Records</h1>
        <p>Load a CSV file to view its records.</p>
      </div>

      <div className="records-toolbar">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => fileInput.current?.click()}
        >
          Choose CSV file
        </button>
        <button type="button" className="btn" onClick={loadSample}>
          Load sample data
        </button>
        <input
          ref={fileInput}
          type="file"
          accept=".csv,text/csv"
          hidden
          onChange={handleFileChange}
        />
      </div>

      {error && <p className="error">{error}</p>}

      {dataset ? (
        <>
          <p className="records-meta">
            {dataset.name} · {dataset.rows.length} records
          </p>
          <div className="report-table-wrap">
            <table className="report-table">
              <thead>
                <tr>
                  {dataset.headers.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataset.rows.map((row, i) => (
                  <tr key={i}>
                    {dataset.headers.map((_, j) => (
                      <td key={j}>{row[j] ?? ''}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="records-meta">No file loaded yet.</p>
      )}
    </div>
  )
}
