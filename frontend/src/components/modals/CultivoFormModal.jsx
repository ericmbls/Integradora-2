import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { cultivosService } from '../../services/cultivosService';
import './CultivoFormModal.css';

export function CultivoFormModal({ isOpen, onClose, cultivo = null, zonas = [], onSave }) {
  const [formData, setFormData] = useState({
    nombre_cultivo: '',
    variedad: '',
    fecha_siembra: '',
    zona_id: '',
    estado: 'saludable',
    notas: '',
  });

  useEffect(() => {
    if (cultivo) {
      setFormData(cultivo);
    } else {
      setFormData({
        nombre_cultivo: '',
        variedad: '',
        fecha_siembra: '',
        zona_id: '',
        estado: 'saludable',
        notas: '',
      });
    }
  }, [cultivo, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre_cultivo || !formData.zona_id || !formData.fecha_siembra) {
      alert('Por favor completa los campos requeridos');
      return;
    }
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content cultivo-form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="text-xl font-bold text-gray-800">
            {cultivo ? 'Editar Cultivo' : 'Agregar Nuevo Cultivo'}
          </h2>
          <button onClick={onClose} className="modal-close">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Nombre de la Planta *</label>
              <input
                type="text"
                name="nombre_cultivo"
                value={formData.nombre_cultivo}
                onChange={handleChange}
                placeholder="Ej: Tomate, Lechuga"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Variedad</label>
              <input
                type="text"
                name="variedad"
                value={formData.variedad}
                onChange={handleChange}
                placeholder="Ej: Roma, Iceberg"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Fecha de Siembra *</label>
              <input
                type="date"
                name="fecha_siembra"
                value={formData.fecha_siembra}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Zona Asignada *</label>
              <select
                name="zona_id"
                value={formData.zona_id}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Selecciona una zona</option>
                {zonas.map(zona => (
                  <option key={zona.id} value={zona.id}>
                    {zona.nombre_zona}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Estado</label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="form-input"
              >
                <option value="saludable">Saludable</option>
                <option value="requiere_atencion">Requiere atención</option>
                <option value="critico">Crítico</option>
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label className="form-label">Notas / Bitácora</label>
            <textarea
              name="notas"
              value={formData.notas}
              onChange={handleChange}
              placeholder="Escribe notas sobre este cultivo..."
              rows="4"
              className="form-input"
            />
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              {cultivo ? 'Actualizar' : 'Crear'} Cultivo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
