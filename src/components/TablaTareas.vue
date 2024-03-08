<template>
    <div>
        <!-- Barra de navegación -->
        <NavBar />
    </div>
    <div class="row">
        <h3 class="text-center font-weight-bold">Gestión Tareas</h3>
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
                        <input ref="fechaAlta" v-model="fecha" type="text" class="form-control" id="fecha" name="fecha">
                        <button @click="abrirCalendario" class="btn btn-outline-secondary" type="button">
                            <i class="bi bi-calendar"></i>
                        </button>
                    </div>
                    <div class="input-group mb-3 w-25">
                        <label class="input-group-text custom-span" for="salaSelect">Sala:
                        </label>
                        <select class="form-select" v-model="sala" id="salaSelect">
                            <option value="Sala 1">Sala 1</option>
                            <option value="Sala 2">Sala 2</option>
                            <option value="Sala 3">Sala 3</option>
                        </select>
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
                        <textarea v-model="observaciones" class="form-control" name="observaciones" id="observaciones"
                            placeholder="Observaciones tarea (max 256 caracteres)" maxlength="256"></textarea>
                    </div>
                    <!-- Input para el archivo -->
                    <div class="custom-file">
                        <div class="input-group mb-3 w-50">
                            <input type="file" placeholder="Selecciona un archivo" class="custom-file-input-control"
                                id="archivo" name="archivo" accept=".pdf, .jpg, .jpeg" @change="handleFileChange"
                                ref="fileInput">
                        </div>
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
                            <th>Sala Reunión</th>
                            <th>Equipamiento</th>
                            <th>Prioridad</th>
                            <th>Gestión</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="tarea in tareas" :key="tarea.id">
                            <td class="text-center">{{ tarea._id }}</td>
                            <td>{{ tarea.nombre }}</td>
                            <td>{{ tarea.descripcion }}</td>
                            <td class="text-center">{{ tarea.fecha }}</td>
                            <td class="text-center">{{ tarea.sala }}</td>
                            <td class="text">{{ tarea.equipos.join(', ') }}</td>
                            <td class="text-center">{{ tarea.prioridad }}</td>
                            <td class="text-center">
                                <div>
                                    <button class="btn btn-warning m-2" @click="cargarTarea(tarea)"><i
                                            class="bi bi-pencil-square"></i></button>
                                    <!--  <button type="button" class="m-2 btn btn-info" @click="mostrarInfo(tarea._id)">
                                        <i class="bi bi-eye-fill"></i>
                                    </button>-->
                                    <button class="btn btn-danger m-2" @click="eliminarTarea(tarea._id)"><i
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
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
//import { format } from "date-fns";

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
            archivo: null,
            show: false
        };
    },
    created() {
        this.obtenerTareas();
    },
    mounted() {
        const fechaAlta = this.$refs.fechaAlta;
        flatpickr(fechaAlta, {});
    },
    methods: {
        abrirCalendario() {
            const fechaAlta = this.$refs.fechaAlta;
            if (fechaAlta._flatpickr) {
                fechaAlta._flatpickr.open();
            }
        },
        handleFileChange(event) {
            this.archivo = event.target.files[0];
            console.log(this.archivo);
        },
        async guardarTarea() {
            try {
                console.log(this.nombre, this.descripcion, this.fecha, this.sala, this.prioridad)
                // crea un objeto FormData para enviar los datos de la tarea y el archivo al servidor
                const formData = new FormData();
                formData.append('nombre', this.nombre);
                formData.append('descripcion', this.descripcion)
                formData.append('fecha', this.fecha);
                formData.append('sala', this.sala);
                this.equipos.forEach(equipo => {
                    formData.append('equipos', equipo)
                });
                formData.append('prioridad', this.prioridad);
                formData.append('observaciones', this.observaciones);
                formData.append('archivo', this.archivo);
                console.log(this.observaciones);
                console.log(formData);
                /*const nuevaTarea = {
                    nombre: this.nombre,
                    descripcion: this.descripcion,
                    fecha: format(new Date(this.fecha), 'dd-MM-yyyy'),
                    sala: this.sala,
                    equipos: this.equipos,
                    prioridad: this.prioridad,
                    observaciones: this.observaciones,
                };*/

                // Verificar si la prioridad está entre los valores permitidos
                if (['alta', 'media', 'baja'].includes(this.prioridad)) {
                    const res = await fetch('http://localhost:5000/tareas', {
                        method: 'POST',
                        /*
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(nuevaTarea)
                        */
                        body: formData

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
                    if (!res.ok) {
                        throw new Error(`An error has occurred: ${res.status}`);
                    }
                    // Actualizar la lista de tareas después de guardar la nueva tarea
                    await this.obtenerTareas();

                    this.tareaSeleccionada = null;
                    await Swal.fire({
                        icon: 'success',
                        title: '¡Tarea guardada!',
                        text: 'La nueva tarea se ha guardado correctamente.'
                    });
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
        async eliminarTarea(id) {
            try {
                const res = await fetch(`http://localhost:5000/tareas/${id}`, {
                    method: "DELETE",
                });

                if (!res.ok) {
                    const message = `An error has occured: ${res.status}`;
                    throw new Error(message);
                }

                await Swal.fire({
                    icon: "success",
                    title: "¡Tarea eliminada!",
                    text: "La nueva tarea se ha eliminado correctamente.",
                });

                await this.obtenerTareas();
            } catch (error) {
                console.error(error);
                await Swal.fire({
                    icon: "error",
                    title: "Error al eliminar la tarea",
                    text: "Ha ocurrido un error al intentar eliminar la tarea. Por favor, inténtalo de nuevo.",
                });
            }
        },
        async obtenerTareas() {
            try {
                const res = await fetch('http://localhost:5000/tareas')
                if (!res.ok) {
                    const message = `An error has occured: ${res.status}`
                    throw new Error(message)
                }
                this.tareas = await res.json()
            } catch (error) {
                console.error(error)
            }
        },
        cargarTarea(tarea) {
            this.id = tarea._id;
            this.nombre = tarea.nombre;
            this.descripcion = tarea.descripcion;
            this.fecha = tarea.fecha;
            this.sala = tarea.sala;
            this.equipos = tarea.equipos;
            this.prioridad = tarea.prioridad;
            this.observaciones = tarea.observaciones;
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
            this.archivo = null;
            this.$refs.fileInput.value = null;

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
            this.$refs.fileInput.value = null;
        },/*
        mostrarInfo(id) {
            const tarea = this.tareas.find((t) => t._id === id);
            if (tarea) {
                if (tarea.observaciones && tarea.observaciones.trim() !== "") {
                    this.mostrarAlerta(
                        `Información de la tarea: ${tarea.observaciones}`,
                        "info"
                    );
                } else {
                    this.mostrarAlerta("No tiene observaciones", "error");
                }
            } else {
                this.mostrarAlerta("No se encontró la tarea", "error");
            }
        },*/
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
h3 {
        padding-top: 30px;
    }
</style>