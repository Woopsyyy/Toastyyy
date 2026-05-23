import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ToastProvider } from './hooks/useToasts'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ChangelogPage from './pages/ChangelogPage'

export default function App() {
  return (
    <ToastProvider>
      <AnimatePresence mode="wait">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/examples" element={<HomePage />} />
            <Route path="/builder" element={<HomePage />} />
            <Route path="/docs" element={<HomePage />} />
            <Route path="/changelog" element={<ChangelogPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </ToastProvider>
  )
}


