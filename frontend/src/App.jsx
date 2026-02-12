import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CultivosPage from './pages/CultivosPage';
import ReportesPage from './pages/ReportesPage';
import UsuariosPage from './pages/UsuariosPage';
import AjustesPage from './pages/AjustesPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  if (!isLoggedIn) {
    return <LoginPage setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <>
      {currentPage === 'dashboard' && <DashboardPage onNavigate={handleNavigate} currentPage={currentPage} />}
      {currentPage === 'cultivos' && <CultivosPage onNavigate={handleNavigate} currentPage={currentPage} />}
      {currentPage === 'reportes' && <ReportesPage onNavigate={handleNavigate} currentPage={currentPage} />}
      {currentPage === 'usuarios' && <UsuariosPage onNavigate={handleNavigate} currentPage={currentPage} />}
      {currentPage === 'ajustes' && <AjustesPage onNavigate={handleNavigate} currentPage={currentPage} />}
    </>
  );
}

export default App;
