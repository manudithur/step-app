<template>
  <v-app>
    <NavBar />
    <v-main class="content align-center">
      <v-row class="justify-center">
        <v-col cols="5">
          <v-card class="rounded-xl centerCard pa-12">
            <h1 class="onGrey text-center mb-8 align-center">Your Profile</h1>
            <v-row class="justify-center">
              <v-col cols="8">
                <v-text-field
                  outlined
                  :disabled="edit == 0"
                  class="input"
                  label="Username"
                  v-model="username"
                  >{{ username }}
                </v-text-field>
                <v-text-field
                  outlined
                  :disabled="edit == 0"
                  class="input"
                  label="Email"
                  v-model="email"
                  >{{ email }}</v-text-field
                >
              </v-col>
            </v-row>
            <v-row class="justify-center">
              <v-btn rounded large class="button" v-if="edit==0" @click="editEvent()">
                Edit
                <v-icon class="ml-1 white--text" size="20">mdi-pencil</v-icon>
              </v-btn>
              <v-btn rounded large class="button" v-if="edit==1" @click="editEvent()">
                Save Changes
                <v-icon class="ml-1 white--text" size="20">mdi-check</v-icon>
              </v-btn>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
    <FooterBar />
  </v-app>
</template>
  
  <!-- Ojo con el important-->
  <style scoped>
.button {
  display: flex;
  background: #1b56ed !important;
  color: white !important;
  font-weight: bold;
  margin-top: 20px;
  max-width: 600px;
  width: 50%;
}

.content {
  background: url(../assets/fondo.png);
  background-size: cover;
}

p {
  font-size: 17px;
}
</style>
  
  <script>
import { mapState, mapActions } from "pinia";
import NavBar from "../components/NavBar.vue";
import FooterBar from "../components/FooterBar.vue";
import { useSecurityStore } from "../stores/SecurityStore";

export default {
  name: "App",
  data: () => ({
    edit: 0,
    username: null,
    email: null,
  }),

  async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();
  },

  mounted(){
    this.loadData();
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

  components: {
    NavBar,
    FooterBar,
  },

  methods: {
    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
    }),

    editEvent: function(){
        if(this.edit == 0)
            this.edit = 1;
        else    
            this.edit = 0;
    },

    async loadData(){
        //agarrar data del user
    }

  }
};
</script>