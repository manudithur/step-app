
<!--
                    IMPORTANTE ANTES DE PUSHEAR, 
armar un archivo en ./views con el codigo de la pag que estan armando
-->

<template>
  <v-app>
    <!--Ahora armo el nav bar post login-->
    <LoginNavBar/>
    <v-main class="content">
      <v-container fluid class="pb-10">
        <!--Aca va el content/body-->
      </v-container>
    </v-main>
    <FooterBar/>
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
import LoginNavBar from './components/LoginNavBar.vue';
import FooterBar from './components/FooterBar.vue';

export default {
  name: 'App',
  data: () => ({
  
  }),

  components: {
    LoginNavBar,
    FooterBar
}

};
</script>
