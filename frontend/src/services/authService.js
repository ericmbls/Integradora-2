// Servicio de autenticación
// Conecta con el backend

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const authService = {
  async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al iniciar sesión');
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async register(email, password, name) {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al registrarse');
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  },
};
