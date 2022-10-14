<template>
  <v-app>
    <NavBar/>
    <v-main class="content">
      <v-row>
        <v-col cols="1">
          <router-link class="RLink" to="/home"> <!--//TODO:fijarse que este bien ruteado-->
            <v-btn><v-icon>mdi-back</v-icon></v-btn>
          </router-link>

        </v-col>
        <v-col>
          <h1 class="mt-10">My Exercises</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1"/>
        <v-col cols="10">
          <v-card class="rounded-xl">
            <v-row class="align-center ma-3" v-for="(exercise, index) in exercises" :key=exercise.name>
              <v-col cols="1"/>
              <v-col cols="4">
                <li>
                  <h4 v-if="editMode !== index">{{exercises[index].name}}</h4>
                  <v-text-field  v-else-if="editMode === index" v-model="exercises[index].name">{{exercises[index].name}}</v-text-field>
                </li>

              </v-col>
              <v-col cols="2"/>
              <v-col cols="1">
                <v-btn @click="editExercise(index)"><v-icon>mdi-pencil</v-icon></v-btn>
              </v-col>
              <v-col cols="1"/>
              <v-col cols="1">
                <v-btn @click="deleteExercise(index)"><v-icon>mdi-delete</v-icon></v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

    </v-main>
    <FooterBar/>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import FooterBar from "@/components/FooterBar";




export default {
  data() {
    return {
      exercises: [
        {
          name: "Chest Pump",
          repsOrTime:5
        }
      ], //fetch exercises TODO: que haga fetch de la api
      editMode: -1,
    }
  },

  methods :{
    deleteExercise(index){
      this.exercises.splice(index,1); //TODO: que esto no lo cambie solo en el array sino que lo mande a la api
    },
    editExercise(index){
      if (this.editMode === -1 || index !== this.editMode)
        this.editMode=index;
      else if (index === this.editMode){
        this.editMode = -1;
      }
    }
  },


  name: "myExercises",
  components: {FooterBar,NavBar}
}
</script>

<style scoped>
.content {
  background: url(../assets/fondo.png);
  background-size: cover;
}
</style>