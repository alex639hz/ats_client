export type StationStatus = 'connected' | 'disconnected' | 'maintenance'

export interface Station {
  id: string
  name: string
  location: string
  status: StationStatus
  ip: string
  firmware: string
  lastSeen: string
  currentSession: string | null
  testsToday: number
  uptimeHours: number
}

// Sample data. Replace with live station data from your backend later.
export const stations: Station[] = [
  {
    id: 'ST-01',
    name: 'Station 1',
    location: 'Lab A',
    status: 'connected',
    ip: '192.168.10.11',
    firmware: '2.4.1',
    lastSeen: '2026-11-24 09:12',
    currentSession: 'SES-2026-05',
    testsToday: 14,
    uptimeHours: 312,
  },
  {
    id: 'ST-02',
    name: 'Station 2',
    location: 'Lab A',
    status: 'connected',
    ip: '192.168.10.12',
    firmware: '2.4.1',
    lastSeen: '2026-11-24 09:14',
    currentSession: null,
    testsToday: 9,
    uptimeHours: 298,
  },
  {
    id: 'ST-03',
    name: 'Station 3',
    location: 'Lab B',
    status: 'connected',
    ip: '192.168.20.21',
    firmware: '2.3.8',
    lastSeen: '2026-11-24 09:13',
    currentSession: 'SES-2026-04',
    testsToday: 11,
    uptimeHours: 540,
  },
  {
    id: 'ST-04',
    name: 'Station 4',
    location: 'Lab B',
    status: 'disconnected',
    ip: '192.168.20.22',
    firmware: '2.3.8',
    lastSeen: '2026-11-23 17:40',
    currentSession: null,
    testsToday: 0,
    uptimeHours: 0,
  },
  {
    id: 'ST-05',
    name: 'Station 5',
    location: 'Room C',
    status: 'maintenance',
    ip: '192.168.30.31',
    firmware: '2.2.0',
    lastSeen: '2026-11-22 16:05',
    currentSession: null,
    testsToday: 0,
    uptimeHours: 120,
  },
  {
    id: 'ST-06',
    name: 'Station 6',
    location: 'Room C',
    status: 'connected',
    ip: '192.168.30.32',
    firmware: '2.4.1',
    lastSeen: '2026-11-24 09:11',
    currentSession: 'SES-2026-03',
    testsToday: 7,
    uptimeHours: 275,
  },
]
