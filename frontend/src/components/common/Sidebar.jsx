import { LayoutDashboard, Sprout, BarChart3, Users, Settings, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAlert } from '../../hooks/useAlert';
import logo from '../../assets/logo.png';
import '../Sidebar.css';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { showSuccess } = useAlert();

  // Obtener ruta actual
  const getPath = (route) => {
    return location.pathname === route ? 'active' : '';
  };

  const handleLogout = () => {
    logout();
    showSuccess('Sesión cerrada correctamente');
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/cultivos', label: 'Cultivos', icon: <Sprout size={20} /> },
    { path: '/reportes', label: 'Reportes', icon: <BarChart3 size={20} /> },
    { path: '/usuarios', label: 'Usuarios', icon: <Users size={20} /> },
    { path: '/ajustes', label: 'Ajustes', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <img src={logo} alt="Xihuitl" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
          <h1>Xihuitl</h1>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${getPath(item.path)}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">
            <span>{user?.name?.[0] || 'U'}</span>
          </div>
          <div className="user-info">
            <span className="user-name">{user?.name || 'Usuario'}</span>
            <span className="user-role">Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="user-logout-icon"
            title="Cerrar sesión"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
