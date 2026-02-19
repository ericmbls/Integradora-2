import { Search, Plus } from 'lucide-react';
import { useState } from 'react';
import '../Header.css';

export default function Header({ onAddCultivo, title = 'Dashboard' }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h2 className="header-title">{title}</h2>
      </div>
      <div className="header-search">
        <input
          type="text"
          placeholder="Buscar contenido"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="search-icon"><Search size={18} /></span>
      </div>
      <button className="btn-add-cultivo" onClick={onAddCultivo}>
        <span><Plus size={18} /></span>
        Añadir cultivo
      </button>
    </header>
  );
}
