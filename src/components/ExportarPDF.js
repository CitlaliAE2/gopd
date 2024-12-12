import React, { useState } from 'react';
import jsPDF from 'jspdf';

const ExportarPDF = ({ trabajadores }) => {
  const [selectedTrabajador, setSelectedTrabajador] = useState('');

  // Obtener la fecha actual en formato dd/mm/yyyy
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Configuración de estilos
  const setPageStyle = (doc) => {
    doc.setFillColor(245, 234, 224); // Fondo crema
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F'); // Fondo
    doc.setDrawColor(0, 0, 0); // Color negro para el borde
    doc.rect(5, 5, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 10); // Borde
  };

  const setTitleStyle = (doc) => {
    doc.setFont('times', 'bolditalic'); // Título estilizado
    doc.setFontSize(22);
    doc.setTextColor(60, 60, 60); // Color oscuro
  };

  const setContentStyle = (doc) => {
    doc.setFont('helvetica', 'normal'); // Fuente para el contenido
    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80); // Color gris
  };

  const addFooter = (doc, pageCount, currentPage) => {
    const currentDate = getCurrentDate(); // Obtener la fecha actual
    doc.setFontSize(10);
    // Pie de página con numeración centrada
    doc.text(
      `Página ${currentPage} de ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
    // Fecha de generación en la esquina inferior izquierda
    doc.text(`Fecha: ${currentDate}`, 10, doc.internal.pageSize.height - 10);
  };

  // Generar PDF para todos los registros
  const handleExportarTodos = () => {
    const doc = new jsPDF();

    // Configurar diseño inicial de la página
    setPageStyle(doc);

    // Título
    setTitleStyle(doc);
    doc.text('Lista Completa de Trabajadores', doc.internal.pageSize.width / 2, 20, { align: 'center' });

    // Contenido
    setContentStyle(doc);
    let startY = 40;
    trabajadores.forEach((trabajador) => {
      if (startY > doc.internal.pageSize.height - 30) {
        const currentPage = doc.internal.getCurrentPageInfo().pageNumber;
        const totalPages = doc.internal.getNumberOfPages();
        addFooter(doc, totalPages, currentPage);
        doc.addPage();
        setPageStyle(doc);
        setContentStyle(doc);
        startY = 20;
      }
      doc.text(`ID: ${trabajador.id}`, 20, startY);
      startY += 10;
      doc.text(`Nombre Completo: ${trabajador.nombre_completo}`, 20, startY);
      startY += 10;
      doc.text(`RFC: ${trabajador.rfc}`, 20, startY);
      startY += 10;
      doc.text(`CURP: ${trabajador.curp}`, 20, startY);
      startY += 10;
      doc.text(`Código Categoría: ${trabajador.codigo_categoria}`, 20, startY);
      startY += 10;
      doc.text(`Categoría: ${trabajador.categoria}`, 20, startY);
      startY += 10;
      doc.text(`Fecha de Ingreso al Hospital: ${trabajador.fecha_ingreso_hospital}`, 20, startY);
      startY += 10;
      doc.text(`Fecha de Ingreso al Sindicato: ${trabajador.fecha_ingreso_sindicato}`, 20, startY);
      startY += 10;
      doc.text(`Tipo de Empleado: ${trabajador.tipo_empleado}`, 20, startY);
      startY += 15;

      // Línea divisoria
      doc.setDrawColor(200, 200, 200);
      doc.line(10, startY, doc.internal.pageSize.width - 10, startY);
      startY += 10;
    });

    // Numeración de páginas
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      addFooter(doc, pageCount, i);
    }

    doc.save('Lista_Trabajadores.pdf');
  };

  // Generar PDF para un trabajador específico
  const handleExportarIndividual = () => {
    if (!selectedTrabajador) {
      alert('Por favor, selecciona un trabajador');
      return;
    }

    const trabajador = trabajadores.find(
      (t) => t.id.toString() === selectedTrabajador
    );

    if (!trabajador) {
      alert('Trabajador no encontrado');
      return;
    }

    const doc = new jsPDF();

    // Configurar diseño inicial de la página
    setPageStyle(doc);

    // Título
    setTitleStyle(doc);
    doc.text('Datos del Trabajador', doc.internal.pageSize.width / 2, 20, { align: 'center' });

    // Contenido
    setContentStyle(doc);
    const data = [
      ['ID', trabajador.id],
      ['Nombre Completo', trabajador.nombre_completo],
      ['RFC', trabajador.rfc],
      ['CURP', trabajador.curp],
      ['Código Categoría', trabajador.codigo_categoria],
      ['Categoría', trabajador.categoria],
      ['Fecha de Ingreso al Hospital', trabajador.fecha_ingreso_hospital],
      ['Fecha de Ingreso al Sindicato', trabajador.fecha_ingreso_sindicato],
      ['Tipo Empleado', trabajador.tipo_empleado],
    ];

    let startY = 40; // Posición inicial para los datos
    const keyX = 20; // Posición X para los títulos
    const valueX = 110; // Posición X para los valores (más separada del título)

    data.forEach(([key, value]) => {
      if (startY > doc.internal.pageSize.height - 20) {
        const currentPage = doc.internal.getCurrentPageInfo().pageNumber;
        const totalPages = doc.internal.getNumberOfPages();
        addFooter(doc, totalPages, currentPage);
        doc.addPage();
        setPageStyle(doc);
        setContentStyle(doc);
        startY = 20;
      }
      doc.text(`${key}:`, keyX, startY); // Imprime el título
      doc.text(`${value}`, valueX, startY); // Imprime el valor más alejado del título
      startY += 12; // Espaciado adicional entre líneas para evitar sobreposición
    });

    // Numeración de páginas
    const currentPage = doc.internal.getCurrentPageInfo().pageNumber;
    const totalPages = doc.internal.getNumberOfPages();
    addFooter(doc, totalPages, currentPage);

    doc.save(`${trabajador.nombre_completo}_Detalle.pdf`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Exportar Registros en PDF</h2>
      <div className="space-y-4">
        {/* Botón para exportar todos los registros */}
        <button
          onClick={handleExportarTodos}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Descargar PDF con Todos los Registros
        </button>

        {/* Menú desplegable y botón para exportar un registro específico */}
        <div className="space-y-2">
          <label htmlFor="trabajadores" className="block text-sm font-medium text-gray-700">
            Selecciona un Trabajador:
          </label>
          <select
            id="trabajadores"
            value={selectedTrabajador}
            onChange={(e) => setSelectedTrabajador(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">-- Selecciona un Trabajador --</option>
            {trabajadores.map((trabajador) => (
              <option key={trabajador.id} value={trabajador.id}>
                {trabajador.nombre_completo}
              </option>
            ))}
          </select>
          <button
            onClick={handleExportarIndividual}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            Descargar PDF del Trabajador Seleccionado
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportarPDF;
