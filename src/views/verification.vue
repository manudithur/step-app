<template>
  <v-app>
    <LoginNavBar />
    <v-main class="content align-center">
      <v-row class="justify-center">
        <v-col cols="5">
          <v-card class="rounded-xl centerCard pa-12">
            <h1 class="onGrey text-center mb-8">Verify Email</h1>
            <p class="text-center">A code was sent to your account
              <br>Enter your email and the code you received</p>
            <p class="red--text text-center">{{error}}</p>
            <v-row class="justify-center">
              <v-text-field
                  outlined
                  class="input"
                  label="email"
                  v-model="email"
              >{{email}}</v-text-field>
            </v-row>
            <v-row class="justify-center">
              <v-col cols="8">
                <v-otp-input
                    length="6"
                    v-model="code"
                >{{code}}</v-otp-input>
              </v-col>
            </v-row>
            <v-row class="justify-center">
              <v-btn rounded large class="button"
              @click="verify">Verify</v-btn>
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
import {VerificationData} from "@/api/user";
import router from '@/router';


export default {
  name: "App",
  data: () => ({
    code:'',
    email:'',
    error: ' '
  }),

  components: {
    LoginNavBar,
    FooterBar,
  },

  async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();
    if(securityStore.isLoggedIn){
      router.push('/login')
    }
  },

  computed:{
    ...mapState(useSecurityStore, {
      $user: state => state.user,
    }),
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn'
    })
  },

  methods:{
    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
      $login: 'login',
      $logout: 'logout',
      $verify: 'verify'
    }),
    
    async verify(){
      this.error = ' '
      const verificationData = new VerificationData(this.email, this.code)
      try{
        await this.$verify(verificationData)
      } catch(e){
        this.error = "Invalid code or email"
      } finally{
        if(this.error == ' ')
          router.push('/login')
      }
    }
  }
};
</script>
