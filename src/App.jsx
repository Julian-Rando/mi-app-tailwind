import { useState } from 'react';
import { BuscarIntegrante } from './BuscarIntegrante';
import { AgregarIntegrante } from './AgregarIntegrante';
import { EditarIntegrante } from './EditarIntegrante';
import { EliminarIntegrante } from './EliminarIntegrante';
import { ListarIntegrantes } from './ListarIntegrantes';

const opciones = [
  { id: 'buscar', label: '🔍 Buscar' },
  { id: 'agregar', label: '➕ Agregar' },
  { id: 'editar', label: '✏️ Editar' },
  { id: 'eliminar', label: '🗑️ Eliminar' },
  { id: 'listar', label: '📋 Listar Todos' }, // ← nueva opción
];

export default function App() {
  const [vista, setVista] = useState('buscar');

  const renderVista = () => {
    switch (vista) {
      case 'buscar': return <BuscarIntegrante />;
      case 'agregar': return <AgregarIntegrante />;
      case 'editar': return <EditarIntegrante />;
      case 'eliminar': return <EliminarIntegrante />;
      case 'listar': return <ListarIntegrantes />; // ← nueva vista
      default: return <BuscarIntegrante />;
    }
  };

  return (
    <div className="min-h-screen flex dark bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4 space-y-4">
        <h1 className="text-2xl font-bold text-center text-teal-400">Compañeros</h1>
        {opciones.map((op) => (
          <button
            key={op.id}
            onClick={() => setVista(op.id)}
            className={`block w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${vista === op.id ? 'bg-gray-700' : ''}`}
          >
            {op.label}
          </button>
        ))}
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-8 overflow-y-auto">
        {renderVista()}
      </main>
    </div>
  );
}
