<template>
      <v-row class="justify-center ma-10">
        <v-col>
          <v-card class="rounded-xl centerCard pa-12">
            <h1 class="onGrey text-center pb-5">Create Exercise</h1>
            <v-row class="justify-center py-5">
              <v-col cols="8">
                <v-text-field
                    outlined
                    class="input"
                    label="Exercise Name"
                    v-model="name"
                >{{name}}</v-text-field>
              </v-col>
            </v-row>
            <v-row class="justify-center">
              <v-btn rounded large class="button"
                     @click="createExercise"> Add </v-btn>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
</template>

<!-- Ojo con el important-->
<style scoped>

.button{
  color:#1B56ED !important;
  font-weight:bold;

}

.addButton{
  background: #55B8FF !important;
  color: white !important;

}

.cycleButton {
  background: #55B8FF !important;
  color: white !important;
  max-width: 600px;
  margin: 15px 25px;
  padding: 15px;
}

.banner-text {
  font-size: 65px;
}

p {
  font-size: 15px;
}

</style>

<script>
import { mapState, mapActions } from "pinia";
import {Exercise} from "../api/exercise"
import { useExerciseStore } from "../stores/exerciseStore";
import { useSecurityStore } from "@/stores/SecurityStore";




export default {
  name: 'App',
  data() {
    return {
      name:""
    }
  },

  async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();
  },


  methods: {
    ...mapActions(useExerciseStore,{
      $createExercise: 'create'
    }),

    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
      $login: 'login',
      $logout: 'logout',
    }),

    async createExercise(){
      const exercise = new Exercise(this.name, this.name, "exercise",null);
        this.exercise = await this.$createExercise(exercise);
    }

  },

  computed: {
    ...mapState(useSecurityStore, {
      $user: state => state.user,
    }),
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn'
    }),
  },


};
</script>