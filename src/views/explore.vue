<template>
  <v-app>
    <LoginNavBar/>
    <v-main class="content">
      <v-container fluid class="pb-10 pt-5">
        <v-text-field
            filled
            rounded
            dense
            solo
            single-line
            background-color="white"
            prepend-inner-icon="mdi-magnify"
            class="input"
            label="search"
        ></v-text-field>
        <h3 class="white--text ml-6">44 Results</h3>
      </v-container>


    </v-main>
    <FooterBar/>
  </v-app>
</template>

<!-- Ojo con el important-->
<style>

.button{
  color:#1B56ED !important;
  font-weight:bold;
}

.content {
  background: url(../assets/fondo.png);
  background-size: cover;
}

.banner-text {
  font-size: 50px;
}
.title-workout {
  font-size: 38px;
}

p {
  font-size: 17px;
}

</style>

<script>
import LoginNavBar from '../components/LoginNavBar.vue';
import FooterBar from '../components/FooterBar.vue';

export default {
  name: 'App',
  data: () => ({
    value:50
  }),

  components: {
    LoginNavBar,
    FooterBar
  }

};
</script>