<template>
    <div>
        <NavBar />
    </div>
    <br>
    <div>
        <h1 class="text-center">Página proyecto de {{ alumno_a }}</h1>
        <div class="container text-center mt-5">
            <div class="row mx-auto">
                <div class="col">
                    <router-link to="/clientes" class="navbar-brand">
                        <button type="button" class="btn btn-primary btn-lg m-3 p-5 w-25">
                            Gestión Cliente
                        </button></router-link>
                    <router-link to="/tareas" class="navbar-brand">
                        <button type="button" class="btn btn-primary btn-lg m-3 p-5 w-25">
                            Gestión Tareas
                        </button>
                    </router-link>
                </div>
            </div>
            <div class="row mx-auto">
                <div class="col">
                    <router-link to="/articulos" class="navbar-brand">
                        <button type="button" class="btn btn-primary btn-lg m-3 p-5 w-25">
                            Gestión Artículos
                        </button>
                    </router-link>
                    <button type="button" class="btn btn-primary btn-lg m-3 p-5 w-25">Gestión ventas</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import NavBar from '../components/NavBar.vue';
export default {
    name: 'PaginaInicio',
    componentes: {
        NavBar
    },
    data() {
        return {
            alumno_a: 'Efrem'
        }
    },
    mounted() {
        console.log('Componente PaginaInicio.vue cargado')
    }
}
</script>


<style></style>