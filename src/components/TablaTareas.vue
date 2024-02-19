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
                        <span class="input-group-text  custom-span" style="margin-right: 20px;">Equipamiento:</span>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="equipoVideoconferencia" v-model="equipos"
                                value="Equipo Videoconferencia">
                            <label class="form-check-label" for="equipoVideoconferencia">Equipo Videoconferencia</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="televisor" v-model="equipos"
                                value="Televisor">
                            <label class="form-check-label" for="televisor">Televisor</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="pizarraDigital" v-model="equipos"
                                value="Pizarra Digital">
                            <label class="form-check-label" for="televisor">Pizarra Digital</label>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span" style="margin-right: 10px;">Prioridad:</span>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="prioridadAlta" value="alta"
                                v-model="prioridad">
                            <label class="form-check-label" for="prioridadAlta">Alta</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="prioridadMedia" value="media"
                                v-model="prioridad">
                            <label class="form-check-label" for="prioridadMedia">Media</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="prioridadBaja" value="baja"
                                v-model="prioridad">
                            <label class="form-check-label" for="prioridadBaja">Baja</label>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Observaciones: </span>
                        <textarea v-model="observaciones" class="form-control" name="descripcion" id="descripcion" placeholder="Descripción Tarea (max 256 caracteres)" maxlength="256"></textarea>
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
                            <td class="text-center">{{ tarea.sala }}</td>
                            <td class="text">{{ tarea.equipos.join(', ') }}</td>
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
import Swal from 'sweetalert2';
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
            sala: '',
            equipos: [],
            prioridad: 'alta',
            tareas: [],
            observaciones: '',
            show: false
        };
    },
    created() {
        this.obtenerTareas();
    },
    methods: {
        async guardarTarea() {
            try {
                console.log(this.nombre, this.descripcion, this.fecha, this.sala, this.prioridad)
                const nuevaTarea = {
                    nombre: this.nombre,
                    descripcion: this.descripcion,
                    fecha: format(new Date(this.fecha), 'dd-MM-yyyy'),
                    sala: this.sala,
                    equipos: this.equipos,
                    prioridad: this.prioridad,
                    observaciones: this.observaciones,
                };

                // Verificar si la prioridad está entre los valores permitidos
                if (['alta', 'media', 'baja'].includes(nuevaTarea.prioridad)) {
                    const res = await fetch('http://localhost:5000/tareas', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(nuevaTarea)

                    });

                    await Swal.fire({
                        icon: 'success',
                        title: '¡Tarea guardada!',
                        text: 'La nueva tarea se ha guardado correctamente.'
                    });

                    if (!res.ok) {
                        const message = `Ha ocurrido un error: ${res.status}`;
                        throw new Error(message);
                    }

                    // Actualizar la lista de tareas después de guardar la nueva tarea
                    await this.obtenerTareas();
                }
                // Limpiar los campos del formulario después de guardar la tarea
                this.limpiarTarea();
            }
            catch (error) {
                console.log("Error al guardar la tarea:", error)
                // Manejo de errores
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo guardar la tarea.'
                })
            }
        },
        async modificarTarea() {
            try {
                // Obtener la tarea seleccionada
                const tarea = this.tareaSeleccionada;

                // Actualizar los campos de la tarea seleccionada con los nuevos valores del formulario
                tarea.nombre = this.nombre;
                tarea.descripcion = this.descripcion;
                tarea.fecha = this.fecha;
                tarea.sala = this.sala;
                tarea.equipos = this.equipos;
                tarea.prioridad = this.prioridad;
                tarea.observaciones = this.observaciones;

                // Verificar si la prioridad está entre los valores permitidos
                if (['alta', 'media', 'baja'].includes(tarea.prioridad)) {

                    // Envíar la solicitud PUT con la tarea actualizada al servidor
                    const res = await fetch(`http://localhost:5000/tareas/${tarea._id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(tarea)
                    });

                    await Swal.fire({
                        icon: 'success',
                        title: '¡Tarea guardada!',
                        text: 'La nueva tarea se ha guardado correctamente.'
                    });

                    if (!res.ok) {
                        const message = `Ha ocurrido un error: ${res.status}`;
                        throw new Error(message);
                    }

                    // Actualizar la lista de tareas después de guardar la nueva tarea
                    await this.obtenerTarea();
                }
                // Limpiar los campos del formulario después de guardar la tarea
                this.limpiarTarea();
            }
            catch (error) {
                console.log("Error al guatdar la tarea:", error)
                // Manejo de errores
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo guardar la tarea.'
                })
            }
        },
        cargarTarea(tarea) {
            this.nombre = tarea.nombre;
            this.descripcion = tarea.descripcion;
            this.fecha = tarea.fecha;
            this.sala = tarea.sala;
            this.equipos = tarea.equipos;
            this.prioridad = tarea.prioridad;
            this.tareaSeleccionada = tarea;
        },
        limpiarCampos() {
            // limpiar los campos del formulario
            this.nombre = '';
            this.descripcion = '';
            this.fecha = '';
            this.sala = null;
            this.equipos = [];
            this.prioridad = '';
            this.observaciones = '';

            // Mostrar mensaje de éxito con SweetAlert
            Swal.fire({
                icon: 'info',
                title: 'Campos limpiados',
                text: 'Los campos del formulario se han limpiado correctamente',
            });
        },
        limpiarTarea() {
            this.nombre = '';
            this.descripcion = '';
            this.fecha = '';
            this.sala = '';
            this.equipos = [];
            this.prioridad = '';
            this.observaciones = '';
        },
    },
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