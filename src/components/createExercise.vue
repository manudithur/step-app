<template>
        <div>
          <v-card class="rounded-xl centerCard pa-8">
            <v-row class="justify-center text-center py-5">
              <h2 v-if="success" class="green--text">SUCCESFULLY ADDED!</h2>
              <v-col cols="10">
                <v-row class="justify-center ma-0">
                  <v-col cols="3">
                    <h2 class="pt-2">Exercise Name</h2>
                  </v-col>
                  <v-col cols="8">
                  <v-text-field
                    solo
                    rounded
                    single-line
                    dark
                    background-color="#55B8FF"
                    class="input ml-5"
                    v-model="name"
                >{{name}}</v-text-field>
                </v-col>
                </v-row>
                <v-row class="justify-center">
                  <v-col cols="3">
                    <h2 class="pt-2">Image URL</h2>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      solo
                      rounded
                      single-line
                      dark
                      background-color="#55B8FF"
                      class="input ml-5 mr-3"
                      append-icon="mdi-link"
                      v-model="imageUrl"
                  >{{imageUrl}}</v-text-field>
                </v-col>
                </v-row>
                <p v-if="errorFlag" class="red--text">{{errorMsg}}</p>
              </v-col>
            </v-row>
          </v-card>
          <v-row class="justify-center mt-5">
              <v-btn rounded x-large class="button" @click="createExercise"> ADD </v-btn>
          </v-row>
        </div>
</template>

<!-- Ojo con el important-->
<style scoped>

.button{
  color:black;
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
import {Exercise, Img} from "../api/exercise"
import { useExerciseStore } from "../stores/exerciseStore";
import { useSecurityStore } from "@/stores/SecurityStore";




export default {
  name: 'App',
  data() {
    return {
      name:"",
      file: null,
      imageUrl: '',
      errorFlag: false,
      errorMsg: " ",
      success: false
    }
  },

  async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();
  },


  methods: {
    ...mapActions(useExerciseStore,{
      $createExercise: 'create',
      $addImg: 'addImg'
    }),

    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
      $login: 'login',
      $logout: 'logout',
    }),

    async createExercise(){
      this.errorFlag = false;
      this.errorMsg = "";

      if(this.name.length == 0 || this.imageUrl == 0){
        this.errorFlag = true;
        this.errorMsg = "ERROR: Please fill all the fields"
        return
      }
      try{
        const exercise = new Exercise(this.name, this.name, "exercise");
        this.exercise = await this.$createExercise(exercise);
        let img = new Img(this.imageUrl);
        await this.$addImg(this.exercise, img);
        this.$emit("createdExercise");
      } catch(e){
        this.errorFlag = true
        this.errorMsg = "ERROR: Duplicate exercise or other error"
      }
      finally{
        if(!this.errorFlag){
          this.success = true;
        }
      }
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

  emits:["createdExercise"]

};
</script>