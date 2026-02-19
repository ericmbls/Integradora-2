import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Alert } from './components/Alert';
import { useAlert } from './hooks/useAlert';
import RootLayout from './layouts/RootLayout';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CultivosPage from './pages/CultivosPage';
import ReportesPage from './pages/ReportesPage';
import UsuariosPage from './pages/UsuariosPage';
import AjustesPage from './pages/AjustesPage';

function AppContent() {
  const { alert, dismiss } = useAlert();

  return (
    <>
      <Alert alert={alert} onDismiss={dismiss} />
      <Routes>
        {/* Ruta pública - Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas protegidas con layout */}
        <Route
          element={
            <ProtectedRoute>
              <RootLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/cultivos" element={<CultivosPage />} />
          <Route path="/reportes" element={<ReportesPage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/ajustes" element={<AjustesPage />} />
        </Route>

        {/* Redireccionar root a dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AlertProvider>
          <AppContent />
        </AlertProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
