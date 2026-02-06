import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import MetricCard from '../components/MetricCard';
import SurcoCard from '../components/SurcoCard';
import CultivoCard from '../components/CultivoCard';
import AddCultivoModal from '../components/AddCultivoModal';
import './DashboardPage.css';

export default function DashboardPage({ onNavigate, currentPage }) {
  const [showAddModal, setShowAddModal] = useState(false);
  // Datos mock para métricas
  const metrics = [
    {
      icon: '💧',
      title: 'Humedad',
      subtitle: 'Nivel óptimo de humedad',
      value: null,
    },
    {
      icon: '🔄',
      title: 'Nivel óptimo de humedad',
      subtitle: '',
      value: null,
    },
    {
      icon: '☁️',
      title: 'Clima',
      subtitle: '',
      value: '12',
      unit: '°C | °F',
    },
    {
      icon: '🌡️',
      title: 'Temperatura Interior',
      subtitle: '',
      value: '27',
      unit: '°C | °F',
    },
  ];

  // Datos mock para surcos
  const surcos = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=200&fit=crop',
      name: 'Surco A',
      selectedOption: 'Salud de suelo Óptima',
      cultivarId: '12',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=400&h=200&fit=crop',
      name: 'Surco B',
      selectedOption: 'Salud de suelo Óptima',
      cultivarId: '20',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=200&fit=crop',
      name: 'Surco C',
      selectedOption: 'Salud de suelo Óptima',
      cultivarId: '15',
    },
  ];

  // Datos mock para cultivos importantes
  const cultivos = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=200&fit=crop',
      name: 'Betabel',
      surco: 'Surco A',
      source: 'Fuente A',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b11?w=300&h=200&fit=crop',
      name: 'Zanahoria',
      surco: 'Surco A',
      source: 'Fuente A',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=300&h=200&fit=crop',
      name: 'Tomate',
      surco: 'Surco B',
      source: 'Fuente B',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1464922713794-2ad667be5744?w=300&h=200&fit=crop',
      name: 'Tomatillo verde',
      surco: 'Surco C',
      source: 'Fuente C',
    },
  ];

  return (
    <>
      <div className="dashboard-layout">
        <Sidebar onNavigate={onNavigate} currentPage={currentPage} />
        <div className="dashboard-main">
          <Header onAddCultivo={() => setShowAddModal(true)} />
          <div className="dashboard-content">
          {/* Sección de Métricas */}
          <section className="metrics-section">
            <div className="metrics-grid">
              {metrics.map((metric, index) => (
                <MetricCard
                  key={index}
                  icon={metric.icon}
                  title={metric.title}
                  subtitle={metric.subtitle}
                  value={metric.value}
                  unit={metric.unit}
                />
              ))}
            </div>
          </section>

          {/* Sección de Surcos */}
          <section className="surcos-section">
            <h2>Surcos</h2>
            <div className="surcos-grid">
              {surcos.map((surco) => (
                <SurcoCard
                  key={surco.id}
                  image={surco.image}
                  name={surco.name}
                  selectedOption={surco.selectedOption}
                  cultivarId={surco.cultivarId}
                />
              ))}
            </div>
          </section>

          {/* Sección de Cultivos Importantes */}
          <section className="cultivos-section">
            <h2>Cultivos importantes</h2>
            <div className="cultivos-grid">
              {cultivos.map((cultivo) => (
                <CultivoCard
                  key={cultivo.id}
                  image={cultivo.image}
                  name={cultivo.name}
                  surco={cultivo.surco}
                  source={cultivo.source}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>

    <AddCultivoModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </>
  );
}
