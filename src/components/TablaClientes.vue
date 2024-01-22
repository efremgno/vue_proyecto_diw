<template>
    <div id="tabla-clientes" class="container">

        <nav class="navbar navbar-dark bg-primary">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand" href="#">Inicio</a>
                <a class="navbar-brand" href="#">Clientes</a>
                <a class="navbar-brand" href="#">Artículos</a>
                <a class="navbar-brand" href="#">Ventas</a>
                <div class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Búsqueda" aria-label="Search">
                    <button class="btn btn-light" type="submit" data-v-f0802bba=""><i class="bi bi-search"
                            data-v-f0802bba=""></i></button>
                </div>
                <div class="collapse navbar-collapse" id="navbarToggleExternalContent" data-v-f0802bba="">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0" data-v-f0802bba="">
                        <li class="nav-item" data-v-f0802bba=""><a class="nav-link" href="#"
                                data-v-f0802bba="">Articulos</a></li>
                        <li class="nav-item" data-v-f0802bba=""><a class="nav-link" href="#" data-v-f0802bba="">Ventas</a>
                        </li>
                        <li class="nav-item" data-v-f0802bba=""><a class="nav-link" href="#" data-v-f0802bba="">Contacto</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <br>
        <div class="row">
            <h3 class="text-center font-weight-bold">Gestión clientes</h3>
        </div>
        <hr>
        <!-- Formulario -->
        <div class="container-fluid">
            <div class="row" id="map_section">
                <div class="col-12 col-m-6 col-lg-8 mx-auto">
                    <form class="form-inline">
                        <div class="input-group mb-3"><span class="input-group-text custom-span">DNI:</span><input
                                type="text" class="form-control form-control-sm" id="dni" name="dni" @blur="validarDniNie">
                        </div>
                        <div class="input-group mb-3"><span class="input-group-text custom-span">Nombre:</span><input
                                type="text" class="form-control" id="nombre" name="nombre"></div>
                        <div class="input-group mb-3"><span class="input-group-text custom-span">Apellido:</span><input
                                type="text" class="form-control" id="apellido" name="apellido"></div>
                        <div class="input-group mb-3"><span class="input-group-text custom-span">Email:</span><input
                                type="text" class="form-control" id="email" name="email"></div>
                        <div class="text-center"><button type="button" class="btn btn-primary m-2"
                                @click="guardar">Guardar</button><button type="button" class="btn btn-secondary"
                                @click="limpiar">Limpiar</button></div>
                    </form>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <h5 class="text-center font-weight-bold">Listado Clientes</h5>
        </div>
        <table class="table table-striped  table-bordered">
            <thead class="table-info">
                <tr class="text-center">
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>DNI</th>
                    <th>E-mail</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cliente in clientes" :key="cliente.id">
                    <td>{{ cliente.nombre }}</td>
                    <td>{{ cliente.apellido }}</td>
                    <td>{{ cliente.dni }}</td>
                    <td>{{ cliente.email }}</td>
                    <td>
                        <button class="btn btn-warning"><i class="bi bi-pencil-square"></i></button>
                        <button class="btn btn-danger"><i class="bi bi-trash3"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
    name: 'TablaClientes',
    data() {
        return {
            nombre: '',
            apellido: '',
            dni: '',
            email: '',
            clientes: [
                {
                    id: 1,
                    nombre: 'Juan',
                    apellido: 'Pérez',
                    dni: '12345678Z',
                    email: 'jaunperez@gmail.com'
                },
                {
                    id: 2,
                    nombre: 'María',
                    apellido: 'Abal',
                    dni: '29345678V',
                    email: 'maria@gmail.com'
                },
                {
                    id: 3,
                    nombre: 'Pedro',
                    apellido: 'García',
                    dni: '31245678C',
                    email: 'pedro@gmail.com'
                }
            ]
        }
    },
    methods: {
        guardar() {
            // Controlar los campos que están vacíos
            if (this.nombre.trim() === '' || this.apellido.trim() === '' || this.dni.trim() === '' || this.email.trim() === '') {
                this.mostrarAlerta('Debe Completar los Campos', 'warning');
            } else {
                // Lógica para guardar los datos del formulario
                // Crear un nuevo cliente con los datos del usuario
                const nuevoCliente = {
                    id: this.clientes.length + 1, // asignar un nuevo ID
                    nombre: this.nombre.trim().toUpperCase(),
                    apellido: this.apellido.trim().toUpperCase(),
                    dni: this.dni.trim().toUpperCase(),
                    email: this.email.trim(),
                };

                // Agregar el nuevo cliente al array clientes
                this.clientes.push(nuevoCliente)

                // Restablecer los datos del formulario
                this.nombre = nuevoCliente.nombre;
                this.apellido = nuevoCliente.apellido;
                this.dni = nuevoCliente.dni;
                this.email = nuevoCliente, this.email;

                // Mostrar alerta de éxito
                this.mostrarAlerta('Cliente guardado correctamente', 'success');
            }
        },

        // Limpiar campos del formulario
        limpiar() {
            // Lógica para limpiar los campos del formulario
            this.nombre = '';
            this.apellido = '';
            this.dni = '';
            this.email = '';

            this.mostrarAlerta('Campos limpiados', 'info')
            return;
        },

        // Validar DNI o NIE
        validarDniNie() {
            const dniNie = this.dni.trim().toUpperCase(); // Convierte a mayúsculas para simplificar la validación
            this.dni = dniNie; // Actualiza el valor del campo
            // Expresión regular para validar DNI y NIE
            const regexDniNie = /^[0-9XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/;

            if (!regexDniNie.test(dniNie)) {
                this.mostrarAlerta('DNI o NIE no válido', 'error');
                this.dni = ''; // Limpiar el campo si el DNI o NIE no es válido
                return;
            }
            // Validar el dígito de control
            const numero = parseInt(dniNie.slice(0, 8), 10);
            let letraCalculada = '';

            // Verificar si es un NIE (XYZ)
            if (dniNie.charAt(0) === 'X' || dniNie.charAt(0) === 'Y' || dniNie.charAt(0) === 'Z') {
                letraCalculada = 'TRWAGMYFPDXBNJZSQVHLCKE'.charAt(numero % 23);
            } else {
                letraCalculada = 'TRWAGMYFPDXBNJZSQVHLCKE'.charAt(numero % 23);
            }

            if (letraCalculada !== dniNie.charAt(8)) {
                this.mostrarAlerta('DNI o NIE no válido', 'error');
                this.dni = ''; // Limpiar el campo si el DNI no es válido
            }
        },
        // Mostrar ventana alerta
        mostrarAlerta(mensaje, tipo) {
            Swal.fire({
                title: mensaje,
                icon: tipo,
                customClass: {
                    container: 'custom-alert-container',
                    popup: 'custom-alert',
                    confirmButton: 'custom-alert-button',
                }
            })
        },
        // Eliminar cliente
        eliminarCliente(clienteId) {
            // Encontrar el código
            const index = this.clientes.findIndex(cliente => cliente.id === clienteId);

            // Comprobar si el cliente existe
            if (index !== -1) {
                // borrado del cliente
                this.clientes.splice(index, 1);

                // mostrando alerta de éxito
                this.mostrarAlerta('Cliente eliminado correctamente', 'succes');
            } else {
                // mostrar alerta de error si el cliente no existe
                this.mostrarAlerta('Cliente no econtrado', 'error');
            }
        },
        modificarCliente(clienteId) {
            // buscar el cliente con el ID dado
            const cliente = this.clientes.find(cliente => cliente.id === clienteId);

            // comprobar si el cliente existe 
            if (cliente) {
                // actualizar los campos del formulario con los datos del cliente
                this.nombre = cliente.nombre;
                this.apellido = cliente.apellido;
                this.dni = cliente.dni;
                this.email = cliente.email;

                // mostrar alerta de éxito
                this.mostrarAlerta('Datos del cliente listos para modificar', 'info');
            } else {
                //mostrar alerta de error si el cliente no existe
                this.mostrarAlerta('Cliente no encontrado', 'error');
            }
        },
    }
}
</script>

<style>
    .btn-no-hover:hover { /* no cambie de color */
        background-color: white !important;
        border-color: white !important;
    }
    .btno-no-hover i {
        color: #000000 !important;
    }
    .custom-span {
        width: 120px;
        display: inline-block;
        text-align: left;
    }
</style>