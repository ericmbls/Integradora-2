import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './ReportesPage.css';

export default function ReportesPage({ onNavigate, currentPage }) {
  const [filtroFecha, setFiltroFecha] = useState('2026-02-01');
  const [filtroCultivo, setFiltroCultivo] = useState('todos');

  const reportes = [
    {
      id: 1,
      fecha: '01/02/2026',
      surco: 'Surco A',
      cultivo: 'Betabel',
      duracion: '30 min',
      agua: '200 L',
      estado: 'Exacto',
    },
    {
      id: 2,
      fecha: '01/02/2026',
      surco: 'Surco B',
      cultivo: 'Tomate',
      duracion: '45 min',
      agua: '350 L',
      estado: 'Exceso',
    },
    {
      id: 3,
      fecha: '01/02/2026',
      surco: 'Surco C',
      cultivo: 'Tomatillo verde',
      duracion: '30 min',
      agua: '350 L',
      estado: 'Exceso',
    },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar onNavigate={onNavigate} currentPage={currentPage} />
      <div className="dashboard-main">
        <Header onAddCultivo={() => {}} />
        <div className="reportes-content">
          {/* Sección de Métricas */}
          <section className="metricas-section">
            <div className="metricas-grid">
              <div className="metrica-card">
                <div className="metrica-icon">💧</div>
                <div className="metrica-info">
                  <p>Agua consumida</p>
                  <h3>1,200 L</h3>
                </div>
              </div>
              <div className="metrica-card">
                <div className="metrica-icon">🔄</div>
                <div className="metrica-info">
                  <p>Riegos realizados</p>
                  <h3>16</h3>
                </div>
              </div>
              <div className="metrica-card">
                <div className="metrica-icon">🌱</div>
                <div className="metrica-info">
                  <p>Cultivos activos</p>
                  <h3>20</h3>
                </div>
              </div>
            </div>
          </section>

          {/* Sección de Filtros */}
          <section className="filtros-section">
            <h2>🔍 Filtros</h2>
            <div className="filtros-container">
              <div className="filtro-group">
                <input
                  type="date"
                  value={filtroFecha}
                  onChange={(e) => setFiltroFecha(e.target.value)}
                  className="filtro-fecha"
                />
              </div>
              <div className="filtro-group">
                <select
                  value={filtroCultivo}
                  onChange={(e) => setFiltroCultivo(e.target.value)}
                  className="filtro-select"
                >
                  <option value="todos">Todos los cultivos</option>
                  <option value="betabel">Betabel</option>
                  <option value="tomate">Tomate</option>
                  <option value="tomatillo">Tomatillo verde</option>
                </select>
              </div>
              <button className="btn-aplicar">Aplicar</button>
            </div>
          </section>

          {/* Sección de Reportes */}
          <section className="tabla-section">
            <h2>📊 Reportes de riego</h2>
            <div className="tabla-responsive">
              <table className="reportes-tabla">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Surco</th>
                    <th>Cultivo</th>
                    <th>Duración</th>
                    <th>Agua usada</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {reportes.map((reporte) => (
                    <tr key={reporte.id}>
                      <td>{reporte.fecha}</td>
                      <td>{reporte.surco}</td>
                      <td>{reporte.cultivo}</td>
                      <td>{reporte.duracion}</td>
                      <td>{reporte.agua}</td>
                      <td>
                        <span className={`estado-badge ${reporte.estado.toLowerCase()}`}>
                          {reporte.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
