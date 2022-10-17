<template>
  <v-app>
    <NavBar/>
    <v-main class="content">
      <v-container fluid class="pb-10">
        <v-row class="justify-center pa-0 pt-10">
          <v-col cols="4" class="pt-10" >
            <v-container class="white--text pt-15">
              <v-row>
              <h1 class="banner-text">Just keep going! Dont give up!</h1>
              <p >We become better every day, step by step.</p>
              <v-row class="pb-3">
              </v-row>

              </v-row>
              <v-row class="pt-4">
                <v-btn x-large elevation="4" class="buttonHome rounded-lg white">
                  <router-link class="RLink" to="/explore">
                  Continue Now!
                  </router-link>
                </v-btn>
              </v-row>
            </v-container>
          </v-col>
          <v-col cols="4" class="white--text">
            <v-row class="justify-center pb-4">
              <h1 class="title-workout"  >Explore different workouts!</h1>
            </v-row>
            <router-link class="RLink" to="/explore">
              <v-card class="white rounded-xl primary--text pb-5 mb-16">
                <v-row class="justify-center pt-5">
                  <h1 class="ml-3 ">SLOW YOGA</h1>
                </v-row>
                <v-row class="justify-center pa-5 align-center">
                    <v-avatar size="80"><v-img src="../assets/michelle.png"></v-img></v-avatar>
                  <v-col class="align-center pa-5">
                    <h2>Michelle Jogi</h2>
                    <p>8+ years of experience</p>
                  </v-col>
                </v-row>

              </v-card>
            </router-link>
          </v-col>
        </v-row>



          <v-row class=" justify-center white--text">
            <h1 class = "title-workout ml-100 mb-5">Your routines</h1>
          </v-row>

        <v-row class="justify-center mb-10">
          <v-sheet
              class="mx-auto rounded-xl"
              elevation="8"
              max-width="1200"
          >
            <v-slide-group
                v-model="model"
                class="pa-4"
                center-active
                show-arrows
            >
              <v-slide-item
                  v-for="(e) in routines" :key="e.id"
              >
                  <router-link class="RLink" :to="`/edit/${e.id -1}`"><RoutineCard :id="e.id"
                               :name="e.name"
                               :detail="e.detail"
                               :date ="e.date"/>
                  </router-link>

              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-row>
        <v-row class=" justify-center white--text">
          <h1 class = "title-workout ml-100 mb-5">Your exercises</h1>
        </v-row>
        <v-row class="justify-center mb-10">
          <v-sheet
              class="mx-auto rounded-xl"
              elevation="8"
              max-width="1200"
          >
            <v-slide-group
                v-model="model"
                class="pa-4"
                center-active
                show-arrows
            >
              <v-slide-item
                  v-for="(e) in exercises" :key="e.id"
              >
                <router-link class="RLink" :to="`/exercises`"><ExerciseCard
                                                                   :name="e.name"
                                                                   :detail="e.detail"
                                                                   :difficulty="e.difficulty"
                                                                   :date ="e.date"/>
                </router-link>

              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-row>

      </v-container>
    </v-main>
    <FooterBar/>
  </v-app>
</template>

<!-- Ojo con el important-->
<style scoped>

.buttonHome{
  color:#1B56ED !important;
  font-weight:bold;
}

.content {
  background: url(../assets/fondo.png);
  background-size: cover;
}

.banner-text {
  font-size: 50px;
}
.title-workout {
  font-size: 38px;
}

p {
  font-size: 17px;
}

</style>



<script>
import NavBar from '../components/NavBar.vue';
import RoutineCard from '../components/routineCard.vue';
import ExerciseCard from '../components/ExerciseCard.vue';
import FooterBar from '../components/FooterBar.vue';
import { mapState, mapActions } from "pinia"
import { useSecurityStore } from "@/stores/SecurityStore";
import { useExerciseStore } from "@/stores/exerciseStore";
import router from '@/router';
import {useRoutineStore} from "@/stores/routineStore";

export default {
  name: 'App',
  data: () => ({
    value:80,
    controller:'',
    exercises: undefined,
    routine: undefined,
    routines: undefined
  }),

  components: {
    NavBar,
    FooterBar,
    RoutineCard,
    ExerciseCard
  },

  async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();
    if(!securityStore.isLoggedIn){
      router.push('/login')
    }
    await this.getAllExercises();
    await this.getUserRoutines();

  },

  computed:{
    ...mapState(useSecurityStore, {
      $user: state => state.user,
    }),
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn'
    }),
    ...mapState(useRoutineStore, {
      $getAllRoutines: 'getAll',
      $getUserRoutines: 'getUserRoutines'
    })
  },

  methods:{
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

    setResult(result){
      this.result = JSON.stringify(result, null, 2)
    },
    clearResult() {
      this.result = null
    },

    async getAllExercises() {
      try {
        this.controller = new AbortController()
        const exercises = await this.$getAllExercises(this.controller);
        this.exercises= exercises.content;
        this.controller = null
        this.setResult(exercises)
      } catch(e) {
        this.setResult(e)
      }
    },

    async getRoutine(){
      console.log(this.routines[4])
      this.routine = await this.$getRoutine(this.routines[1]);
    },

    async getUserRoutines() {
      this.controller = new AbortController();
      const myRoutines = await this.$getUserRoutines();

      this.routines = myRoutines;
      this.controller = null

    },
  }

};
</script>