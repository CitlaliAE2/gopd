import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate para redirigir

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();  // Inicializar useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/gopd_backend/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          nombre: nombre,
          correo: correo,
          contrasena: contrasena
        })
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      setMensaje(data.message);

      if (data.message === "Registro exitoso") {
        // Redirigir al login después de registro exitoso
        setTimeout(() => {
          navigate('/login'); // Redirige a la página de login
        }, 2000); // Retraso de 2 segundos para mostrar el mensaje de éxito
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setMensaje('Hubo un problema con la solicitud');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4">Registro</h2>
        {mensaje && <div className="text-center text-red-500 mb-4">{mensaje}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Correo</label>
            <input
              type="email"
              name="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              name="contrasena"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;


