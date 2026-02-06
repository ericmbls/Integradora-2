import { useState } from 'react';
import './Sidebar.css';

export default function Sidebar({ onNavigate, currentPage }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span>🌼</span>
          <h1>Xihuitl</h1>
        </div>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
          onClick={() => onNavigate('dashboard')}
        >
          <span className="nav-icon">📊</span>
          <span>Dashboard</span>
        </button>
        <button
          className={`nav-item ${currentPage === 'cultivos' ? 'active' : ''}`}
          onClick={() => onNavigate('cultivos')}
        >
          <span className="nav-icon">🌱</span>
          <span>Cultivos</span>
        </button>
        <button
          className={`nav-item ${currentPage === 'reportes' ? 'active' : ''}`}
          onClick={() => onNavigate('reportes')}
        >
          <span className="nav-icon">📈</span>
          <span>Reportes</span>
        </button>
        <button
          className={`nav-item ${currentPage === 'usuarios' ? 'active' : ''}`}
          onClick={() => onNavigate('usuarios')}
        >
          <span className="nav-icon">👥</span>
          <span>Usuarios</span>
        </button>
        <button
          className="nav-item"
          onClick={() => onNavigate('ajustes')}
        >
          <span className="nav-icon">⚙️</span>
          <span>Ajustes</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <img src="https://via.placeholder.com/40" alt="Usuario" />
          <span>Usuario1</span>
        </div>
      </div>
    </aside>
  );
}
