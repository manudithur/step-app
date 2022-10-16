<template>
      <v-row class="justify-center ma-10">
        <v-col>
          <v-card class="rounded-xl centerCard pa-12" max-width="800px">
            <h1 class="onGrey text-center pb-5">Create Exercise</h1>
            <v-row class="justify-center py-5">
              <v-col cols="8">
                <v-text-field
                    outlined
                    class="input"
                    label="Exercise Name"
                    v-model="name"
                >{{name}}</v-text-field>
                <p v-if="errorFlag" class="red--text" >{{errorMsg}}</p>
                <v-file-input 
                  v-model="file"
                  outlined
                  :disabled="edit==0"
                  @change="updateImg"
                  prepend-icon=""
                  show-size
                  append-icon="mdi-upload" 
                  label="Upload new avatar"></v-file-input>
                  <v-btn @click="test"></v-btn>
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
      name:"",
      file: null,
      imageUrl: '',
      errorFlag: false,
      errorMsg: " "
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

    updateImg() {
      const file = this.file
      const reader = new FileReader();
      this.errorMsg = " "
      this.errorFlag = false

      if(file.size > 60000){
        this.errorMsg = "Error: tamano maximo de imagen 60kb"
        this.errorFlag = true
        return
      }

      if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
        this.errorMsg = "Error: Tipo de archivo no soportado"
        this.errorFlag = true
        return;
      }

      reader.addEventListener(
        "load",
        () => {
          // convert image file to base64 string
          this.imageUrl = reader.result;
        },
        false
      );

      if (file) {
        this.imageUrl = reader.readAsDataURL(file);
      }
    },

    test(){
      console.log(this.imageUrl);
    },

    async createExercise(){
      const exercise = new Exercise(this.name, this.name, "exercise");
        this.exercise = await this.$createExercise(exercise);
        this.exercise = await this.$addImg(exercise, this.imageUrl)
        this.$emit("createdExercise");
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