import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import DashboardHome from './pages/dashboard/DashboardHome';
import NewProject from './pages/dashboard/NewProject';
import Mantenimiento from './pages/dashboard/Mantenimiento';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Ruta principal redirige a login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Dashboard Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardHome />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/nuevo-proyecto" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <NewProject />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/:projectSlug/mantenimiento" 
            element={
              <ProtectedRoute>
                <Mantenimiento />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/project/:id" 
            element={
              <ProtectedRoute>
                <DashboardHome />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
