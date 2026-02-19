import { useState, useEffect } from 'react';
import { Users, Shield, Plus, Trash2 } from 'lucide-react';
import Header from '../components/common/Header';
import { DataTable } from '../components/common/DataTable';
import { usuariosService } from '../services/usuariosService';
import { useAlert } from '../hooks/useAlert';
import './UsuariosPage.css';

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useAlert();

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    setLoading(true);
    try {
      // API CALL: GET /api/usuarios
      const usuariosFetch = await usuariosService.getUsuarios();
      setUsuarios(usuariosFetch);
    } catch (error) {
      showError('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) return;
    
    try {
      // API CALL: DELETE /api/usuarios/:id
      await usuariosService.eliminarUsuario(id);
      showSuccess('Usuario eliminado correctamente');
      cargarUsuarios();
    } catch (error) {
      showError('Error al eliminar usuario');
    }
  };

  const getTotalAdmins = () => usuarios.filter(u => u.rol_usuario === 'admin').length;
  const totalActivos = usuarios.filter(u => u.activo).length;

  const columnas = [
    { key: 'nombre_usuario', label: 'Nombre' },
    { key: 'email', label: 'Email' },
    { 
      key: 'rol_usuario', 
      label: 'Rol',
      render: (val) => {
        const roles = { admin: 'Administrador', operador: 'Operador', agronomo: 'Agrónomo' };
        return <span className={`badge badge-${val}`}>{roles[val]}</span>;
      }
    },
    { 
      key: 'activo', 
      label: 'Estado',
      render: (val) => <span className={`badge badge-${val ? 'activo' : 'inactivo'}`}>{val ? 'Activo' : 'Inactivo'}</span>
    },
  ];

  return (
    <div className="usuarios-page">
      <Header />
      <main className="usuarios-main">
        <div className="usuarios-header">
          <div>
            <h1>Gestión de Usuarios</h1>
            <p className="subtitle">Administra usuarios y sus roles</p>
          </div>
          <button className="btn-primary">
            <Plus size={16} /> Nuevo Usuario
          </button>
        </div>

        {/* KPIs */}
        <div className="kpis-grid">
          <div className="kpi-card">
            <div className="kpi-icon"><Users size={20} /></div>
            <div>
              <div className="kpi-label">Total de Usuarios</div>
              <div className="kpi-valor">{usuarios.length}</div>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon"><Users size={20} /></div>
            <div>
              <div className="kpi-label">Activos</div>
              <div className="kpi-valor">{totalActivos}</div>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon"><Shield size={20} /></div>
            <div>
              <div className="kpi-label">Administradores</div>
              <div className="kpi-valor">{getTotalAdmins()}</div>
            </div>
          </div>
        </div>

        {/* Tabla de Usuarios */}
        <DataTable
          titulo="Usuarios del Sistema"
          columnas={columnas}
          datos={usuarios}
          cargando={loading}
          acciones={(usuario) => 
            usuario.rol_usuario === 'admin' ? null : (
              <button 
                className="btn-delete"
                onClick={() => handleEliminar(usuario.id)}
              >
                <Trash2 size={16} /> Eliminar
              </button>
            )
          }
        />
      </main>
    </div>
  );
}
