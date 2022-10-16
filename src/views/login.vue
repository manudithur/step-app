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
              <router-link to="/signup">
                <span class="signUp">Sign up for free</span>
              </router-link>  
            </p>
            <p class="red--text text-center">{{errorMsg}}</p>
            <v-row class="justify-center">
              <v-col cols="8">
                <v-text-field
                  outlined
                  class="input"
                  label="Username"
                  v-model="username"
                >{{username}}</v-text-field>
                <v-text-field
                    outlined class="input"
                    label="Password"
                    type="password"
                    v-model="password"
                  >{{password}}<v-icon>mdi-eye</v-icon
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="justify-center">
              <v-col cols="8">
                <a class="link">Forgot your password?</a>
              </v-col>
            </v-row>
            <v-row class="justify-center">
              <v-btn rounded
                    large
                    class="button"
              @click="login()"> Log in </v-btn>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
    <FooterBar/>
  </v-app>
</template>

  <!-- Ojo con el important-->
<style scoped>
.input {
  padding-top: 5px;
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
import { mapState, mapActions } from "pinia";
import LoginNavBar from "../components/LoginNavBar.vue";
import FooterBar from "../components/FooterBar.vue";
import { useSecurityStore } from "../stores/SecurityStore";
import { Credentials } from "../api/user";
import router from '@/router';

export default {
  name: "App",
  data: () => ({
    result:null,
    username:'',
    password:'',
    errorMsg: ' '
  }),

  components: {
    LoginNavBar,
    FooterBar,
  },

  async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();
    if(securityStore.isLoggedIn){
      router.push('/home')
    }
  },

  computed:{
    ...mapState(useSecurityStore, {
      $user: state => state.user,
    }),
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn'
    }),
    error(){
      return this.errorMsg
    }
  },

  methods:{
    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
      $login: 'login',
      $logout: 'logout'
    }),

    setResult(result){
      this.result = JSON.stringify(result, null, 2)
      this.errorMsg = this.result.description
    },

    clearResult() {
      this.result = null
    },

    async logout() {
      await this.$logout()
      this.clearResult()
    },

    async getCurrentUser() {
      await this.$getCurrentUser()
      this.setResult(this.$user)
    },

    async login() {
      try {
        const credentials = new Credentials(this.username, this.password)
        await this.$login(credentials, true)
        this.clearResult()
      } catch (e) {
        this.setResult(e)
        this.errorMsg = "Username/Password invalid"
        console.log(this.result)
      } finally{
        if(this.result == null)
          router.push('/home')
      }
    }
  },
};
</script>
