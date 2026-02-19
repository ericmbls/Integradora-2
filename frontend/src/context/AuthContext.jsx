import { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Conectar con API real
      // const response = await authService.login(email, password);
      // setUser(response.user);
      // sessionStorage.setItem('token', response.token);
      
      // Mock para desarrollo
      setUser({ email, name: 'Usuario Prueba' });
      setIsLoggedIn(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem('token');
  }, []);

  const value = {
    user,
    isLoggedIn,
    loading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
