<template>
    <div>
        <!-- Barra de navegación -->
        <NavBar />
    </div>
    <br />
    <div class="row">
        <h3 class="text-center font-weight-bold">Gestión clientes</h3>
    </div>
    <hr> <!-- Formulario -->
    <div class="container-fluid">
        <div class="row" id="map_section">
            <div class="col-12 col-m-6 col-lg-8 mx-auto">
                <form class="form-inline">
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">DNI:</span>
                        <input v-model="dni" type="text" class="form-control form-control-sm" id="dni" name="dni">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Nombre:</span>
                        <input v-model="nombre" type="text" class="form-control" id="nombre" name="nombre">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Apellido:</span>
                        <input v-model="apellido" type="text" class="form-control" id="apellido" name="apellido">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Email:</span>
                        <input v-model="email" type="text" class="form-control" id="email" name="email">
                    </div>
                    <div class="text-center">
                        <button type="button" class="btn btn-primary m-2" @click="guardarCliente">Guardar</button>
                        <button type="button" class="btn btn-secondary" @click="limpiar">Limpiar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <hr /> <!-- Tabla de datos -->
    <!--
    <div class="row">
        <h5 class="text-center font-weight-bold">Listado Clientes</h5>
    </div> -->
    <div class="row justify-content-center mt-4">
        <div class="col-md-8 bg-light">
            <div class="row justify-content-center text-primary p-2">
                <h5 class="text-center font-weight-bold">Listado Clientes</h5>
            </div>
            <div class="table-responsive">
                <table class="table table-striped table-bordered">
                    <thead class="table-info">
                        <tr class="text-center">
                            <th>DNI</th>
                            <th>Apellido</th>
                            <th>Nombre</th>
                            <th>Correo Electrónico</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cliente in clientes" :key="cliente.id">
                            <td class="text-center">{{ cliente.dni }}</td>
                            <td>{{ cliente.apellido }}</td>
                            <td>{{ cliente.nombre }}</td>
                            <td>{{ cliente.email }}</td>
                            <td class="text-center">
                                <div>
                                    <button class="btn btn-warning m-2" @click="modificarCliente(cliente.id)"><i
                                            class="bi bi-pencil-square"></i></button>
                                    <button class="btn btn-danger m-2" @click="eliminarCliente(cliente.id)"><i
                                            class="bi bi-trash3"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- 
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
                <td class="text-center">{{ cliente.dni }}</td>
                <td>{{ cliente.email }}</td>
                <td class="text-center">
                    <div>
                        <button class="btn btn-warning m-2" @click="modificarCliente(cliente.id)"><i
                                class="bi bi-pencil-square"></i></button>
                        <button class="btn btn-danger m-2" @click="eliminarCliente(cliente.id)"><i
                                class="bi bi-trash3"></i></button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>-->
</template>

<script>
import Swal from 'sweetalert2';
export default {
    name: 'TablaClientes',
    data() {
        return {
            clientes: [],
            clienteSeleccionado: null,
            dni: '',
            nombre: '',
            apellido: '',
            email: '',
        };
    },
    mounted() {
        this.obtenerClientes() // Llama a la función para obtener clientes cuando el componente se monta
    },
    methods: {
        async obtenerClientes() {
            try {
                // AHora hacemos una solicitud directamente al servidor JSON
                const response = await fetch('http://localhost:3000/clientes')

                if (!response.ok) {
                    throw new Error('No se pudieron obtener los datos del servidor')
                }

                const data = await response.json()

                // Asignamos los clientes a la variable del componente
                this.clientes = data
            } catch (error) {
                console.log("Error al obtener los clientes:", error)
                // Manejo de errores
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron obtener los datos del servidor.'
                })
            }
        },
        async eliminarCliente(clienteId) {
            // Mostrar ventada de confirmación
            const confirmacion = await this.mostrarConfirmacionEliminar()

            // Verificar si se confirmó la eliminación
            if (confirmacion) {
                // Realizar la lógica de eliminación
                const index = this.clientes.findIndex(cliente => cliente.id === clienteId)

                if (index != -1) {
                    this.clientes.splice(index, 1)
                    await fetch(`http://localhost:3000/clientes/${clienteId}`), {
                        method: 'DELETE',
                    }
                    // Mostrar alerta de éxito
                    this.mostrarAlerta('Cliente eliminado correctamente', 'succes')
                } else {
                    this.mostrarAlerta('Cliente no encontrado', 'error')
                }
            }
        },
        async mostrarConfirmacionEliminar() {
            // Mostrar ventana de confirmación
            const confirmacion = await Swal.fire({
                title: '¿Estás seguro de que deseas eliminar este cliente?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
                customClass: {
                    container: 'custom-alert-container',
                    popup: 'custom-alert',
                    confirmButton: 'custom-alert-button',
                    cancelButton: 'custom-alert-button',
                },
            });

            return confirmacion.isConfirmed;
        },
        capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        },
        // alta a un usuario cliente
        async postUsuario(usuario) {
            try {
                const response = await fetch('http://localhost:3000/usuarios', {
                    method: 'POST',
                    body: JSON.stringify(usuario),
                    headers: {'Content-type' : 'application/json; charset=UTF-8'}
                });

                const usuarioCreado = await response.json();
                this.usuarios = [...this.usuarios, usuarioCreado]
            } catch (error) {
                console.error(error)
            }
        },/*
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

                if (!this.validarDniNie()) {
                    return;
                }
                // Agregar el nuevo cliente al array clientes
                this.clientes.push(nuevoCliente)

                // Restablecer los datos del formulario
                this.nombre = nuevoCliente.nombre;
                this.apellido = nuevoCliente.apellido;
                this.dni = nuevoCliente.dni;
                this.email = nuevoCliente.email;
                // Mostrar alerta de éxito
                this.mostrarAlerta('Cliente guardado correctamente', 'success');
            }
        },*/
        async guardarCliente() {
            try {
                const validarDniNie = this.validarDniNie(); // Validar DNI/NIE
                
                if (validarDniNie) { // Crear el cliente con el formulario
                    const cliente = {
                        dni: this.dni.trim().toUpperCase(),
                        nombre: this.nombre.trim(),
                        apellido: this.apellido.trim(),
                        email: this.email.trim(),
                    };

                    let url = 'http://localhost:3000/clientes';
                    let metodo = 'POST'

                    // Si hay un cliente seleccionado, es una actualización (PUT)
                    if (this.clienteSeleccionado) {
                        url+= `${this.clienteSeleccionado.id}`;
                        metodo = 'PUT';
                    }

                    // Realizar la solicitud al servidor
                    const response = await fetch(url, {
                        method: metodo,
                        headers: {'Content-type' : 'application/json; charset=UTF-8'},
                        body: JSON.stringify(cliente)
                    })

                    if(!response.ok) {
                        throw new Error('Error al guardar el cliente en el servidor.')
                    }

                    // Limpiar el formulario y obtener actualizada la lista de clientes
                    this.limpiar();
                    this.obtenerClientes();

                    // Mostrar mensajes de éxito
                    const mensaje = this.clienteSeleccionado ? 'Cliente modificado correctamente.' : 'Cliente guardado correctamente.';
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: mensaje,
                    });
                } else {
                    // Mostrar alerta de error de validación
                    this.mostrarAlerta('DNI o NIE no válido', 'error')                    
                }

            } catch (error) {
                console.error('Error al guardar cliente', 'error')

                // Mostrar mensaje de error
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al guardar el cliente en el servidor'
                })
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

        validarDniNie() {
            let dniNie = this.dni.trim().toUpperCase();
            this.dni = dniNie;
            const regexDniNie = /^[0-9XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
            switch (dniNie.charAt(0)) {
                case 'X': {
                    dniNie = '0' + dniNie.slice(1);
                    break
                }
                case 'Y': {
                    dniNie = '1' + dniNie.slice(1);
                    break
                }
                case 'Z': {
                    dniNie = '2' + dniNie.slice(1);
                    break
                }
                default: break;
            }
            const numero = parseInt(dniNie.slice(0, 8), 10);
            const letraCalculada = 'TRWAGMYFPDXBNJZSQVHLCKE'.charAt(numero % 23);
            if (letraCalculada !== dniNie.charAt(8) || !regexDniNie.test(dniNie)) {
                this.mostrarAlerta('DNI/NIE no válido', 'error');
                return false;
            } else {
                return true;
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
        /*eliminarCliente(clienteId) {
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
        },*/
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
        }
    }
}
</script>

<style>
.btn-no-hover:hover {
    /* no cambie de color */
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