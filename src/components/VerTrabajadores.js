import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ExportarPDF from './ExportarPDF';

const VerTrabajadores = () => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [deletedTrabajadores, setDeletedTrabajadores] = useState(
    JSON.parse(localStorage.getItem('deletedTrabajadores')) || []
  );
  const [editingTrabajador, setEditingTrabajador] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    nombre_completo: '',
    rfc: '',
    curp: '',
    codigo_categoria: '',
    categoria: '',
    fecha_ingreso_hospital: '',
    fecha_ingreso_sindicato: '',
    tipo_empleado: 'base',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para cargar los trabajadores desde el backend
  const fetchTrabajadores = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost/gopd_backend/ver_trabajadores.php');
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      const result = await response.json();

      if (result.status === 'success' && Array.isArray(result.data)) {
        const filteredData = result.data.filter(
          (trabajador) => !deletedTrabajadores.includes(trabajador.id)
        );
        setTrabajadores(filteredData);
      } else {
        throw new Error(result.message || 'Datos recibidos no válidos');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para iniciar la edición
  const handleEdit = (trabajador) => {
    setEditingTrabajador(trabajador);
    setFormData({ ...trabajador }); // Copiar datos actuales al formulario
  };

  // Función para guardar los cambios localmente y en el backend
  const handleSave = async (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (!formData.nombre_completo || !formData.rfc || !formData.curp) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    try {
      // Enviar los datos al backend para actualizar
      const response = await fetch('http://localhost/gopd_backend/ver_trabajadores.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, action: 'update' }), // Incluir la acción 'update'
      });

      const result = await response.json();

      if (result.status === 'success') {
        // Actualizar los datos localmente
        setTrabajadores((prev) =>
          prev.map((trabajador) =>
            trabajador.id === formData.id ? { ...formData } : trabajador
          )
        );
        alert('Trabajador actualizado correctamente.');
        setEditingTrabajador(null);
      } else {
        throw new Error(result.message || 'Error al actualizar el trabajador');
      }
    } catch (error) {
      alert(`Error al guardar los cambios: ${error.message}`);
    }
  };

  // Función para cancelar la edición
  const handleCancel = () => {
    setEditingTrabajador(null);
    setFormData({
      id: '',
      nombre_completo: '',
      rfc: '',
      curp: '',
      codigo_categoria: '',
      categoria: '',
      fecha_ingreso_hospital: '',
      fecha_ingreso_sindicato: '',
      tipo_empleado: 'base',
    });
  };

  // Función para eliminar un trabajador localmente
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este trabajador?')) {
      const updatedDeletedTrabajadores = [...deletedTrabajadores, id];
      setDeletedTrabajadores(updatedDeletedTrabajadores);
      localStorage.setItem('deletedTrabajadores', JSON.stringify(updatedDeletedTrabajadores));
      setTrabajadores((prev) => prev.filter((trabajador) => trabajador.id !== id));
      alert('Trabajador eliminado localmente.');
    }
  };

  // Cargar trabajadores al montar el componente
  useEffect(() => {
    fetchTrabajadores();
  }, [deletedTrabajadores]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Lista de Trabajadores</h2>
      {loading ? (
        <p className="text-center">Cargando trabajadores...</p>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : (
        <div className="space-y-4">
          {trabajadores.map((trabajador) => (
            <div key={trabajador.id} className="p-4 border rounded">
              {editingTrabajador?.id === trabajador.id ? (
                <form onSubmit={handleSave} className="space-y-4">
                  {/* Campos del formulario de edición */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                    <input
                      type="text"
                      name="nombre_completo"
                      value={formData.nombre_completo}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">RFC</label>
                    <input
                      type="text"
                      name="rfc"
                      value={formData.rfc}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CURP</label>
                    <input
                      type="text"
                      name="curp"
                      value={formData.curp}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Código de Categoría</label>
                    <input
                      type="text"
                      name="codigo_categoria"
                      value={formData.codigo_categoria}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Categoría</label>
                    <input
                      type="text"
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Fecha de Ingreso al Hospital
                    </label>
                    <input
                      type="date"
                      name="fecha_ingreso_hospital"
                      value={formData.fecha_ingreso_hospital}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Fecha de Ingreso al Sindicato
                    </label>
                    <input
                      type="date"
                      name="fecha_ingreso_sindicato"
                      value={formData.fecha_ingreso_sindicato}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tipo de Empleado</label>
                    <select
                      name="tipo_empleado"
                      value={formData.tipo_empleado}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="base">Base</option>
                      <option value="formalizado">Formalizado</option>
                      <option value="homologado">Homologado</option>
                      <option value="contrato">Contrato</option>
                      <option value="eventual">Eventual</option>
                    </select>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                      Guardar
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <p><strong>Nombre Completo:</strong> {trabajador.nombre_completo}</p>
                    <p><strong>RFC:</strong> {trabajador.rfc}</p>
                    <p><strong>CURP:</strong> {trabajador.curp}</p>
                    <p><strong>Código de Categoría:</strong> {trabajador.codigo_categoria}</p>
                    <p><strong>Categoría:</strong> {trabajador.categoria}</p>
                    <p><strong>Fecha de Ingreso al Hospital:</strong> {trabajador.fecha_ingreso_hospital}</p>
                    <p><strong>Fecha de Ingreso al Sindicato:</strong> {trabajador.fecha_ingreso_sindicato}</p>
                    <p><strong>Tipo de Empleado:</strong> {trabajador.tipo_empleado}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(trabajador)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(trabajador.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Sección para exportar PDFs */}
      <ExportarPDF trabajadores={trabajadores} />
    </div>
  );
};

export default VerTrabajadores;
