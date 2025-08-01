import { useState } from 'react';
import { supabase } from './supabase';

export function EliminarIntegrante() {
  const [dni, setDni] = useState('');
  const [mensaje, setMensaje] = useState('');

  const eliminar = async () => {
    setMensaje('');

    const confirmacion = window.confirm(`¿Estás seguro de eliminar al integrante con DNI ${dni}?`);
    if (!confirmacion) return;

    const { error } = await supabase
      .from('integrantes')
      .delete()
      .eq('dni', dni);

    if (error) {
      setMensaje('❌ Error al eliminar integrante.');
    } else {
      setMensaje('✅ Integrante eliminado correctamente.');
      setDni('');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-red-400">🗑️ Eliminar Integrante</h2>

      <div className="flex gap-2">
        <input
          placeholder="DNI del integrante"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600 flex-1"
        />
        <button
          onClick={eliminar}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Eliminar
        </button>
      </div>

      {mensaje && (
        <p className="text-sm mt-2 text-yellow-400 dark:text-yellow-300">{mensaje}</p>
      )}
    </div>
  );
}
