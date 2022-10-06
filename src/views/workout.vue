<template>
  <v-app>
    <LoginNavBar />
    <v-main class="content mt-10">
      <v-row class="ml-10 pt-5 white--text">
        <h1 class="ml-10">Chest Pump</h1>
      </v-row>
      <v-row class="justify-center pa-8">
        <v-col cols="6" class="text-center">
          <v-progress-circular
            value="60"
            rotate="-90"
            width="30"
            class="primary--text"
            size="600"
          >
            <v-card class="white rounded-circle">
                <h1>hola</h1>

            </v-card>
        </v-progress-circular>
        </v-col>
        <v-col cols="6">
          <v-card class="white text-center">
            <h1>chau</h1>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
    <FooterBar />
  </v-app>
</template>
  
  <!-- Ojo con el important-->
<style scoped>
.content {
  background: url(../assets/fondo.png);
  background-size: cover;
}

.centerCard {
  padding: 5%;
}
</style>
  
<script>
import LoginNavBar from "../components/LoginNavBar.vue";
import FooterBar from "../components/FooterBar.vue";

export default {
  name: "App",
  data: () => ({
    workout: { name: "Chest Pump", list: [{}, {}, {}] },
  }),

  components: {
    LoginNavBar,
    FooterBar,
  },
};
</script>
  