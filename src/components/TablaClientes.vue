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
                                type="text" class="form-control form-control-sm" id="dni" name="dni"></div>
                        <div class="input-group mb-3"><span class="input-group-text custom-span">Nombre:</span><input
                                type="text" class="form-control" id="nombre" name="nombre"></div>
                        <div class="input-group mb-3"><span class="input-group-text custom-span">Apellido:</span><input
                                type="text" class="form-control" id="apellido" name="apellido"></div>
                        <div class="input-group mb-3"><span class="input-group-text custom-span">Email:</span><input
                                type="text" class="form-control" id="email" name="email"></div>
                        <div class="text-center"><button type="button" class="btn btn-primary m-2">Guardar</button><button
                                type="button" class="btn btn-secondary">Limpiar</button></div>
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