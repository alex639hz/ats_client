// One document from the MongoDB 'runtime' collection (written by the station engine).
export interface RuntimeRecord {
  _id: string
  start_time: string
  last_ping: string
  station_id?: string
}

// A station counts as alive if its last heartbeat is newer than this.
export const ALIVE_WINDOW_MS = 30_000

export function isAlive(record: RuntimeRecord, now = Date.now()): boolean {
  const ping = Date.parse(record.last_ping)
  return !Number.isNaN(ping) && now - ping <= ALIVE_WINDOW_MS
}

export async function fetchRuntimeRecords(): Promise<RuntimeRecord[]> {
  const res = await fetch('/api/runtime')
  const body = (await res.json().catch(() => null)) as
    | { records?: RuntimeRecord[]; error?: string }
    | null
  if (!res.ok || !body?.records) {
    throw new Error(body?.error ?? `HTTP ${res.status}`)
  }
  return body.records
}
