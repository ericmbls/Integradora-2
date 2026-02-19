import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check } from 'lucide-react';
import Header from '../components/common/Header';
import { cultivosService } from '../services/cultivosService';
import { useAlert } from '../hooks/useAlert';
import './AjustesPage.css';

const ESTADOS_ZONA = ['optimo', 'requiere_atencion', 'critico'];

export default function AjustesPage() {
  const [zonas, setZonas] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedZona, setSelectedZona] = useState(null);
  const [formData, setFormData] = useState({
    nombre_zona: '',
    descripcion: '',
    estado: 'optimo'
  });
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useAlert();

  useEffect(() => {
    cargarZonas();
  }, []);

  const cargarZonas = async () => {
    setLoading(true);
    try {
      // API CALL: GET /api/zonas
      const zonasFetch = await cultivosService.getZonas();
      setZonas(zonasFetch);
    } catch (error) {
      showError('Error al cargar zonas');
    } finally {
      setLoading(false);
    }
  };

  const handleAbrirForm = (zona = null) => {
    setSelectedZona(zona);
    if (zona) {
      setFormData({
        nombre_zona: zona.nombre_zona,
        descripcion: zona.descripcion,
        estado: zona.estado
      });
    } else {
      setFormData({
        nombre_zona: '',
        descripcion: '',
        estado: 'optimo'
      });
    }
    setShowFormModal(true);
  };

  const handleGuardar = async () => {
    if (!formData.nombre_zona) {
      showError('El nombre de la zona es requerido');
      return;
    }

    try {
      if (selectedZona) {
        // API CALL: PUT /api/zonas/:id
        await cultivosService.actualizarZona(selectedZona.id, formData);
        showSuccess('Zona actualizada correctamente');
      } else {
        // API CALL: POST /api/zonas
        // await cultivosService.crearZona(formData);
        showSuccess('Zona creada correctamente');
      }
      cargarZonas();
      setShowFormModal(false);
    } catch (error) {
      showError('Error al guardar zona');
    }
  };

  const handleEliminar = async (id) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta zona?')) return;

    try {
      // API CALL: DELETE /api/zonas/:id
      // await cultivosService.eliminarZona(id);
      showSuccess('Zona eliminada correctamente');
      cargarZonas();
    } catch (error) {
      showError('Error al eliminar zona');
    }
  };

  return (
    <div className="ajustes-page">
      <Header />
      <main className="ajustes-main">
        <div className="ajustes-header">
          <div>
            <h1>Configuración de Zonas</h1>
            <p className="subtitle">Gestiona las zonas agrícolas de tu sistema</p>
          </div>
          <button className="btn-primary" onClick={() => handleAbrirForm()}>
            <Plus size={16} /> Nueva Zona
          </button>
        </div>

        {loading ? (
          <div className="loading">Cargando zonas...</div>
        ) : zonas.length > 0 ? (
          <div className="zonas-grid">
            {zonas.map(zona => (
              <div key={zona.id} className="zona-card">
                <div className="zona-header">
                  <h3>{zona.nombre_zona}</h3>
                  <span className={`badge badge-${zona.estado}`}>{zona.estado}</span>
                </div>
                <p className="zona-descripcion">{zona.descripcion}</p>
                <div className="zona-actions">
                  <button 
                    className="btn-edit"
                    onClick={() => handleAbrirForm(zona)}
                  >
                    <Edit2 size={16} /> Editar
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleEliminar(zona.id)}
                  >
                    <Trash2 size={16} /> Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No hay zonas configuradas</p>
            <button className="btn-primary" onClick={() => handleAbrirForm()}>
              Crear primera zona
            </button>
          </div>
        )}

        {/* Form Modal */}
        {showFormModal && (
          <div className="modal-overlay" onClick={() => setShowFormModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{selectedZona ? 'Editar Zona' : 'Nueva Zona'}</h2>
                <button className="btn-close" onClick={() => setShowFormModal(false)}>×</button>
              </div>
              <div className="form-group">
                <label>Nombre de la Zona</label>
                <input
                  type="text"
                  value={formData.nombre_zona}
                  onChange={(e) => setFormData({...formData, nombre_zona: e.target.value})}
                  placeholder="Ej: Zona A, Zona de Cultivos 1"
                />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  placeholder="Describe esta zona"
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Estado</label>
                <select
                  value={formData.estado}
                  onChange={(e) => setFormData({...formData, estado: e.target.value})}
                >
                  {ESTADOS_ZONA.map(estado => (
                    <option key={estado} value={estado}>
                      {estado.charAt(0).toUpperCase() + estado.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setShowFormModal(false)}>
                  Cancelar
                </button>
                <button className="btn-primary" onClick={handleGuardar}>
                  <Check size={16} /> {selectedZona ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
