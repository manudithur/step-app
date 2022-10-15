<template>
  <v-app>
    <NavBar/>
    <v-main class="content">
      <v-row>
        <v-col cols="1">
         <router-link class="RLink" to="/home">
            <v-btn class="ml-5 mt-10"><v-icon>mdi-arrow-left</v-icon></v-btn>
          </router-link>

        </v-col>
        <v-col>
          <h1 class="mt-10">My Routines</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1"/>
        <v-col cols="10">
          <v-card class="rounded-xl">
            <v-row class="align-center ma-3" v-for="(routine, index) in routines" :key=routine.name>
              <v-col cols="1"/>
              <v-col cols="4">
                <li>
                  <h4>{{routines[index].name}}</h4>
                </li>

              </v-col>
              <v-col cols="2"/>
              <v-col cols="1">
                <v-btn><v-icon>mdi-pencil</v-icon></v-btn> <!-- TOOO: Hacer que el router redirija a create workout con el index el url y con un parametro que indique modify y no create   -->
              </v-col>
              <v-col cols="1"/>
              <v-col cols="1">
                <v-btn @click="deleteRoutine(index)"><v-icon>mdi-delete</v-icon></v-btn>
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
import {mapActions} from "pinia";
import {useRoutineStore} from "@/stores/routineStore";




export default {
  data() {
    return {
      routines: undefined //fetch exercises TODO: que haga fetch de la api y acomodar los capos que muestra
    }
  },

  methods :{
    deleteRoutine(index){
      this.routines.splice(index,1); //TODO: que esto no lo cambie solo en el array sino que lo mande a la api
    },

    ...mapActions(useRoutineStore,{
      $modifyRoutine: 'modify'
    }),
  },


  name: "myRoutines",
  components: {FooterBar,NavBar}
}
</script>

<style scoped>
.content {
  background: url(../assets/fondo.png);
  background-size: cover;
}
</style>