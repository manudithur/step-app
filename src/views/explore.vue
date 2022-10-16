<template>
  <v-app>
    <NavBar/>
    <v-main class="content">
      <v-container fluid class="pb-10 pt-5">
        <div>
          <v-row class="justify-left ml-5">
            <v-toolbar class="align-center rounded-xl" max-width="300px">
              <v-select class="mx-3 mt-7" :items="keys" outlined dense v-model="key" style="max-width:300px"></v-select>
              <v-btn @click="changeOrder()" class="primary">
                <v-icon v-if="order">mdi-arrow-up</v-icon>
                <v-icon v-if="order" size="10">mdi-arrow-down</v-icon>
                <v-icon v-if="!order" size="10">mdi-arrow-up</v-icon>
                <v-icon v-if="!order">mdi-arrow-down</v-icon>
              </v-btn>
            </v-toolbar>
          </v-row>
          <v-row>
            <v-col cols="3" v-for="(e) in routines" :key="e.id">
              <ExerciseCard
                  :id="e.id"
                  :name="e.name"
                  :detail="e.detail"
                  :date ="e.date"
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
import ExerciseCard from "@/components/ExerciseCard";
import {useRoutineStore} from "@/stores/routineStore";

export default {
  name: 'App',
  data: () => ({
    value:50,
    controller:'',
    routines: undefined,
    order: true,
    keys: ['date', 'difficulty', 'category'],
    key: 'date'
  }),

  components: {
    ExerciseCard,
    NavBar,
    FooterBar
  },

   async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();
    await this.getAllRoutines();
  },

  computed:{
    ...mapState(useSecurityStore, {
      $user: state => state.user,
    }),
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn'
    }),
  },

  methods:{
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

    setResult(result){
      this.result = JSON.stringify(result, null, 2)
    },
    clearResult() {
      this.result = null
    },

    changeOrder(){
      if(this.order){
        this.order = false;
      } else
        this.order = true;
      this.exercises = this.exercises.sort((a,b)=> this.order ? a.date - b.date : b.date - a.date)
    },

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
  }

};
</script>