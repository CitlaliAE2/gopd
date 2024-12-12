import React from 'react';
import { Link } from 'react-router-dom'; // Importar Link para redirección

const Sidebar = () => {
  return (
    <div className="w-64 bg-purple-200 p-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Menú</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/dashboard/registro-trabajadores" className="text-gray-700 hover:text-purple-600 transition-all">Registro de Trabajadores</Link>
        </li>
        <li>
          <Link to="/dashboard/ver-trabajadores" className="text-gray-700 hover:text-purple-600 transition-all">Ver Trabajadores</Link>
        </li>
        <li>

        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
