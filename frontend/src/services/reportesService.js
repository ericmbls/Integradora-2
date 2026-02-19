// Servicio para reportes
// TODO: Conectar con API real cuando esté disponible

export const reportesService = {
  mockDatos: {
    cosechas: [
      { zona_id: 1, cultivo: 'Tomate', exitosas: 45, fallidas: 5 },
      { zona_id: 2, cultivo: 'Lechuga', exitosas: 60, fallidas: 2 },
      { zona_id: 3, cultivo: 'Pimientos', exitosas: 30, fallidas: 8 },
      { zona_id: 4, cultivo: 'Fresa', exitosas: 85, fallidas: 3 },
    ],
    cultivosPorZona: [
      { zona: 'Zona A', cantidad: 4 },
      { zona: 'Zona B', cantidad: 6 },
      { zona: 'Zona C', cantidad: 3 },
      { zona: 'Zona D', cantidad: 5 },
    ],
  },

  async getDatosReportes(filtros = {}) {
    // API CALL: GET /api/reportes?fecha_inicio=..&fecha_fin=..&zona_id=..
    // Simulamos filtrado básico
    return this.mockDatos;
  },

  async exportarPDF(data) {
    // API CALL: POST /api/reportes/export-pdf
    // Aquí se llamaría al backend para generar PDF
    console.log('Exportando PDF con datos:', data);
    return { exito: true, archivo: 'reporte.pdf' };
  },
};
