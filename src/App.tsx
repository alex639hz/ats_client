import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ReportPanel from './components/ReportPanel'
import RecordsPanel from './components/RecordsPanel'
import { type View } from './data/reports'
import './App.css'

function App() {
  const [activeView, setActiveView] = useState<View>('overview')

  return (
    <div className="app">
      <Header />
      <div className="layout">
        <Sidebar active={activeView} onSelect={setActiveView} />
        <main className="main">
          {activeView === 'records' ? (
            <RecordsPanel />
          ) : (
            <ReportPanel report={activeView} />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
