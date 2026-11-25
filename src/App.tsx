import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ReportPanel from './components/ReportPanel'
import RecordsPanel from './components/RecordsPanel'
import SignInPage from './components/SignInPage'
import StationOverview from './components/StationOverview'
import StationPanel from './components/StationPanel'
import { type View } from './data/reports'
import { stations } from './data/stations'
import { type User } from './data/users'
import './App.css'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [activeView, setActiveView] = useState<View>('overview')
  const [selectedStationId, setSelectedStationId] = useState(stations[0].id)

  if (!user) {
    return <SignInPage onSignIn={setUser} />
  }

  function openStation(id: string) {
    setSelectedStationId(id)
    setActiveView('station-panel')
  }

  function renderMain() {
    switch (activeView) {
      case 'records':
        return <RecordsPanel />
      case 'station-overview':
        return <StationOverview onOpenStation={openStation} />
      case 'station-panel':
        return (
          <StationPanel
            stationId={selectedStationId}
            onSelectStation={setSelectedStationId}
          />
        )
      default:
        return <ReportPanel report={activeView} />
    }
  }

  return (
    <div className="app">
      <Header user={user} onSignOut={() => setUser(null)} />
      <div className="layout">
        <Sidebar active={activeView} onSelect={setActiveView} />
        <main className="main">{renderMain()}</main>
      </div>
    </div>
  )
}

export default App
