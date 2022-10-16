<template>
  <v-app>
    <NavBar/>
    <v-main class="content">
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-row>
            <v-col cols="2"/>
            <v-col cols="8">
              <v-container class="mt-5 white--text">
                <h1>{{routine.name}}</h1>
                <h3 class="mt-6">{{routine.detail}}</h3>
              </v-container>

              <v-card class = "white rounded-xl pa-5">
                <div v-for="(cycle) in cycles"
                     :key="cycle.id">
                  <v-row>
                    <h2>{{cycle.name}}</h2>
                  </v-row>

                  <div v-for="exercise in cycleExercises" :key="exercise">
                    <v-row>
                      <ExercisePill :name="getName(exercise)" :repetitions="exercise.repetitions"/>
                    </v-row>
                  </div>
                </div>

              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
      <v-row class="mb-16">
        <v-col cols="2" />
        <v-col cols="1">
          <v-btn v-if="step !== 1 " rounded elevation="5" class="pa-7 mb-16 mt-10 next" width="100%" @click="step--">Prev</v-btn>
        </v-col>
        <v-col cols="6"/>
        <v-col cols="1">
          <v-btn v-if="step !== 3" rounded elevation="5" class="pa-7 mb-16 mt-10 next" width="100%" @click="step++">Next</v-btn>
          <v-btn v-if="step === 3" rounded elevation="5" class="pa-7 mb-16 mt-10 next" width="100%" @click="finish">Finish</v-btn>
        </v-col>
      </v-row>
      <createExercise @createdExercise="getAllExercises"/>
    </v-main>
    <FooterBar />
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

// import {CycleExerciseApi as cycleExerciseApi} from "@/api/cycleExercise";

export default {
  name: "viewRoutine",

  data() {
    return {
      routines: undefined,
      routine: undefined,
      requestedIndex:undefined,
      selectedStage: 0,
      cycles: undefined,
      cycleExercises:[],
      step:0,
      exercises: undefined
    }
  },
  async created() {
    this.requestedIndex = this.$route.params.id;
    await this.getAllRoutines();
    await this.getAllExercises();
    await this.getRoutine();

    await this.getCycles();
    this.cycles.forEach(element => this.getCycleExercises(element.id));
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

    async getAllExercises(){
        this.controller = new AbortController()
        const exercises = await this.$getAllExercises(this.controller);
        this.exercises= exercises.content;
        this.controller = null
    },

    ...mapActions(useExerciseStore,{
      $getAllExercises: 'getAll',
    }),

    async getCycles(){
      console.log("Ando bien en cycles 1");

      const cycles = await this.$getCycles(this.routine.id);
      console.log("Ando bien en cycles");
      this.cycles = cycles.content;
    },

    async getCycleExercises(id){
      const aux = await this.$getCycleExercises(id);
      this.cycleExercises.push(aux.content);
    },

    async getAllRoutines() {

        this.controller = new AbortController();
        const routines = await this.$getAllRoutines(this.controller);

        this.routines = routines.content;
        this.controller = null

      console.log("por favor");

    },

    updateStage(index) {
      this.selectedStage = index;
    },

    updateContent(){
      this.cycles[this.selectedStage].exercises.push({id:"",name:"",repsOrTime: 1})
      this.cycles[this.selectedStage].count++
      console.log(this.cycles)
    },

    async getRoutine(){
      console.log(this.routines[this.requestedIndex])
        this.routine = await this.$getRoutine(this.routines[this.requestedIndex]);
    },

    ...mapActions(useRoutineStore, {
      $getCycles:'getCycles',
      $getRoutine:'get',
      $getCycleExercises:'getCycleExercises',
      $getAllRoutines: 'getAll'
    }),

    ...mapActions(useExerciseStore, {
      $getAllExercises: 'getAll',
    }),

    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
      $login: 'login',
      $logout: 'logout',
    }),

    //TODO: hacer que esto haga todo modify de las cosas que ya existen
    // async finish(){
    //   const myRoutine = new Routine(this.routine.name, this.routine.detail,this.routine.isPublic, this.routine.difficulty);
    //   this.routine = await this.$createRoutine(myRoutine);
    //   const warmup = new Cycle(this.cycles[0].cycleName, this.cycles[0].cycleName, 1, this.cycles[0].repetitions,"warmup");
    //   const cycle1 = new Cycle(this.cycles[1].cycleName, this.cycles[1].cycleName, 2 , this.cycles[1].repetitions,"cycle");
    //   const cooldown = new Cycle(this.cycles[2].cycleName, this.cycles[2].cycleName, 3 , this.cycles[2].repetitions,"cooldown");
    //   const c1=await this.$addCycle(this.routine.id, warmup);
    //   const c2 =await  this.$addCycle(this.routine.id, cycle1);
    //   const c3 = await this.$addCycle(this.routine.id, cooldown);
    //
    //   for(let i = 0 ; i < this.cycles[0].count ; i++){
    //
    //     await this.$addCycleExercise({"order":i+1,"duration":this.cycles[0].exercises[i].repsOrTime,"repetitions":this.cycles[0].exercises[i].repsOrTime},c1.id, this.cycles[0].exercises[i].id);
    //   }
    //   for(let i = 0 ; i < this.cycles[1].count ; i++){
    //
    //     await this.$addCycleExercise({"order":i+1,"duration":this.cycles[1].exercises[i].repsOrTime,"repetitions":this.cycles[1].exercises[i].repsOrTime},c2.id, this.cycles[1].exercises[i].id);
    //   }
    //   for(let i = 0 ; i < this.cycles[2].count ; i++){
    //     await this.$addCycleExercise({"order":i+1,"duration":this.cycles[2].exercises[i].repsOrTime,"repetitions":this.cycles[2].exercises[i].repsOrTime},c3.id, this.cycles[2].exercises[i].id);
    //   }
    // },

    kill(index, cycleIndex){
      this.cycles[cycleIndex].exercises.splice(index,1);
    },

    increaseAmount(index) {
      this.cycles[this.selectedStage].exercises[index].repsOrTime++;
    },

    decreaseAmount(index) {
      if (this.cycles[this.selectedStage].exercises[index].repsOrTime > 0)
        this.cycles[this.selectedStage].exercises[index].repsOrTime--;
    },

    deleteElement(index){
      this.cycles[this.selectedStage].exercises.splice(index,1);
      this.cycles[this.selectedStage].count--;
    },

    selectExercise(index){
      this.cycles[this.selectedStage].exercises[index].name
    },

    getName(id){
      return this.exercises.find(o => o.id === id);
      //return JSON.parse(obj, null, 2);
    },
  },
  components: {FooterBar, NavBar, ExercisePill},
};
</script>

<style scoped>

.inputField >>> input{
  text-align: center;
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


p {
  font-size: 15px;
}


</style>