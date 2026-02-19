import { useState, useEffect } from 'react';
import { BarChart3, PieChart, Download } from 'lucide-react';
import Header from '../components/common/Header';
import { reportesService } from '../services/reportesService';
import { cultivosService } from '../services/cultivosService';
import { useAlert } from '../hooks/useAlert';
import './ReportesPage.css';

export default function ReportesPage() {
  const [filtros, setFiltros] = useState({
    fecha_inicio: '',
    fecha_fin: '',
    zona_id: null,
  });
  
  const [datos, setDatos] = useState(null);
  const [zonas, setZonas] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useAlert();

  useEffect(() => {
    cargarZonas();
    cargarReportes();
  }, []);

  const cargarZonas = async () => {
    try {
      // API CALL: GET /api/zonas
      const zonasData = await cultivosService.getZonas();
      setZonas(zonasData);
    } catch (error) {
      showError('Error al cargar zonas');
    }
  };

  const cargarReportes = async () => {
    setLoading(true);
    try {
      // API CALL: GET /api/reportes?fecha_inicio=...&fecha_fin=...&zona_id=...
      const datosReportes = await reportesService.getDatosReportes(filtros);
      setDatos(datosReportes);
    } catch (error) {
      showError('Error al cargar reportes');
    } finally {
      setLoading(false);
    }
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value || null
    }));
  };

  const handleExportPDF = async () => {
    try {
      // API CALL: POST /api/reportes/export-pdf
      await reportesService.exportarPDF(datos);
      showSuccess('PDF exportado correctamente');
    } catch (error) {
      showError('Error al exportar PDF');
    }
  };

  return (
    <div className="reportes-page">
      <Header />
      <main className="reportes-main">
        <div className="reportes-header">
          <h1>Reportes y Análisis</h1>
          <button 
            className="btn-export"
            onClick={handleExportPDF}
            disabled={!datos}
          >
            <Download size={16} /> Exportar PDF
          </button>
        </div>

        {/* Filtros */}
        <section className="filtros-section">
          <div className="filtros-grid">
            <div className="filtro-item">
              <label>Fecha Inicio</label>
              <input 
                type="date" 
                name="fecha_inicio"
                value={filtros.fecha_inicio}
                onChange={handleFiltroChange}
              />
            </div>
            <div className="filtro-item">
              <label>Fecha Fin</label>
              <input 
                type="date"
                name="fecha_fin"
                value={filtros.fecha_fin}
                onChange={handleFiltroChange}
              />
            </div>
            <div className="filtro-item">
              <label>Zona</label>
              <select 
                name="zona_id"
                value={filtros.zona_id || ''}
                onChange={handleFiltroChange}
              >
                <option value="">Todas las zonas</option>
                {zonas.map(zona => (
                  <option key={zona.id} value={zona.id}>
                    {zona.nombre_zona}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn-buscar" onClick={cargarReportes}>
              Buscar
            </button>
          </div>
        </section>

        {loading ? (
          <div className="loading">Cargando reportes...</div>
        ) : datos ? (
          <>
            {/* Gráfico de Cultivos por Zona */}
            <section className="grafico-section">
              <div className="grafico-header">
                <h2><BarChart3 size={20} /> Cultivos por Zona</h2>
              </div>
              <div className="grafico-container">
                <div className="bar-chart">
                  {datos.cultivosPorZona?.map((item, idx) => (
                    <div key={idx} className="bar-item">
                      <div className="bar-label">{item.zona}</div>
                      <div className="bar-wrapper">
                        <div 
                          className="bar-fill"
                          style={{ 
                            width: `${(item.cantidad / Math.max(...datos.cultivosPorZona.map(x => x.cantidad))) * 100}%`
                          }}
                        >
                          <span className="bar-value">{item.cantidad}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Gráfico de Cosechas */}
            <section className="grafico-section">
              <div className="grafico-header">
                <h2><PieChart size={20} /> Cosechas: Exitosas vs Fallidas</h2>
              </div>
              <div className="grafico-container">
                <div className="pie-chart">
                  {datos.cosechas && (
                    <>
                      <div className="pie-legend">
                        <div className="legend-item">
                          <div className="legend-color exitosas"></div>
                          <span>Exitosas: {datos.cosechas.exitosas}</span>
                        </div>
                        <div className="legend-item">
                          <div className="legend-color fallidas"></div>
                          <span>Fallidas: {datos.cosechas.fallidas}</span>
                        </div>
                      </div>
                      <div className="pie-visual">
                        <div className="pie-segment" 
                             style={{
                               background: `conic-gradient(#10b981 0deg ${(datos.cosechas.exitosas / (datos.cosechas.exitosas + datos.cosechas.fallidas)) * 360}deg, #ef4444 ${(datos.cosechas.exitosas / (datos.cosechas.exitosas + datos.cosechas.fallidas)) * 360}deg 360deg)`,
                               width: '200px',
                               height: '200px',
                               borderRadius: '50%'
                             }}>
                        </div>
                        <div className="pie-center">
                          <span className="pie-percentage">
                            {Math.round((datos.cosechas.exitosas / (datos.cosechas.exitosas + datos.cosechas.fallidas)) * 100)}%
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* Resumen */}
            <section className="resumen-section">
              <h2>Resumen General</h2>
              <div className="resumen-grid">
                <div className="resumen-card">
                  <div className="resumen-label">Total de Cultivos</div>
                  <div className="resumen-valor">{datos.cultivosPorZona?.reduce((sum, item) => sum + item.cantidad, 0) || 0}</div>
                </div>
                <div className="resumen-card">
                  <div className="resumen-label">Cosechas Exitosas</div>
                  <div className="resumen-valor exitosa">{datos.cosechas?.exitosas || 0}</div>
                </div>
                <div className="resumen-card">
                  <div className="resumen-label">Cosechas Fallidas</div>
                  <div className="resumen-valor fallida">{datos.cosechas?.fallidas || 0}</div>
                </div>
                <div className="resumen-card">
                  <div className="resumen-label">Tasa de Éxito</div>
                  <div className="resumen-valor">
                    {datos.cosechas? 
                      Math.round((datos.cosechas.exitosas / (datos.cosechas.exitosas + datos.cosechas.fallidas)) * 100) 
                      : 0}%
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : null}
      </main>
    </div>
  );
}
