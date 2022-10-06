<template>
  <v-app>
    <LoginNavBar />
    <v-main class="content align-center">
      <v-row class="justify-center">
        <v-col cols="5">
          <v-card class="rounded-xl centerCard pa-12">
            <h1 class="onGrey text-center">Login</h1>
            <p class="text-center">
              New to Step?
              <span class="signUp">Sign up for free</span>
            </p>
            <v-row class="justify-center">
              <v-col cols="8">
                <v-text-field
                  outlined
                  class="input"
                  label="Email"
                ></v-text-field>
                <v-text-field outlined class="input" label="Password"
                  ><v-icon>mdi-eye</v-icon
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="justify-center">
              <v-col cols="8">
                <a class="link">Forgot your password?</a>
              </v-col>
            </v-row>
            <v-row class="justify-center">
              <v-btn rounded large class="button"> Log in </v-btn>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
    <FooterBar/>
  </v-app>
</template>

  <!-- Ojo con el important-->
  <style>
.input {
  padding-top: 30px;
}

.link {
  text-decoration: underline;
  font-size: 16px;
}

.signUp {
  color: #33d657;
  text-decoration: underline;
}

.onGrey {
  color: #5a6175;
  font-size: 40px;
}

.content {
  background: url(../assets/fondo.png);
  background-size: cover;
}

.centerCard {
  padding: 5%;
}

.button {
  display: flex;
  background: #1b56ed !important;
  color: white !important;
  font-weight: bold;
  margin-top: 20px;
  max-width: 600px;
  width: 80%;
}

p {
  font-size: 15px;
  color: #5a6175;
}
</style>

  <script>
import LoginNavBar from "../components/LoginNavBar.vue";
import FooterBar from "../components/FooterBar.vue";

export default {
  name: "App",
  data: () => ({}),

  components: {
    LoginNavBar,
    FooterBar,
  },
};
</script>
