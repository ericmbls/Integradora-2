import './BrandingSide.css';

export default function BrandingSide() {
  return (
    <div className="branding-side">
      <div className="branding-content">
        <div className="flower-logo">
          {/* SVG del logo de flor */}
          <svg viewBox="0 0 200 200" className="flower-svg">
            <circle cx="100" cy="100" r="15" fill="#8B7B6F"/>
            {/* Pétalos */}
            {[...Array(8)].map((_, i) => (
              <g key={i}>
                <ellipse
                  cx="100"
                  cy="60"
                  rx="12"
                  ry="25"
                  fill="#C9B8AD"
                  opacity="0.8"
                  transform={`rotate(${i * 45} 100 100)`}
                />
              </g>
            ))}
          </svg>
        </div>
        
        <h1 className="brand-name">Xihuitl</h1>
        
        <button className="register-btn">Registrarse</button>
      </div>
    </div>
  );
}
