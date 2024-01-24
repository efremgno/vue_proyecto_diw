<template>
    <div>
        <NavBar/>
    </div>
    <div>
        <h1 class="text-center">Página proyecto del {{ alumno_a }}</h1>
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
            alumno_a: 'nombre del alumno/a'
        }
    },
    mounted() {
        console.log('Componente PaginaInicio.vue cargado')
    }
}
</script>


<style>

</style>