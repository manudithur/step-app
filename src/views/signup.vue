<template>
  <v-app>
    <LoginNavBar />
    <v-main class="content align-center">
      <v-row class="justify-center">
        <v-col cols="5">
          <v-card class="rounded-xl centerCard pa-12">
            <h1 class="onGrey text-center mb-8">Sign Up</h1>
            <v-row class="justify-center">
              <v-col cols="8">
                <v-text-field
                    outlined
                    class="input"
                    label="username"
                    v-model="username"
                >{{username}}
                </v-text-field>
                <v-text-field
                    outlined
                    class="input"
                    label="Email"
                    v-model="email"
                >{{email}}</v-text-field>
                <v-text-field
                    outlined class="input"
                    label="Password"
                    v-model="password"
                >{{password}}<v-icon>mdi-eye</v-icon
                ></v-text-field>
                <v-text-field
                    outlined
                    class="input"
                    label="Repeat Password"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="justify-center">
              <v-btn rounded
                     large
                     class="button"
              @click="addUser()"
              > Sign Up </v-btn>
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
  padding-top: 30px;
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
import { mapState, mapActions } from "pinia";
import { useSecurityStore } from "../stores/SecurityStore";
import {User} from "@/api/user";



export default {
  name: "App",
  data: () => ({
    username:'',
    email:'',
    password:''
  }),

  components: {
    LoginNavBar,
    FooterBar,
  },

  async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();
  },

  computed:{
    ...mapState(useSecurityStore, {
      $user: state => state.user,
    }),
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn'
    })
  },

  methods: {
    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
      $login: 'login',
      $logout: 'logout',
      $addUser: 'addUser'
    }),

    setResult(result) {
      this.result = JSON.stringify(result, null, 2)
    },

    async addUser(){
        const user = await new User(this.username, this.email, this.password)
      try{
        await this.$addUser(user)
      }
      catch(e){
          console.log(e);
      }
    },

    async logout() {
      await this.$logout()
      this.clearResult()
    },

    clearResult() {
      this.result = null
    },


    async getCurrentUser() {
      await this.$getCurrentUser()
      this.setResult(this.$user)
    }
  }
};
</script>
