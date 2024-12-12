import React, { useState } from 'react';

const EditarTrabajador = ({ trabajador, onSave, onCancel }) => {
  const [formData, setFormData] = useState(trabajador);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Enviando datos al backend:", formData);
      const response = await fetch('http://localhost/gopd_backend/editar_trabajador.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error HTTP: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("Respuesta del backend:", result);

      if (result.success) {
        alert(result.message || 'Trabajador actualizado correctamente.');
        onSave(formData); // Notifica al componente principal
      } else {
        alert(result.message || 'No se pudo actualizar el trabajador.');
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      alert(`No se pudo guardar los cambios. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-lg font-bold mb-4">Editar Trabajador</h2>
      <div>
        <label>Nombre Completo</label>
        <input
          type="text"
          name="nombre_completo"
          value={formData.nombre_completo}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label>RFC</label>
        <input
          type="text"
          name="rfc"
          value={formData.rfc}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label>CURP</label>
        <input
          type="text"
          name="curp"
          value={formData.curp}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label>Código Categoría</label>
        <input
          type="text"
          name="codigo_categoria"
          value={formData.codigo_categoria}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label>Categoría</label>
        <input
          type="text"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label>Fecha de Ingreso al Hospital</label>
        <input
          type="date"
          name="fecha_ingreso_hospital"
          value={formData.fecha_ingreso_hospital}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label>Fecha de Ingreso al Sindicato</label>
        <input
          type="date"
          name="fecha_ingreso_sindicato"
          value={formData.fecha_ingreso_sindicato}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label>Tipo de Empleado</label>
        <select
          name="tipo_empleado"
          value={formData.tipo_empleado}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="base">Base</option>
          <option value="formalizado">Formalizado</option>
          <option value="homologado">Homologado</option>
          <option value="contrato">Contrato</option>
          <option value="eventual">Eventual</option>
        </select>
      </div>
      <div className="flex space-x-4 mt-4">
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default EditarTrabajador;
