import { useState } from 'react';
import { Droplets, CloudRain, Sun, Thermometer } from 'lucide-react';
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
      icon: <Droplets size={24} color="#3B82F6" />,
      title: 'Humedad',
      subtitle: 'Nivel óptimo de humedad',
      value: null,
    },
    {
      icon: <CloudRain size={24} color="#60A5FA" />,
      title: 'Riego',
      subtitle: 'Estado del sistema de riego',
      value: null,
    },
    {
      icon: <Sun size={24} color="#F59E0B" />,
      title: 'Clima',
      subtitle: 'Condición actual',
      value: '12',
      unit: '°C',
    },
    {
      icon: <Thermometer size={24} color="#EF4444" />,
      title: 'Temperatura Interior',
      subtitle: '',
      value: '27',
      unit: '°C',
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
      image: 'https://images.unsplash.com/photo-1592928305817-4b89e6f2b3af?w=400&h=300&fit=crop',
      name: 'Betabel',
      surco: 'Surco A',
      source: 'Fuente A',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1524594154903-15f0b89a2d2c?w=400&h=300&fit=crop',
      name: 'Zanahoria',
      surco: 'Surco A',
      source: 'Fuente A',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=400&h=300&fit=crop',
      name: 'Tomate',
      surco: 'Surco B',
      source: 'Fuente B',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
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
