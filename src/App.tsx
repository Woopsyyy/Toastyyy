import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './providers/AuthProvider';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Home from './pages/Home';
import Docs from './pages/Docs';
import Components from './pages/Components';
import Playground from './pages/Playground';
import Templates from './pages/Templates';
import Blog from './pages/Blog';
import Changelog from './pages/Changelog';
import Themes from './pages/Themes';
import Showcase from './pages/Showcase';
import Community from './pages/Community';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';

import DashboardComponents from './pages/DashboardComponents';
import DashboardSettings from './pages/DashboardSettings';
import PendingRequests from './pages/PendingRequests';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#FF6B35] border-t-transparent animate-spin" />
    </div>
  );
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/components" element={<Components />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/changelog" element={<Changelog />} />
        <Route path="/themes" element={<Themes />} />
        <Route path="/showcase" element={<Showcase />} />
        <Route path="/community" element={<Community />} />
      </Route>

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected dashboard */}
      <Route path="/dashboard/*" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="pending" element={<PendingRequests />} />
        <Route path="components" element={<DashboardComponents />} />
        <Route path="settings" element={<DashboardSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
