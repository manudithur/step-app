
<!--
                    IMPORTANTE ANTES DE PUSHEAR, 
armar un archivo en ./views con el codigo de la pag que estan armando
-->

<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<!-- Ojo con el important-->
<style>
  .content {
    background: url(./assets/fondo.png);
    background-size: cover;
  }
</style>

<script>

export default {
  name: 'App',
  data: () => ({
  
  }),

};

</script>
