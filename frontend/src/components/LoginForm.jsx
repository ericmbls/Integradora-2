import { useState } from 'react';
import './LoginForm.css';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de login con el backend
    onLogin();
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h1 className="form-title">Iniciar sesión</h1>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="ejemplo@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          placeholder="Ingrese al menos 8 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="form-options">
        <label className="remember-me">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span>Remember me</span>
        </label>
        <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
      </div>

      <button type="submit" className="login-button">
        Iniciar sesión
      </button>

      <div className="divider">
        <span>O inicia sesión con</span>
      </div>

      <div className="social-buttons">
        <button type="button" className="social-btn google" title="Google">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 c0-3.331,2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C6.438,2,1.514,6.926,1.514,13c0,6.074,4.924,11,11.031,11c5.148,0,9.604-3.899,10.803-9.032h-10.803V10.239z"/>
          </svg>
        </button>
        <button type="button" className="social-btn facebook" title="Facebook">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </button>
        <button type="button" className="social-btn google" title="Google">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 c0-3.331,2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C6.438,2,1.514,6.926,1.514,13c0,6.074,4.924,11,11.031,11c5.148,0,9.604-3.899,10.803-9.032h-10.803V10.239z"/>
          </svg>
        </button>
      </div>

      <p className="signup-prompt">
        O inicia sesión con
        <a href="/register" className="signup-link">Registrarse</a>
      </p>
    </form>
  );
}
