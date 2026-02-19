import { useState } from 'react';
import './HeatmapZones.css';

export function HeatmapZones({ zonas = [], onZonaClick, editable = false }) {
  const [selectedZona, setSelectedZona] = useState(null);

  const getColorClass = (estado) => {
    switch (estado) {
      case 'optimo':
        return 'bg-green-500';
      case 'requiere_atencion':
        return 'bg-yellow-500';
      case 'critico':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getEstadoTexto = (estado) => {
    const estados = {
      optimo: 'Óptimo',
      requiere_atencion: 'Requiere atención',
      critico: 'Crítico',
    };
    return estados[estado] || 'Sin datos';
  };

  return (
    <div className="heatmap-container">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Mapa de Zonas</h3>
      
      <div className="heatmap-grid">
        {zonas.map((zona) => (
          <button
            key={zona.id}
            onClick={() => {
              setSelectedZona(zona);
              onZonaClick?.(zona);
            }}
            className={`heatmap-zona ${getColorClass(zona.estado)} ${
              selectedZona?.id === zona.id ? 'ring-4 ring-offset-2 ring-blue-500' : ''
            } ${editable ? 'cursor-pointer hover:scale-105' : 'cursor-default'} transition-transform`}
          >
            <div className="text-white font-bold text-sm">{zona.nombre_zona}</div>
            <div className="text-white text-xs opacity-90">{getEstadoTexto(zona.estado)}</div>
          </button>
        ))}
      </div>

      {selectedZona && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-gray-800 mb-2">Detalles de {selectedZona.nombre_zona}</h4>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Descripción:</strong> {selectedZona.descripcion}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Estado:</strong> <span className={getColorClass(selectedZona.estado) + ' text-white px-2 py-1 rounded text-xs inline-block'}>{getEstadoTexto(selectedZona.estado)}</span>
          </p>
        </div>
      )}
    </div>
  );
}
