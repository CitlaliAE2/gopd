import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [correo, setCorreo] = useState(''); // Estado para el correo
  const [contrasena, setContrasena] = useState(''); // Estado para la contraseña
  const [mensaje, setMensaje] = useState(''); // Estado para mensajes de error o éxito
  const [loading, setLoading] = useState(false); // Estado para el botón de carga

  const navigate = useNavigate(); // Para redirigir al usuario después de iniciar sesión

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje(''); // Limpia cualquier mensaje previo
    setLoading(true); // Inicia el estado de carga

    try {
      // Mostrar los datos que se están enviando (para depuración)
      console.log('Datos de inicio de sesión:', { correo, contrasena });

      // Realizar solicitud al backend
      const response = await fetch('http://localhost/gopd_backend/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          correo: correo.trim(),
          contrasena: contrasena.trim()
        })
      });

      // Verificar si la solicitud fue exitosa
      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
      }

      // Parsear la respuesta como JSON
      const data = await response.json();

      // Mostrar la respuesta del servidor (para depuración)
      console.log('Respuesta del servidor:', data);

      if (data.status === 'success') {
        // Guardar información del usuario en localStorage
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        alert('Inicio de sesión exitoso');
        navigate('/dashboard'); // Redirigir al Dashboard
      } else {
        setMensaje(data.message); // Mostrar mensaje de error
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMensaje('Hubo un problema al iniciar sesión. Intenta de nuevo más tarde.');
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center">Iniciar Sesión</h2>
        {mensaje && <div className="text-red-500 mb-4 text-center">{mensaje}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
              Correo
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="ejemplo@correo.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className={`w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
