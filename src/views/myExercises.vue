<template>
  <v-app>
    <NavBar/>
    <v-main class="content">
      <v-row class="align-center">
        <v-col cols="1">
          <router-link class="RLink" to="/home">
            <v-btn class="ml-5 mt-10"><v-icon>mdi-arrow-left</v-icon></v-btn>
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
            <v-row class="align-center ma-3" v-for="(exercise, index) in exercises" :key=exercise.id>
              <v-col cols="1"/>
              <v-col cols="4">
                <li>
                  <h4 v-if="editMode !== index">{{exercises[index].name}}</h4>
                  <h6 v-if="editMode !== index">{{exercises[index].detail}}</h6>
                  <v-text-field  v-if="editMode === index" v-model="exercises[index].name">{{exercises[index].name}}</v-text-field>
                  <v-text-field  v-if="editMode === index" v-model="exercises[index].detail">{{exercises[index].detail}}</v-text-field>
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
import {mapActions, mapState} from "pinia";
import {useExerciseStore} from "@/stores/exerciseStore";
import {useSecurityStore} from "@/stores/SecurityStore";




export default {
  data() {
    return {
      exercises: undefined, //fetch exercises TODO: que haga fetch de la api
      editMode: -1,
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
    await this.getAllExercises();
  },


  methods: {
    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
      $login: 'login',
      $logout: 'logout',
    }),
    ...mapActions(useExerciseStore, {
      $createExercise: 'create',
      $modifyExercise: 'modify',
      $deleteExercise: 'delete',
      $getExercise: 'get',
      $getAllExercises: 'getAll'
    }),


    async getAllExercises() {
      try {
        this.controller = new AbortController()
        const exercises = await this.$getAllExercises(this.controller);
        this.exercises = exercises.content;
        this.controller = null
        this.setResult(exercises)
      } catch (e) {
        this.setResult(e)
      }
    },

    async deleteExercise(index) {
      await this.$deleteExercise(this.exercises[index]);
      this.exercises.splice(index, 1);
      console.log(this.exercises)
      console.log(index)

    },

    async editExercise(index) {
      if (this.editMode === -1)
        this.editMode = index;
      else if (index === this.editMode) {
        this.editMode = -1;
        await this.$modifyExercise(this.exercises[index], {
          "name": "HOLA",
          "detail": "HOLA",
          "type": "exercise",
          "metadata": null
        });
      }
    },
  },

  ...mapActions(useExerciseStore, {
    $createExercise: 'create',
    $modifyExercise: 'modify',
    $deleteExercise: 'delete',
    $getExercise: 'get',
    $getAllExercises: 'getAll'
  }),

  ...mapActions(useSecurityStore, {
    $getCurrentUser: 'getCurrentUser',
    $login: 'login',
    $logout: 'logout',
  }),

  name: "myExercises",
  components: {FooterBar,NavBar},
}
</script>

<style scoped>
.content {
  background: url(../assets/fondo.png);
  background-size: cover;
}
</style>