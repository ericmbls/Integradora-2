import { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import { DataTable } from '../components/common/DataTable';
import { CultivoFormModal } from '../components/modals/CultivoFormModal';
import { cultivosService } from '../services/cultivosService';
import { useAlert } from '../hooks/useAlert';
import './CultivosPage.css';

export default function CultivosPage() {
  const [showModal, setShowModal] = useState(false);
  const [cultivos, setCultivos] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [selectedCultivo, setSelectedCultivo] = useState(null);
  const [historialVisible, setHistorialVisible] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useAlert();

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      // API CALL: GET /api/cultivos
      const cultivosFetch = await cultivosService.getCultivos();
      const zonasFetch = await cultivosService.getZonas();
      setCultivos(cultivosFetch);
      setZonas(zonasFetch);
    } catch (error) {
      showError('Error al cargar cultivos');
    } finally {
      setLoading(false);
    }
  };

  const handleAbrirModal = (cultivo = null) => {
    setSelectedCultivo(cultivo);
    setShowModal(true);
  };

  const handleGuardar = async (datos) => {
    try {
      if (selectedCultivo) {
        // API CALL: PUT /api/cultivos/:id
        await cultivosService.actualizarCultivo(selectedCultivo.id, datos);
        showSuccess('Cultivo actualizado correctamente');
      } else {
        // API CALL: POST /api/cultivos
        await cultivosService.crearCultivo(datos);
        showSuccess('Cultivo creado correctamente');
      }
      cargarDatos();
      setShowModal(false);
    } catch (error) {
      showError('Error al guardar cultivo');
    }
  };

  const handleEliminar = async (id) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este cultivo?')) return;
    
    try {
      // API CALL: DELETE /api/cultivos/:id
      await cultivosService.eliminarCultivo(id);
      showSuccess('Cultivo eliminado correctamente');
      cargarDatos();
    } catch (error) {
      showError('Error al eliminar cultivo');
    }
  };

  const handleVerHistorial = async (cultivo) => {
    try {
      // API CALL: GET /api/cultivos/:id/historial
      const hist = await cultivosService.getHistorialCultivo(cultivo.id);
      setHistorial(hist);
      setHistorialVisible(cultivo.id);
    } catch (error) {
      showError('Error al cargar historial');
    }
  };

  const columnas = [
    { key: 'nombre_cultivo', label: 'Cultivo' },
    { key: 'variedad', label: 'Variedad' },
    { key: 'fecha_siembra', label: 'Fecha Siembra' },
    { key: 'zona_id', label: 'Zona', render: (val) => `Zona ${val}` },
    { 
      key: 'estado', 
      label: 'Estado',
      render: (val) => {
        const estados = { saludable: 'Saludable', requiere_atencion: 'Requiere atención', critico: 'Crítico' };
        return <span className={`badge badge-${val}`}>{estados[val]}</span>;
      }
    },
  ];

  return (
    <div className="cultivos-page">
      <Header />
      <main className="cultivos-main">
        <div className="cultivos-header">
          <h1>Gestión de Cultivos</h1>
          <button 
            className="btn-primary"
            onClick={() => handleAbrirModal()}
          >
            + Nuevo Cultivo
          </button>
        </div>

        {/* Tabla de Cultivos */}
        <DataTable
          titulo="Cultivos Activos"
          columnas={columnas}
          datos={cultivos}
          cargando={loading}
          onEditar={handleAbrirModal}
          onEliminar={handleEliminar}
          acciones={(cultivo) => (
            <button 
              className="btn-secundario"
              onClick={() => handleVerHistorial(cultivo)}
            >
              Historial
            </button>
          )}
        />

        {/* Historial de Cultivo */}
        {historialVisible && (
          <section className="historial-section">
            <h2>Historial del Cultivo</h2>
            <table className="historial-table">
              <thead>
                <tr>
                  <th>Evento</th>
                  <th>Fecha</th>
                  <th>Notas</th>
                </tr>
              </thead>
              <tbody>
                {historial.map((evento, idx) => (
                  <tr key={idx}>
                    <td>{evento.evento}</td>
                    <td>{evento.fecha}</td>
                    <td>{evento.notas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* Modal de Formulario */}
        {showModal && (
          <CultivoFormModal
            cultivo={selectedCultivo}
            zonas={zonas}
            onGuardar={handleGuardar}
            onCerrar={() => {
              setShowModal(false);
              setSelectedCultivo(null);
            }}
          />
        )}
      </main>
    </div>
  );
}
