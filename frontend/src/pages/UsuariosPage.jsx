import { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './UsuariosPage.css';

export default function UsuariosPage({ onNavigate, currentPage }) {
  const [activeTab, setActiveTab] = useState('alumnos');

  const alumnos = [
    {
      id: 1,
      nombre: 'Elizabeth Lopez',
      usuario: 'elizabethlopez',
      email: 'elopez@yahoo.com',
      role: 'Alumno',
    },
    {
      id: 2,
      nombre: 'Matthew Martinez',
      usuario: 'mmartinez1997',
      email: 'mmartinez1997@gmail.com',
      role: 'Alumno',
    },
    {
      id: 3,
      nombre: 'Elizabeth Hall',
      usuario: 'elizabeth_hall.1998',
      email: 'elizabeth_hall.1998@gmail.com',
      role: 'Alumno',
    },
    {
      id: 4,
      nombre: 'Elizabeth Allen',
      usuario: 'eallen1998',
      email: 'eallen@gmail.com',
      role: 'Alumno',
    },
    {
      id: 5,
      nombre: 'Caleb Jones',
      usuario: 'calebjones',
      email: 'calebjones@gmail.com',
      role: 'Alumno',
    },
  ];

  const admins = [
    {
      id: 1,
      nombre: 'Elizabeth Lopez',
      usuario: 'elizabethlopez',
      email: 'elopez@yahoo.com',
      role: 'Admin',
    },
    {
      id: 2,
      nombre: 'Maria White',
      usuario: 'maria_white',
      email: 'maria_white@hotmail.com',
      role: 'Admin',
    },
    {
      id: 3,
      nombre: 'Elizabeth Watson',
      usuario: 'ewatson',
      email: 'ewatson@yahoo.com',
      role: 'Admin',
    },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar onNavigate={onNavigate} currentPage={currentPage} />
      <div className="dashboard-main">
        <Header onAddCultivo={() => { }} />
        <div className="usuarios-content">
          <div className="usuarios-tabs">
            <button
              className={`tab-btn ${activeTab === 'alumnos' ? 'active' : ''}`}
              onClick={() => setActiveTab('alumnos')}
            >
              Alumnos
            </button>
            <button
              className={`tab-btn ${activeTab === 'admins' ? 'active' : ''}`}
              onClick={() => setActiveTab('admins')}
            >
              Admins
            </button>
          </div>

          <div className="usuarios-table-container">
            <table className="usuarios-tabla">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Nombre de usuario</th>
                  <th>EMAIL</th>
                  <th>ROLE</th>
                  <th>Edit</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {(activeTab === 'alumnos' ? alumnos : admins).map((usuario) => (
                  <tr key={usuario.id}>
                    <td className="nombre-cell">{usuario.nombre}</td>
                    <td>{usuario.usuario}</td>
                    <td>{usuario.email}</td>
                    <td>
                      <span className="role-badge">{usuario.role}</span>
                    </td>
                    <td>
                      <button className="btn-action btn-edit"><Edit2 size={16} /></button>
                    </td>
                    <td>
                      <button className="btn-action btn-delete"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <span>• • •</span>
          </div>
        </div>
      </div>
    </div>
  );
}
