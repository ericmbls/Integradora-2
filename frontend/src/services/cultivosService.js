// Servicio simulado para gestión de cultivos
// TODO: Conectar con API real cuando esté disponible

export const cultivosService = {
  // Simulamos cultivos de la BD
  mockCultivos: [
    {
      id: 1,
      nombre_cultivo: 'Tomate',
      variedad: 'Roma',
      fecha_siembra: '2026-01-15',
      zona_id: 1,
      estado: 'saludable',
      notas: 'Cultivo en desarrollo óptimo',
    },
    {
      id: 2,
      nombre_cultivo: 'Lechuga',
      variedad: 'Iceberg',
      fecha_siembra: '2026-01-20',
      zona_id: 2,
      estado: 'saludable',
      notas: 'Requiere riego frecuente',
    },
    {
      id: 3,
      nombre_cultivo: 'Pimientos',
      variedad: 'Morrón',
      fecha_siembra: '2025-12-10',
      zona_id: 3,
      estado: 'requiere_atencion',
      notas: 'Presenta plagas menores',
    },
  ],

  mockHistorial: [
    { id: 1, cultivo_id: 1, evento: 'Fertilización', fecha: '2026-02-10', notas: 'NPK 15-15-15' },
    { id: 2, cultivo_id: 1, evento: 'Riego', fecha: '2026-02-16', notas: 'Sistema de goteo' },
    { id: 3, cultivo_id: 2, evento: 'Poda', fecha: '2026-02-12', notas: 'Poda de mantenimiento' },
    { id: 4, cultivo_id: 3, evento: 'Tratamiento', fecha: '2026-02-08', notas: 'Insecticida orgánico' },
  ],

  mockZonas: [
    { id: 1, nombre_zona: 'Zona A', descripcion: 'Invernadero principal', estado: 'optimo' },
    { id: 2, nombre_zona: 'Zona B', descripcion: 'Campo abierto', estado: 'optimo' },
    { id: 3, nombre_zona: 'Zona C', descripcion: 'Hidropónico', estado: 'requiere_atencion' },
    { id: 4, nombre_zona: 'Zona D', descripcion: 'Vivero', estado: 'optimo' },
  ],

  // GET cultivos
  async getCultivos() {
    // API CALL: GET /api/cultivos
    return this.mockCultivos;
  },

  // GET historial por cultivo
  async getHistorialCultivo(cultivoId) {
    // API CALL: GET /api/cultivos/:id/historial
    return this.mockHistorial.filter(h => h.cultivo_id === cultivoId);
  },

  // POST crear cultivo
  async crearCultivo(data) {
    // API CALL: POST /api/cultivos
    const newId = Math.max(...this.mockCultivos.map(c => c.id), 0) + 1;
    const nuevoCultivo = { id: newId, ...data };
    this.mockCultivos.push(nuevoCultivo);
    return nuevoCultivo;
  },

  // PUT actualizar cultivo
  async actualizarCultivo(id, data) {
    // API CALL: PUT /api/cultivos/:id
    const index = this.mockCultivos.findIndex(c => c.id === id);
    if (index !== -1) {
      this.mockCultivos[index] = { ...this.mockCultivos[index], ...data };
    }
    return this.mockCultivos[index];
  },

  // DELETE cultivo
  async eliminarCultivo(id) {
    // API CALL: DELETE /api/cultivos/:id
    this.mockCultivos = this.mockCultivos.filter(c => c.id !== id);
  },

  // GET zonas
  async getZonas() {
    // API CALL: GET /api/zonas
    return this.mockZonas;
  },

  // PUT actualizar zona
  async actualizarZona(id, data) {
    // API CALL: PUT /api/zonas/:id
    const zona = this.mockZonas.find(z => z.id === id);
    if (zona) {
      Object.assign(zona, data);
    }
    return zona;
  },
};
