<template>
    <div id="tabla-clientes" class="container">

        <nav class="navbar navbar-dark bg-primary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Inicio</a>
                <a class="navbar-brand" href="#">Clientes</a>
                <a class="navbar-brand" href="#">Artículos</a>
                <a class="navbar-brand" href="#">Ventas</a>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Búsqueda" aria-label="Search">
                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </form>
            </div>
        </nav>
        <div class="row">
            <h2 class="text-center">Tabla de clientes</h2>
        </div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>DNI</th>
                    <th>E-mail</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cliente in clientes" :key="cliente.id">
                    <td>{{ cliente.nombre }}</td>
                    <td>{{ cliente.apellido }}</td>
                    <td>{{ cliente.dni }}</td>
                    <td>{{ cliente.email }}</td>
                    <td>
                        <button class="btn btn-warning">Editar</button>
                    </td>
                    <td>
                        <button class="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'TablaClientes',
    data() {
        return {
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
    }
}
</script>

<style></style>