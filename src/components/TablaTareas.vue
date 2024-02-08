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
                        <span class="input-group-text custom-span">Nombre:</span>
                        <input v-model="nombre" type="text" class="form-control form-control-sm" id="nombre" name="nombre">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Descripción:</span>
                        <input v-model="descripcion" type="text" class="form-control" id="descripcion" name="descripcion">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Fecha:</span>
                        <input v-model="fecha" type="text" class="form-control" id="fecha" name="fecha">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Prioridad</span>
                        <input v-model="prioridad" type="text" class="form-control" id="prioridad" name="prioridad">
                    </div>
                    <div class="text-center">
                        <button type="button" class="btn btn-primary m-2" @click="guardarTarea">Guardar</button>
                        <button type="button" class="btn btn-secondary" @click="modificarTarea">Modificar</button>
                        <button type="button" class="btn btn-ligth m-2" @click="limpiarCampos">Limpiar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <hr /> <!-- Tabla de datos -->
    <div class="row justify-content-center mt-4">
        <div class="col-md-8 bg-light">
            <div class="row justify-content-center text-primary p-2">
                <h5 class="text-center font-weight-bold">Listado Tareas</h5>
            </div>
            <div class="table-responsive">
                <table class="table table-striped table-bordered">
                    <thead class="table-info">
                        <tr class="text-center">
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Fecha Alta</th>
                            <th>Prioridad</th>
                            <th>Gestión</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="tarea in tareas" :key="tarea.id">
                            <td class="text-center">{{ tarea.id }}</td>
                            <td>{{ tarea.nombre }}</td>
                            <td>{{ tarea.descripcion }}</td>
                            <td class="text-center">{{ tarea.fecha }}</td>
                            <td class="text-center">{{ tarea.prioridad }}</td>
                            <td class="text-center">
                                <div>
                                    <button class="btn btn-warning m-2" @click="modificarTarea(tarea.id)"><i
                                            class="bi bi-pencil-square"></i></button>
                                    <button class="btn btn-danger m-2" @click="eliminarTarea(tarea.id)"><i
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
import NavBar from '@/components/NavBar.vue';
//import Swal from 'sweetalert2';
export default {
    name: 'TablaTareas',
    components: {
        NavBar,
    },
    data() {
        return {
            nombre: '',
            descripcion: '',
            fecha: '',
            prioridad: '',
            tareas: [],
        };
    }
};
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