<template>
    <div>
        <NavBar />
    </div>
    <div class="row">
        <h3 class="text-center font-weight-bold">Gestión Productos</h3>
    </div>
    <hr> <!-- Formulario -->
    <div class="container-fluid">
        <div class="row" id="map_section">
            <div class="col-12 col-m-6 col-lg-8 mx-auto">
                <form class="form-inline">
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Nombre:</span>
                        <input v-model="nombre" type="text" class="form-control" id="nombre" name="nombre">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span" style="margin-right: 10px;">Departamento:</span>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="alimentacion" value="ALIMENTACION"
                                v-model="departamento">
                            <label class="form-check-label" for="prioridadAlta">Alimentación</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="drogueria" value="DROGUERIA"
                                v-model="departamento">
                            <label class="form-check-label" for="prioridadMedia">Droguería</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="ropa" value="ROPA" v-model="departamento">
                            <label class="form-check-label" for="prioridadBaja">Ropa</label>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Precio:</span>
                        <input v-model="precio" type="number" class="form-control" id="precio" name="precio">
                    </div>
                    <div class="text-center">
                        <button type="button" class="btn btn-primary m-2" @click="guardarProducto">Guardar</button>
                        <button type="button" class="btn btn-secondary" @click="limpiar">Limpiar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <hr /> <!-- Tabla de datos -->
    <div class="row justify-content-center mt-4">
        <div class="col-md-8 bg-light">
            <div class="row justify-content-center text-primary p-2">
                <h5 class="text-center font-weight-bold">Listado Productos</h5>
            </div>
            <div class="table-responsive">
                <table class="table table-striped table-bordered">
                    <thead class="table-info">
                        <tr class="text-center">
                            <th>Nombre</th>
                            <th>Departamento</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="producto in productos" :key="producto.id">
                            <td>{{ producto.nombre }}</td>
                            <td>{{ producto.departamento }}</td>
                            <td class="text-center">{{ producto.precio }}</td>
                            <td class="text-center">
                                <div>
                                    <button class="btn btn-warning m-2" @click="modificarProducto(producto.id)"><i
                                            class="bi bi-pencil-square"></i></button>
                                    <button class="btn btn-danger m-2" @click="eliminarProducto(producto.id)"><i
                                            class="bi bi-trash3"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
    name: 'TablaProductos',
    data() {
        return {
            productos: [],
            productoSeleccionado: null,
            nombre: '',
            departamento: '',
            precio: '',
        };
    },
    mounted() {
        this.obtenerProductos()
    },
    methods: {
        async obtenerProductos() {
            try {
                // Ahora hacemos una solicitud directamente al servidor JSON
                const response = await fetch('http://localhost:3000/productos')

                if (!response.ok) {
                    throw new Error('No se pudieron obtener los datos del servidor')
                }

                const data = await response.json()

                // Asignamos los productos a la variable del componente
                this.productos = data
            } catch (error) {
                console.log("Error al obtener los productos:", error)
                // Manejo de errores
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron obtener los datos del servidor.'
                })
            }
        },
        async eliminarProducto(productoId) {
            // Mostrar ventada de confirmación
            const confirmacion = await this.mostrarConfirmacionEliminar()

            // Verificar si se confirmó la eliminación
            if (confirmacion) {
                // Realizar la lógica de eliminación
                const index = this.productos.findIndex(producto => producto.id === productoId)

                if (index !== -1) {
                    //this.clientes.splice(index, 1)
                    await fetch(`http://localhost:3000/productos/${productoId}`, {
                        method: 'DELETE',
                    })
                    // Mostrar alerta de éxito
                    this.mostrarAlerta('Producto eliminado correctamente', 'succes')
                } else {
                    this.mostrarAlerta('Producto no encontrado', 'error')
                }
            }
        },
        async mostrarConfirmacionEliminar() {
            // Mostrar ventana de confirmación
            const confirmacion = await Swal.fire({
                title: '¿Estás seguro de que deseas eliminar este producto?',
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
        async guardarProducto() {
            try {
                const producto = {
                    nombre: this.nombre.trim(),
                    departamento: this.departamento.trim(),
                    precio: this.precio,
                };
                let url = 'http://localhost:3000/productos';
                let metodo = 'POST'
                // Si hay un producto seleccionado, es una actualización (PUT)
                if (this.productoSeleccionado) {
                    url += `/${this.productoSeleccionado.id}`;
                    metodo = 'PUT';
                }

                // Realizar la solicitud al servidor JSON
                const response = await fetch(url, {
                    method: metodo,
                    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                    body: JSON.stringify(producto)
                })

                if (!response.ok) {
                    throw new Error('Error al guardar el producto en el servidor.')
                }

                // Limpiar el formulario y obtener actualizada la lista de productos
                this.limpiar();
                this.obtenerProductos();

                // Mostrar mensajes de éxito
                const mensaje = this.productoSeleccionado ? 'Producto modificado correctamente.' : 'Producto guardado correctamente.';
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: mensaje,
                });
            } catch (error) {
                console.error('Error al guardar producto', 'error')

                // Mostrar mensaje de error
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al guardar el producto en el servidor'
                })
            }
        },
        // Limpiar campos del formulario
        limpiar() {
            // Lógica para limpiar los campos del formulario
            this.nombre = '';
            this.departamento = '';
            this.precio = '';

            this.mostrarAlerta('Campos limpiados', 'info')
            return;
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
        modificarProducto(productoId) {
            // buscar el producto con el ID dado
            const producto = this.productos.find(producto => producto.id === productoId);

            // comprobar si el producto existe 
            if (producto) {
                // actualizar los campos del formulario con los datos del producto
                this.nombre = producto.nombre;
                this.departamento = producto.departamento;
                this.precio = producto.precio;
                this.productoSeleccionado = producto;

                // mostrar alerta de éxito
                this.mostrarAlerta('Datos del producto listos para modificar', 'info');
            } else {
                //mostrar alerta de error si el cliente no existe
                this.mostrarAlerta('Producto no encontrado', 'error');
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

h3 {
    padding-top: 30px;
}
</style>