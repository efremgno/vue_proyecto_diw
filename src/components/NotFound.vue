<template>
    <div class="row">
        <img src="../assets/notFound.jpg" alt="Not found">
        <div class="col-md-12 text-center">
            <router-link class="btn btn-light-green" :to="{ name: 'home' }">Volver a Inicio</router-link>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
img {
    max-width: 80% !important;
    margin: auto;
}
</style>