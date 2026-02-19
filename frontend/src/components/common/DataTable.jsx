import { Trash2, Edit3 } from 'lucide-react';
import './DataTable.css';

export function DataTable({ columns, data, onEdit, onDelete, loading = false }) {
  if (loading) {
    return <div className="p-8 text-center text-gray-500">Cargando datos...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="p-8 text-center text-gray-500">No hay datos disponibles</div>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700"
              >
                {col.label}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, idx) => (
            <tr key={row.id || idx} className="hover:bg-gray-50 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 text-sm text-gray-700">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              <td className="px-6 py-4 text-sm flex gap-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(row)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit3 size={18} />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(row.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
