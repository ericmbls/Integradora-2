import { Upload, X } from 'lucide-react';
import './AddCultivoModal.css';

export default function AddCultivoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Añadir cultivo</h2>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="modal-body">
          <div className="upload-section">
            <div className="image-upload">
              <span><Upload size={32} /></span>
              <p>Subir imagen</p>
            </div>
          </div>

          <div className="form-group">
            <label>Nombre</label>
            <input type="text" placeholder="nombre del cultivo" />
          </div>

          <div className="form-group">
            <label>Ubicación</label>
            <select>
              <option>Seleccionar surco</option>
              <option>Surco A</option>
              <option>Surco B</option>
              <option>Surco C</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Fecha de siembrado</label>
              <input type="date" />
            </div>
            <div className="form-group">
              <label>Frecuencia de riego</label>
              <input type="text" placeholder="ej: 2-3 veces por semana" />
            </div>
          </div>

          <div className="form-group">
            <label>Cantidad de riego</label>
            <input type="text" placeholder="ej: 15 - 20 cm de suelo" />
          </div>

          <div className="form-group">
            <label>Cantidad de riego</label>
            <textarea placeholder="Describe el cultivo sembrado"></textarea>
          </div>

          <div className="modal-footer">
            <button className="btn-guardar" onClick={onClose}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
