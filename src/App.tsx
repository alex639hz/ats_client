import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ReportPanel from './components/ReportPanel'
import { type ReportKey } from './data/reports'
import './App.css'

function App() {
  const [activeReport, setActiveReport] = useState<ReportKey>('overview')

  return (
    <div className="app">
      <Header />
      <div className="layout">
        <Sidebar active={activeReport} onSelect={setActiveReport} />
        <main className="main">
          <ReportPanel report={activeReport} />
        </main>
      </div>
    </div>
  )
}

export default App
