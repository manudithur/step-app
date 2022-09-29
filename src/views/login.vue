<template>
    <v-app>
      <LoginNavBar/>
      <v-main class="content">
        <v-card fluid class=" rounded-xl centerCard">
          <h1 class="onGrey text-center">Login</h1>
          <p class="text-center">New to Step?
            <span class="signUp">Sign up for free</span>
          </p>
          <v-row class="justify-center">
            <v-col cols="4">
              <v-text-field label="Email"/>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="4">
              <v-text-field label="Password"/>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="4">
              <p class="text-left forgotPass">Forgot your password?</p>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-btn
                rounded
                large
                class="button">
              Log in
            </v-btn>
          </v-row>

        </v-card>
      </v-main>

      <FooterBar/>
    </v-app>
  </template>

  <!-- Ojo con el important-->
  <style>

    .signUp{
      color: #33d657;
      text-decoration: underline;

    }

    .forgotPass{
      color: #1B56ED;
      text-decoration: underline;
    }

    .onGrey{
      color:#5a6175;
    }

    .content {
      background: url(../assets/fondo.png);
      background-size: cover;
    }

    .centerCard {
      margin: 5% 15%;
      padding: 5%;
    }

    .button{
      display: flex;
      background:#1B56ED !important;
      color: white !important;
      font-weight:bold;
      margin-top: 20px;
      width: 80%;
    }

    p {
      font-size: 15px;
      color: #5a6175;
    }

  </style>

  <script>
  import LoginNavBar from '../components/LoginNavBar.vue';
  import FooterBar from '../components/FooterBar.vue';

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
