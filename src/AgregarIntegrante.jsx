import { useState } from 'react';
import { supabase } from './supabase';

export function AgregarIntegrante() {
  const [form, setForm] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    contacto_emergencia: ''
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value
    }));
  };

  const agregar = async () => {
    setMensaje('');

    if (!form.dni || !form.nombre || !form.apellido || !form.fecha_nacimiento) {
      setMensaje('⚠️ Todos los campos excepto "Contacto Emergencia" son obligatorios.');
      return;
    }

    const { error } = await supabase.from('integrantes').insert([form]);

    if (error) {
      console.error(error);
      setMensaje('❌ Error al agregar integrante.');
    } else {
      setMensaje('✅ Integrante agregado correctamente.');
      setForm({
        dni: '',
        nombre: '',
        apellido: '',
        fecha_nacimiento: '',
        contacto_emergencia: ''
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">➕ Agregar Integrante</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="dni"
          value={form.dni}
          onChange={handleChange}
          placeholder="DNI"
          className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
        />
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
          value={form.fecha_nacimiento}
          onChange={handleChange}
          placeholder="Fecha de nacimiento"
          type="date"
          className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          name="contacto_emergencia"
          value={form.contacto_emergencia}
          onChange={handleChange}
          placeholder="Contacto de emergencia (opcional)"
          className="p-2 rounded border dark:bg-gray-700 dark:border-gray-600 sm:col-span-2"
        />
      </div>

      <button
        onClick={agregar}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
      >
        Agregar
      </button>

      {mensaje && (
        <p className="text-sm mt-2 text-yellow-400 dark:text-yellow-300">{mensaje}</p>
      )}
    </div>
  );
}
