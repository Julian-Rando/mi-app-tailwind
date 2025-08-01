import { useState } from 'react';
import { supabase } from './supabase';

export function EditarIntegrante() {
  const [dni, setDni] = useState('');
  const [form, setForm] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const buscar = async () => {
    setMensaje('');
    const { data, error } = await supabase
      .from('integrantes')
      .select()
      .eq('dni', dni)
      .single();

    if (error || !data) {
      setMensaje('❌ Integrante no encontrado.');
      setForm(null);
    } else {
      setForm(data);
    }
  };

  const handleChange = (e) => {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value
    }));
  };

  const actualizar = async () => {
    setMensaje('');
    const { error } = await supabase
      .from('integrantes')
      .update({
        nombre: form.nombre,
        apellido: form.apellido,
        fecha_nacimiento: form.fecha_nacimiento,
        contacto_emergencia: form.contacto_emergencia
      })
      .eq('dni', dni);

    if (error) {
      setMensaje('❌ Error al actualizar integrante.');
    } else {
      setMensaje('✅ Integrante actualizado correctamente.');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">✏️ Editar Integrante</h2>

      <div className="flex gap-2">
        <input
          placeholder="DNI a buscar"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600 flex-1"
        />
        <button
          onClick={buscar}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>

      {form && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            placeholder="Apellido"
            className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            name="fecha_nacimiento"
            type="date"
            value={form.fecha_nacimiento}
            onChange={handleChange}
            className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            name="contacto_emergencia"
            value={form.contacto_emergencia}
            onChange={handleChange}
            placeholder="Contacto de emergencia"
            className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
          />
          <button
            onClick={actualizar}
            className="sm:col-span-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Guardar cambios
          </button>
        </div>
      )}

      {mensaje && (
        <p className="text-sm mt-2 text-yellow-400 dark:text-yellow-300">{mensaje}</p>
      )}
    </div>
  );
}
