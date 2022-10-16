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
                <router-link to="/edit">
                  <v-btn><v-icon>mdi-pencil</v-icon></v-btn> <!-- TODO: Hacer que el router redirija a create workout con el index el url y con un parametro que indique modify y no create   -->
                </router-link>
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
import {mapActions, mapState} from "pinia";
import {useRoutineStore} from "@/stores/routineStore";
import {useSecurityStore} from "@/stores/SecurityStore";




export default {
  data() {
    return {
      routines: undefined //fetch exercises TODO: que haga fetch de la api y acomodar los capos que muestra
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

  async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();
    await this.getAllRoutines();
  },

  methods : {
    async getAllRoutines() {
      try {
        this.controller = new AbortController()
        const routines = await this.$getAllRoutines(this.controller);
        this.routines = routines.content;
        this.controller = null
        this.setResult(routines)
      } catch (e) {
        this.setResult(e)
      }
    },

    async deleteRoutine(index) {
      await this.$deleteRoutine(this.routines[index]);
      this.routines.splice(index, 1);
      console.log(this.routines)
      console.log(index)

    },


    ...mapActions(useRoutineStore, {
      $createRoutine: 'create',
      $modifyRoutine: 'modify',
      $deleteRoutine: 'delete',
      $getRoutine: 'get',
      $getAllRoutines: 'getAll'
    }),

    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
      $login: 'login',
      $logout: 'logout',
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