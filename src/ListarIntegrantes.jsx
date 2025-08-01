// src/ListarIntegrantes.jsx
import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export function ListarIntegrantes() {
  const [integrantes, setIntegrantes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("integrantes").select("*");
      if (error) {
        console.error("Error al traer los datos:", error.message);
      } else {
        setIntegrantes(data);
      }
      setCargando(false);
    }
    fetchData();
  }, []);

  return (
    <div className="p-4 bg-gray-900 text-white rounded-xl shadow-lg max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Lista de Integrantes</h2>

      {cargando ? (
        <p className="text-center">Cargando...</p>
      ) : (
        <>
          <table className="w-full table-auto border border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-gray-200">
              <tr>
                <th className="py-2 px-4">Nombre</th>
                <th className="py-2 px-4">Apellido</th>
                <th className="py-2 px-4">Fecha de Nacimiento</th>
                <th className="py-2 px-4">Contacto</th>
              </tr>
            </thead>
            <tbody className="bg-gray-700">
              {integrantes.map((item) => (
                <tr key={item.id} className="hover:bg-gray-600 transition">
                  <td className="py-2 px-4">{item.nombre}</td>
                  <td className="py-2 px-4">{item.apellido}</td>
                  <td className="py-2 px-4">{item.fecha_nacimiento}</td>
                  <td className="py-2 px-4">{item.contacto}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-right mt-4 font-semibold">
            Total de integrantes: {integrantes.length}
          </p>
        </>
      )}
    </div>
  );
}
