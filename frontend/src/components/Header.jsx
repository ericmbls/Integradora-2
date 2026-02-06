import './Header.css';

export default function Header({ onAddCultivo }) {
  return (
    <header className="dashboard-header">
      <div className="header-search">
        <input 
          type="text" 
          placeholder="Buscar contenido" 
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>
      <button className="btn-add-cultivo" onClick={onAddCultivo}>
        <span>+</span>
        Añadir cultivo
      </button>
    </header>
  );
}
