import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import RegistroTrabajadores from './RegistroTrabajadores';
import VerTrabajadores from './VerTrabajadores';

const Dashboard = () => {
  // Función para cerrar sesión
  const handleLogout = () => {
    // Eliminar cualquier dato relacionado con la sesión (ejemplo: token)
    localStorage.removeItem('authToken'); // Si usas localStorage
    // O si usas contexto o Redux, actualiza el estado para cerrar sesión

    // Mostrar mensaje de éxito
    alert("Sesión cerrada con éxito");

    // Redirigir al inicio usando window.location.href
    window.location.href = 'http://localhost:3000/';
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100">
      <Sidebar /> {/* Asegúrate de que Sidebar tenga el enlace adecuado */}
      <div className="flex-grow p-6">
        <Routes>
          <Route path="/" element={<Navigate to="registro-trabajadores" />} />
          <Route path="registro-trabajadores" element={<RegistroTrabajadores />} />
          <Route path="ver-trabajadores" element={<VerTrabajadores />} />
        </Routes>
      </div>
      {/* Botón de cerrar sesión */}
      <div className="absolute bottom-6 left-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-all"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
