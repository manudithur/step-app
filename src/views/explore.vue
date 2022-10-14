<template>
  <v-app>
    <NavBar/>
    <v-main class="content">
      <v-container fluid class="pb-10 pt-5">
        <div>
          <v-row>
            <v-col cols="3" v-for="(e) in this.exercises" :key="e.id">
              <ExerciseCard
                  :id="e.id"
                  :name="e.name"
                  :detail="e.detail"
              />
            </v-col>

          </v-row>
        </div>
      </v-container>
    </v-main>
    <FooterBar/>
  </v-app>
</template>

<!-- Ojo con el important-->
<style scoped>

.button{
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
import FooterBar from '../components/FooterBar.vue';
import { mapState, mapActions } from "pinia"
import { useSecurityStore } from "@/stores/SecurityStore";
import { useExerciseStore } from "@/stores/exerciseStore";
import ExerciseCard from "@/components/ExerciseCard";

export default {
  name: 'App',
  data: () => ({
    value:50,
    controller:'',
    exercises: undefined
  }),

  components: {
    ExerciseCard,
    NavBar,
    FooterBar
  },

   async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();
    this.getAllExercises();
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
    }
  }

};
</script>