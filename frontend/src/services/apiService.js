// Servicio base para todas las llamadas a API
// Maneja autenticación, errores y headers comunes

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const getHeaders = () => {
  const token = sessionStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const apiService = {
  async get(endpoint) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: getHeaders(),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error en la solicitud');
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async post(endpoint, body) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error en la solicitud');
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async put(endpoint, body) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error en la solicitud');
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async delete(endpoint) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error en la solicitud');
      }
      return { success: true };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
