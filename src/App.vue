<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Feliz 2024"/>
  <PrimerasPruebas mensaje="Primeras pruebas"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import PrimerasPruebas from './components/PrimerasPruebas.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    PrimerasPruebas
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
