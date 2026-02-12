import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { User, Mail, Shield, Bell, Lock, Save } from 'lucide-react';
import './AjustesPage.css';

export default function AjustesPage({ onNavigate, currentPage }) {
    const [formData, setFormData] = useState({
        nombre: 'Admin Principal',
        email: 'admin@xihuitl.com',
        rol: 'Administrador',
        notificaciones: true,
        temaOscuro: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Configuración guardada exitosamente');
    };

    return (
        <div className="dashboard-layout">
            <Sidebar onNavigate={onNavigate} currentPage={currentPage} />
            <div className="dashboard-main">
                <Header />
                <div className="dashboard-content">
                    <div className="ajustes-container">
                        <h1 className="page-title">Ajustes y Perfil</h1>

                        <div className="ajustes-grid">
                            {/* Perfil del Administrador */}
                            <div className="ajustes-card profile-card">
                                <div className="card-header">
                                    <User className="card-icon" />
                                    <h2>Perfil de Administrador</h2>
                                </div>
                                <div className="profile-header">
                                    <div className="avatar-large">
                                        <img src="https://ui-avatars.com/api/?name=Admin+Principal&background=0D8ABC&color=fff" alt="Admin Avatar" />
                                    </div>
                                    <div className="profile-info">
                                        <h3>{formData.nombre}</h3>
                                        <p className="role-badge"><Shield size={14} /> {formData.rol}</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="ajustes-form">
                                    <div className="form-group">
                                        <label><User size={16} /> Nombre Completo</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label><Mail size={16} /> Correo Electrónico</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label><Shield size={16} /> Rol</label>
                                        <input
                                            type="text"
                                            value={formData.rol}
                                            disabled
                                            className="input-disabled"
                                        />
                                    </div>

                                    <div className="form-actions">
                                        <button type="submit" className="btn-save">
                                            <Save size={16} /> Guardar Cambios
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Preferencias */}
                            <div className="ajustes-card preferences-card">
                                <div className="card-header">
                                    <SettingsIcon className="card-icon" />
                                    <h2>Preferencias del Sistema</h2>
                                </div>

                                <div className="preferences-list">
                                    <div className="preference-item">
                                        <div className="preference-info">
                                            <Bell size={20} />
                                            <div>
                                                <h4>Notificaciones</h4>
                                                <p>Recibir alertas de riego y clima</p>
                                            </div>
                                        </div>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                name="notificaciones"
                                                checked={formData.notificaciones}
                                                onChange={handleChange}
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>

                                    <div className="preference-item">
                                        <div className="preference-info">
                                            <Lock size={20} />
                                            <div>
                                                <h4>Seguridad</h4>
                                                <p>Autenticación de dos factores</p>
                                            </div>
                                        </div>
                                        <button className="btn-secondary">Configurar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SettingsIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}
