import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import "./lib/i18n"
import DiscoveryPage from './pages/Discovery/Discovery'

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<div>mainPage</div>} />
                <Route path="/discovery" element={<DiscoveryPage />} />
            </Routes>
        </Suspense>
    )
}

export default App
