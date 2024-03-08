<template>
    <div>
        <NavBar />
    </div>
    <div class="row">
        <h3 class="text-center font-weight-bold">Contacto</h3>
    </div>
    <hr>
    <div class="container-fluid">
        <div class="row" id="map_section">
            <div class="col-12 col-m-6 col-lg-8 mx-auto">
                <form class="form-inline">
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Nombre:</span>
                        <input v-model="nombre" type="text" class="form-control form-control-sm" id="nombre" name="nombre"
                            required placeholder="Campo requerido (*)">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Asunto:</span>
                        <input v-model="asunto" type="text" class="form-control" id="asunto" name="asunto" maxlength="64" required placeholder="Campo requerido (*)">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text  custom-span" style="margin-right: 20px;">Departamento:</span>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="ventas" v-model="departamento"
                                value="ventas">
                            <label class="form-check-label" for="ventas">Ventas</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="marketing" v-model="departamento"
                                value="marketing">
                            <label class="form-check-label" for="marketing">Marketing</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="recursos_humanos" v-model="departamento"
                                value="Recursos Humanos">
                            <label class="form-check-label" for="recursos_humanos">Recursos Humanos</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="contabilidad" v-model="departamento"
                                value="contabilidad">
                            <label class="form-check-label" for="contabilidad">Contabilidad</label>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text custom-span">Mensaje: </span>
                        <textarea v-model="mensaje" class="form-control" name="mensaje" id="mensaje"
                            placeholder="Campo requerido (*). Máximo 256 caracteres" maxlength="256" required></textarea>
                    </div>
                    <div class="text-center">
                        <button type="button" class="btn btn-primary m-2" @click="enviarMensaje">Enviar</button>
                        <button type="button" class="btn btn-ligth m-2" @click="limpiarCampos">Limpiar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
import NavBar from '@/components/NavBar.vue';
import Swal from 'sweetalert2';
import "flatpickr/dist/flatpickr.min.css";

export default {
    name: 'TablaContactos',
    components: {
        NavBar,
    },
    data() {
        return {
            nombre: '',
            asunto: '',
            departamento: [],
            mensaje: '',
        };
    },
    methods: {
        async enviarMensaje() {
            try {
                if (!this.comprobarCampos()) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Campos vacíos',
                        text: 'Rellena todos los campos obligatorios',
                    });
                } else {
                    console.log(this.nombre, this.asunto, this.departamento, this.mensaje)
                    // crea un objeto FormData para enviar los datos de la tarea y el archivo al servidor
                    const formData = new FormData();
                    formData.append('nombre', this.nombre);
                    formData.append('asunto', this.asunto)
                    this.departamento.forEach(departamento => {
                        formData.append('departamento', departamento)
                    });
                    formData.append('mensaje', this.mensaje);
                    
                    /*const formData = {
                        nombre: this.nombre,
                        departamento: this.departamento,
                        mensaje: this.mensaje,
                    }*/
                    console.log(formData);
                    
                    const res = await fetch('http://localhost:5000/mensajes', {
                        method: 'POST',
                        body: formData
                    });

                    await Swal.fire({
                        icon: 'success',
                        title: 'Mensaje enviado!',
                        text: 'El mensaje ha sido enviado con éxito.'
                    });

                    if (!res.ok) {
                        const message = `Ha ocurrido un error: ${res.status}`;
                        throw new Error(message);
                    }

                    this.limpiarMensaje();
                }
            }
            catch (error) {
                console.log("Error al enviar el mensaje:", error)
                // Manejo de errores
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo enviar el mensaje.'
                })
            }
        },
        limpiarCampos() {
            // limpiar los campos del formulario
            this.nombre = '';
            this.asunto = '';
            this.departamento = [];
            this.mensaje = '';

            // Mostrar mensaje de éxito con SweetAlert
            Swal.fire({
                icon: 'info',
                title: 'Campos limpiados',
                text: 'Los campos del formulario se han limpiado correctamente',
            });
        },
        limpiarMensaje() {
            this.nombre = '';
            this.asunto = '';
            this.departamento = [];
            this.mensaje = '';
        },
        comprobarCampos() {
            if (this.nombre != '' && this.asunto != '' && this.mensaje != '' && this.departamento.length > 0) {
                return true
            } else {
                return false
            }
        }
    },
}
</script>


<style></style>