// Clase Usuario
class Usuario {
    constructor(idUsuario, nombre, email, password, rol) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }

    iniciarSesion() {
        console.log(`${this.nombre} ha iniciado sesión.`);
    }

    recuperarContraseña() {
        console.log(`${this.nombre} ha solicitado recuperar la contraseña.`);
    }

    cerrarSesion() {
        console.log(`${this.nombre} ha cerrado sesión.`);
    }
}

// Clase Empleado
class Empleado {
    constructor(idEmpleado, nombre, apellido, puesto, fechaContratacion, salario) {
        this.idEmpleado = idEmpleado;
        this.nombre = nombre;
        this.apellido = apellido;
        this.puesto = puesto;
        this.fechaContratacion = fechaContratacion;
        this.salario = salario;
    }

    agregarEmpleado() {
        console.log(`Empleado ${this.nombre} agregado.`);
    }

    modificarEmpleado() {
        console.log(`Empleado ${this.nombre} modificado.`);
    }

    eliminarEmpleado() {
        console.log(`Empleado ${this.nombre} eliminado.`);
    }

    generarReporte() {
        console.log(`Generando reporte de empleados...`);
    }
}

// Clase SecretarioGeneral
class SecretarioGeneral extends Usuario {
    gestionarEmpleados() {
        console.log('Gestionando empleados...');
    }

    generarReporteEmpleados() {
        console.log('Generando reporte de empleados...');
    }
}

// Clase SecretarioFinanzas
class SecretarioFinanzas extends Usuario {
    modificarFinanzas() {
        console.log('Modificando finanzas...');
    }

    visualizarDatosFinancieros() {
        console.log('Visualizando datos financieros...');
    }
}

// Clase SecretarioTrabajoConflictos
class SecretarioTrabajoConflictos extends Usuario {
    registrarIncidente() {
        console.log('Registrando nuevo incidente...');
    }

    modificarEstadoIncidente() {
        console.log('Modificando estado del incidente...');
    }

    generarInformeIncidentes() {
        console.log('Generando informe de incidentes...');
    }
}

// Clase Asistente
class Asistente extends Usuario {
    actualizarBaseDatos() {
        console.log('Actualizando base de datos...');
    }

    generarInformes() {
        console.log('Generando informes personalizados...');
    }

    gestionarEmpleados() {
        console.log('Gestionando empleados...');
    }

    gestionarIncidentes() {
        console.log('Gestionando incidentes...');
    }
}

// Clase Incidente
class Incidente {
    constructor(idIncidente, descripcion, estado, fecha) {
        this.idIncidente = idIncidente;
        this.descripcion = descripcion;
        this.estado = estado;
        this.fecha = fecha;
    }

    registrarIncidente() {
        console.log('Incidente registrado.');
    }

    modificarEstadoIncidente() {
        console.log('Estado del incidente modificado.');
    }

    consultarIncidente() {
        console.log('Consultando incidente...');
    }
}

// Clase Finanzas
class Finanzas {
    constructor(idFinanzas, saldo, fechaModificacion) {
        this.idFinanzas = idFinanzas;
        this.saldo = saldo;
        this.fechaModificacion = fechaModificacion;
    }

    modificarSaldo() {
        console.log('Saldo modificado.');
    }

    consultarFinanzas() {
        console.log('Consultando finanzas...');
    }
}

// Clase BaseDeDatos
class BaseDeDatos {
    conectar() {
        console.log('Conectando a la base de datos...');
    }

    consultarDatos() {
        console.log('Consultando datos...');
    }

    modificarDatos() {
        console.log('Modificando datos...');
    }

    cerrarConexion() {
        console.log('Cerrando conexión a la base de datos...');
    }
}

// Relaciones entre clases

// Secretario General gestiona empleados
let secretarioGeneral = new SecretarioGeneral(1, 'Juan Perez', 'juan@example.com', 'password123', 'Secretario General');
secretarioGeneral.gestionarEmpleados();

// Asistente actualiza la base de datos
let asistente = new Asistente(2, 'Maria López', 'maria@example.com', 'password456', 'Asistente');
asistente.actualizarBaseDatos();

// Secretario de Finanzas modifica las finanzas
let secretarioFinanzas = new SecretarioFinanzas(3, 'Pedro Jimenez', 'pedro@example.com', 'password789', 'Secretario Finanzas');
secretarioFinanzas.modificarFinanzas();
