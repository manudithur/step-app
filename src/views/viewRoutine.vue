<template>
  <v-app>

  <NavBar/>
  <v-main class="content">
    <v-row>
      <v-col cols="2"/>
      <v-col cols="8">
        <v-container class="mt-5 white--text">
          <h1>{{routineName}}</h1>
          <h3 class="mt-6">{{description}}</h3>
        </v-container>

        <v-card class = "white rounded-xl pa-5">
          <div v-for="(cycle) in cycles"
               :key="cycle">
            <v-row>
              <h2>{{cycle.type}}</h2>
            </v-row>

            <div v-for="exercise in cycle.exercises" :key="exercise">
              <v-row>
                <ExercisePill name="getName(exercise.id)" repetitions="hkj"/>
              </v-row>
            </div>
          </div>
          <v-col cols="2" >
            <v-btn @click="close()" icon class="mt-2 ml-4">
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </v-col>

        </v-card>
      </v-col>
    </v-row>

  </v-main>
    <FooterBar/>
  </v-app>
</template>

<script>
import {mapActions} from "pinia";
import {useRoutineStore} from "@/stores/routineStore";
import {useExerciseStore} from "@/stores/exerciseStore";
import {useSecurityStore} from "@/stores/SecurityStore";
import FooterBar from "@/components/FooterBar";
import NavBar from "@/components/NavBar";
import ExercisePill from "@/components/exercisePill";
import {RoutineApi} from "@/api/routine";
// import {CycleExerciseApi as cycleExerciseApi} from "@/api/cycleExercise";

export default {
  name: "viewRoutine",

  data() {
    return {
      routineName: "",
      description: "",
      difficulty:"",
      requestedId:4,
      selectedStage: 0,
      cycles: [],
      cycleExercises:[],
      warmup: undefined,
      cycle: undefined,
      cooldown: undefined,
    }
  },
  async created() {
      const routine = await RoutineApi.get(this.requestedId);
      this.routineName = routine.name;
      this.description = routine.detail;
      this.difficulty = routine.difficulty;

      // const data = await RoutineApi.getCycles(this.requestedId);
      // for (const cycle of data.content) {
      //   const exerciseObj = await cycleExerciseApi.getCycleExercises(cycle.id);
      //   cycle.exercises = exerciseObj.content;
      //   switch (cycle.type){
      //     case "warmup": this.warmup = cycle; break;
      //     case "cooldown": this.cooldown = cycle;break;
      //     case "cycle": this.cycle =cycle;break;
      //   }}
      // this.cycles.push(this.warmup);
      // this.cycles.push(this.cycle);
      // this.cycles.push(this.cooldown);
  },


  methods: {
    ...mapActions(useRoutineStore, {
      $getCycles:'getCycles',
      $getRoutine:'get',
      $getCycleExercises:'getCycleExercises',
    }),

    ...mapActions(useExerciseStore, {
      $getAllExercises: 'getAll',
    }),

    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
      $login: 'login',
      $logout: 'logout',
    }),
  },
  components: {FooterBar, NavBar, ExercisePill},
};
</script>

<style scoped>

.inputField >>> input{
  text-align: center;
}

.v-select__selection {
  width: 100%;
  justify-content: center;
}

.content {
  background: url(../assets/fondo.png);
  background-size: cover;
}
.onWhite {
  color: #5a6175;
  font-size: x-large;
  margin-left: 7%;
  margin-right: 7%;
}

.next {
  font-weight: bold;
  font-size: 20px;
}

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