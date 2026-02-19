// Servicio para usuarios y roles
// TODO: Conectar con API real cuando esté disponible

export const usuariosService = {
  mockUsuarios: [
    {
      id: 1,
      nombre_usuario: 'Admin User',
      email: 'admin@xihuitl.com',
      rol_usuario: 'admin',
      fecha_registro: '2025-11-15',
      activo: true,
    },
    {
      id: 2,
      nombre_usuario: 'Operador 1',
      email: 'operador1@xihuitl.com',
      rol_usuario: 'operador',
      fecha_registro: '2025-12-01',
      activo: true,
    },
    {
      id: 3,
      nombre_usuario: 'Operador 2',
      email: 'operador2@xihuitl.com',
      rol_usuario: 'operador',
      fecha_registro: '2026-01-10',
      activo: true,
    },
  ],

  async getUsuarios() {
    // API CALL: GET /api/usuarios
    return this.mockUsuarios;
  },

  async actualizarUsuario(id, data) {
    // API CALL: PUT /api/usuarios/:id
    const usuario = this.mockUsuarios.find(u => u.id === id);
    if (usuario) {
      Object.assign(usuario, data);
    }
    return usuario;
  },

  async eliminarUsuario(id) {
    // API CALL: DELETE /api/usuarios/:id
    this.mockUsuarios = this.mockUsuarios.filter(u => u.id !== id);
  },

  async crearUsuario(data) {
    // API CALL: POST /api/usuarios
    const newId = Math.max(...this.mockUsuarios.map(u => u.id), 0) + 1;
    const nuevoUsuario = { 
      id: newId, 
      fecha_registro: new Date().toISOString().split('T')[0],
      activo: true,
      ...data 
    };
    this.mockUsuarios.push(nuevoUsuario);
    return nuevoUsuario;
  },
};
