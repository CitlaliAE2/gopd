import React, { useState } from 'react';

const RegistroTrabajadores = () => {
  const [formData, setFormData] = useState({
    nombre_completo: '',
    rfc: '',
    curp: '',
    codigo_categoria: '',
    categoria: '',
    fecha_ingreso_hospital: '',
    fecha_ingreso_sindicato: '',
    tipo_empleado: 'base',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/gopd_backend/guardar_trabajador.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        alert('Registro exitoso');
        setFormData({
          nombre_completo: '',
          rfc: '',
          curp: '',
          codigo_categoria: '',
          categoria: '',
          fecha_ingreso_hospital: '',
          fecha_ingreso_sindicato: '',
          tipo_empleado: 'base',
        });
      } else {
        alert('Error al registrar: ' + result.message);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Error al registrar');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-8 rounded-lg shadow-lg max-w-4xl mx-auto transition-transform transform hover:scale-105 duration-500">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Solicitud de Registro</h2>

      <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
      <input 
        type="text" 
        name="nombre_completo" 
        value={formData.nombre_completo} 
        onChange={handleChange} 
        className="w-full p-4 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ease-in-out duration-300"
        required 
      />

      <label className="block text-sm font-medium text-gray-700">RFC</label>
      <input 
        type="text" 
        name="rfc" 
        value={formData.rfc} 
        onChange={handleChange} 
        className="w-full p-4 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ease-in-out duration-300"
        required 
      />

      <label className="block text-sm font-medium text-gray-700">CURP</label>
      <input 
        type="text" 
        name="curp" 
        value={formData.curp} 
        onChange={handleChange} 
        className="w-full p-4 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ease-in-out duration-300"
        required 
      />

      <label className="block text-sm font-medium text-gray-700">Código de Categoría</label>
      <input 
        type="text" 
        name="codigo_categoria" 
        value={formData.codigo_categoria} 
        onChange={handleChange} 
        className="w-full p-4 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ease-in-out duration-300"
        required 
      />

      <label className="block text-sm font-medium text-gray-700">Categoría</label>
      <input 
        type="text" 
        name="categoria" 
        value={formData.categoria} 
        onChange={handleChange} 
        className="w-full p-4 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ease-in-out duration-300"
        required 
      />

      <label className="block text-sm font-medium text-gray-700">Fecha de Ingreso al Hospital</label>
      <input 
        type="date" 
        name="fecha_ingreso_hospital" 
        value={formData.fecha_ingreso_hospital} 
        onChange={handleChange} 
        className="w-full p-4 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ease-in-out duration-300"
        required 
      />

      <label className="block text-sm font-medium text-gray-700">Fecha de Ingreso al Sindicato</label>
      <input 
        type="date" 
        name="fecha_ingreso_sindicato" 
        value={formData.fecha_ingreso_sindicato} 
        onChange={handleChange} 
        className="w-full p-4 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ease-in-out duration-300"
        required 
      />

      <label className="block text-sm font-medium text-gray-700">Tipo de Empleado</label>
      <select 
        name="tipo_empleado" 
        value={formData.tipo_empleado} 
        onChange={handleChange} 
        className="w-full p-4 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ease-in-out duration-300"
      >
        <option value="base">Base</option>
        <option value="formalizado">Formalizado</option>
        <option value="homologado">Homologado</option>
        <option value="contrato">Contrato</option>
        <option value="eventual">Eventual</option>
      </select>

      <button 
        type="submit" 
        className="w-full bg-pink-500 text-white py-4 rounded-md hover:bg-pink-600 transition-all font-medium mt-6"
      >
        Registrar
      </button>
    </form>
  );
};

export default RegistroTrabajadores;
