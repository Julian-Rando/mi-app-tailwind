import { useState } from 'react';
import { supabase } from './supabase';

export function BuscarIntegrante() {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [buscado, setBuscado] = useState(false);

  async function buscarIntegrante() {
    if (busqueda.trim().length < 3) {
      setResultados([]);
      setBuscado(true);
      return;
    }

    setCargando(true);
    setBuscado(true);

    const { data, error } = await supabase
      .from('integrantes')
      .select('*')
      .or(`nombre.ilike.%${busqueda}%,apellido.ilike.%${busqueda}%`);

    if (error) {
      console.error('Error al buscar:', error.message);
      setResultados([]);
    } else {
      setResultados(data);
    }

    setCargando(false);
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">🔍 Buscar Integrante</h2>

      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          placeholder="Nombre o apellido (mín. 3 letras)"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
        />
        <button
          onClick={buscarIntegrante}
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>

      {cargando && <p className="text-gray-400">⏳ Buscando...</p>}

      {!cargando && buscado && resultados.length === 0 && (
        <p className="text-red-400">❌ No se encontraron resultados.</p>
      )}

      {resultados.length > 0 && (
        <div className="space-y-6">
          {resultados.map((i) => (
            <div
              key={i.id}
              className="bg-gray-800 p-5 rounded shadow border border-gray-700"
            >
              <h3 className="text-xl font-bold mb-2 text-teal-300">
                {i.nombre} {i.apellido}
              </h3>
              <ul className="text-gray-200 space-y-1">
                <li><strong>🎂 Fecha de nacimiento:</strong> {i.fecha_nacimiento}</li>
                {i.telefono && <li><strong>📞 Teléfono:</strong> {i.telefono}</li>}
                {i.email && <li><strong>📧 Email:</strong> {i.email}</li>}
                <li><strong>🚨 Contacto de emergencia:</strong> {i.contacto_emergencia}</li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
