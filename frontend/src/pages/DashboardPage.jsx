import { useState, useEffect } from 'react';
import {
  Sprout, AlertCircle, ListTodo, Activity,
  Droplets, Thermometer, Wind, CloudSun, CloudRain, Sun
} from 'lucide-react';
import Header from '../components/common/Header';
import { HeatmapZones } from '../components/common/HeatmapZones';
import { CultivoFormModal } from '../components/modals/CultivoFormModal';
import { cultivosService } from '../services/cultivosService';
import './DashboardPage.css';

export default function DashboardPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [cultivos, setCultivos] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API CALL: Fetch cultivos y zonas desde backend
    const cargarDatos = async () => {
      setLoading(true);
      try {
        const cultivosFetch = await cultivosService.getCultivos();
        const zonasFetch = await cultivosService.getZonas();
        setCultivos(cultivosFetch);
        setZonas(zonasFetch);
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  // Calcular KPIs basados en datos
  const totalCultivos = cultivos.length;
  const alertasActivas = cultivos.filter(c => c.estado === 'requiere_atencion' || c.estado === 'critico').length;
  const tareasPendientes = cultivos.filter(c => 
    !c.ultimo_riego || new Date(c.ultimo_riego) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;

  const kpis = [
    { 
      title: 'Total de cultivos', 
      value: totalCultivos, 
      sub: 'Cultivos activos', 
      icon: <Sprout size={20} />, 
      status: 'neutral' 
    },
    { 
      title: 'Alertas Activas', 
      value: alertasActivas, 
      sub: 'Requieren atención', 
      icon: <AlertCircle size={20} />, 
      status: alertasActivas > 0 ? 'danger' : 'success' 
    },
    { 
      title: 'Tareas Pendientes', 
      value: tareasPendientes, 
      sub: 'Riegos y cuidados', 
      icon: <ListTodo size={20} />, 
      status: tareasPendientes > 3 ? 'warning' : 'success' 
    },
    { 
      title: 'Salud Promedio', 
      value: '94%', 
      sub: 'Estado general', 
      icon: <Activity size={20} />, 
      status: 'success' 
    },
  ];

  const pronostico = [
    { day: 'Lun', icon: <Sun size={18} color="#F59E0B" />, temp: '24°' },
    { day: 'Mar', icon: <CloudSun size={18} color="#78716c" />, temp: '22°' },
    { day: 'Mié', icon: <CloudRain size={18} color="#78716c" />, temp: '20°' },
    { day: 'Jue', icon: <Sun size={18} color="#F59E0B" />, temp: '23°' },
    { day: 'Vie', icon: <Sun size={18} color="#F59E0B" />, temp: '25°' },
  ];

  return (
    <>
      <Header onAddCultivo={() => setShowAddModal(true)} title="Dashboard" />

      <div className="dashboard-content">
        {/* 1. KPIs */}
        <section className="kpi-grid">
          {kpis.map((kpi, idx) => (
            <div key={idx} className={`kpi-card ${kpi.status}`}>
              <div className="kpi-header">
                <span>{kpi.title}</span>
                <div className="kpi-icon">{kpi.icon}</div>
              </div>
              <div className="kpi-value">{kpi.value}</div>
              <div className={`kpi-sub ${kpi.status}`}>{kpi.sub}</div>
            </div>
          ))}
        </section>

        {/* 2. Mapa de Zonas */}
        <section className="zones-grid-section">
          <HeatmapZones zonas={zonas} editable={false} />
        </section>

        {/* 3. Pronóstico */}
        <section className="forecast-card">
          <h3>Pronóstico de la Semana</h3>
          <div className="forecast-list">
            {pronostico.map((day, idx) => (
              <div key={idx} className="forecast-item">
                <span>{day.day}</span>
                <div className="forecast-icon">{day.icon}</div>
                <span className="forecast-temp">{day.temp}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Últimos Cultivos */}
        <section className="recent-cultivos">
          <h3>Cultivos Recientes</h3>
          <div className="cultivos-grid">
            {cultivos.slice(0, 3).map(cultivo => (
              <div key={cultivo.id} className="cultivo-item">
                <div className={`cultivo-status cultivo-status-${cultivo.estado}`}></div>
                <h4>{cultivo.nombre_cultivo}</h4>
                <p className="text-sm text-gray-600">{cultivo.variedad}</p>
                <p className="text-xs text-gray-500 mt-2">Zona: {cultivo.zona_id}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
      <CultivoFormModal 
        cultivo={null}
        zonas={zonas}
        onGuardar={async (datos) => {
          // API CALL: POST /api/cultivos
          await cultivosService.crearCultivo(datos);
          setShowAddModal(false);
          // Reload cultivos
        }}
        onCerrar={() => setShowAddModal(false)}
      />
    </>
  );
}
