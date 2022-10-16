<template>
  <v-app>
    <NavBar/>
    <v-main class="content">
      <v-container fluid class="pb-10 pt-5">
        <div v-if="!noRoutines">
          <v-row class="justify-left ml-5">
            <v-toolbar class="align-center rounded-xl" max-width="300px">
              <v-select class="mx-3 mt-7" :items="keys" outlined dense v-model="key" @change="update()" style="max-width:300px"></v-select>
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
                  :difficulty="e.difficulty"
              />
            </v-col>

          </v-row>
        </div>
        <v-row v-if="noRoutines" class="justify-center text-center">
          <v-card class="accent pa-5" max-width="900px">
            <h1 class="primary--text">No routines available. Create some <router-link to="/create"> HERE</router-link> </h1>
          </v-card>
        </v-row>
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
import router from '@/router'

export default {
  name: 'App',
  data: () => ({
    value:50,
    controller:'',
    routines: [],
    order: true,
    keys: ['date', 'difficulty'],
    key: 'date',
    levels: ['rookie', 'beginner', 'intermediate', 'advanced', 'expert'],
  }),

  components: {
    ExerciseCard,
    NavBar,
    FooterBar
  },

   async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();
    if(!securityStore.isLoggedIn){
      router.push('/login')
    }
    await this.getAllRoutines();
  },

  computed:{
    ...mapState(useSecurityStore, {
      $user: state => state.user,
    }),
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn'
    }),
    noRoutines(){
      return this.routines.length == 0
    }
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

    compare(a,b){
      const string1 = new String(a.difficulty)
      const string2 = new String(b.difficulty)
      let idx1 = this.levels.indexOf(string1.toLowerCase());
      let idx2 = this.levels.indexOf(string2.toLowerCase())
      return idx1 - idx2
    },

    changeOrder(){
      if(this.order){
        this.order = false;
      } else
        this.order = true;
      if(this.key == 'date')
        this.routines = this.routines.sort((a,b)=> this.order ? a.date - b.date : b.date - a.date)
      else if (this.key == 'difficulty')
        this.routines = this.routines.sort(this.order ? (a,b) => this.compare(a,b) : (a,b) => this.compare(b,a))
    },

    update(){
      if(this.key == 'date')
        this.routines = this.routines.sort((a,b)=> this.order ? a.date - b.date : b.date - a.date)
      else if (this.key == 'difficulty')
        this.routines = this.routines.sort(this.order ? (a,b) => this.compare(a,b) : (a,b) => this.compare(b,a))
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