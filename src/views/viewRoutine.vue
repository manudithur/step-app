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
                <h1>View routine: {{routine.name}}</h1>
                <h3 class="mt-6">Hit next to edit</h3>

              </v-container>

              <v-card class = "white rounded-xl pa-5">
                <div v-for="(cycle, index) in cycles"
                     :key="index">
                  <v-row>
                    <h2>{{cycle.name}}</h2>
                  </v-row>

                  <div v-for="exercise in cycleExercises[index]" :key="exercise">
                    <v-row>

                      <ExercisePill :name="exercise.exercise.name" :repetitions="exercise.repetitions"/>
                    </v-row>
                  </div>
                </div>

              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item :value="2">
          <v-row>
            <v-col cols="2"/>
            <v-col cols="8">
              <v-container class="mt-10 white--text">
                <h1>Edit Workout:</h1>
                <h3 class="mt-5">Step 1: Workout Info</h3>
              </v-container>
              <v-card class="white rounded-xl pa-5">
                <v-row>
                  <v-col cols="4" class="text-center">
                    <h5 class="onWhite mt-6">Workout Name</h5>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                        class="mt-4"
                        solo
                        rounded
                        single-line
                        dark
                        background-color="#55B8FF"
                        v-model="newData.name"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" class="text-center">
                    <h5 class="onWhite mt-5">Description</h5>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                        class="mt-4"
                        solo
                        rounded
                        single-line
                        dark
                        background-color="#55B8FF"
                        v-model="newData.detail"
                    >{{ routine.detail }}</v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" class="text-center">
                    <h5 class="onWhite mt-2">Intensity</h5>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                        :items="items2"
                        rounded
                        single-line
                        solo
                        background-color="#55B8FF"
                        dark
                        v-model="routine.difficulty"
                    />
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
      <v-row class="mb-16">
        <v-col cols="2" />
        <v-col cols="1">
          <v-btn v-if="step !== 1 " rounded elevation="5" class="pa-7 mb-16 mt-10 next" width="100%" @click="step--">Prev</v-btn>
          <v-btn v-if="step === 1" rounded elevation="5" class="pa-7 mb-16 mt-10 next" width="100%" @click="deleteRoutine">Delete</v-btn>
        </v-col>
        <v-col cols="6"/>
        <v-col cols="1">
          <v-btn v-if="step !== 2" rounded elevation="5" class="pa-7 mb-16 mt-10 next" width="100%" @click="step++">Next</v-btn>
          <v-btn v-if="step === 2" rounded elevation="5" class="pa-7 mb-16 mt-10 next" width="100%" @click="finish">Finish</v-btn>
        </v-col>
      </v-row>
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
      items2: ['rookie', 'beginner', 'intermediate', 'advanced', 'expert'],
      routines: undefined,
      routine: undefined,
      requestedIndex:undefined,
      selectedStage: 0,
      cycles: undefined,
      cycleExercises:[],
      step:0,
      exercises: undefined,
      cyclesCW:[
        {
          cycleName: "Warmup",
          count:0,
          repetitions: 1,
          exercises: [

          ],
        },
        {
          cycleName:"Cycle 1",
          count:0,
          repetitions: 1,
          exercises: [],
        },
        {
          cycleName: "Cooldown",
          count:0,
          repetitions: 1,
          exercises: [
          ],
        },
      ],
    newData: {
      "name": "",
        "detail": "",
        "isPublic": true,
        "difficulty": "",
      "metadata": null
    }
    }
  },
  async created() {
    this.requestedIndex = this.$route.params.id;
    await this.getAllRoutines();
    await this.getAllExercises();
    await this.getRoutine();
    await this.getCycles();
    await this.cycles.forEach(element => this.getCycleExercises(element.id));
    this.newData.name = this.routine.name;
    this.newData.detail = this.routine.detail;
    this.newData.difficulty = this.routine.difficulty;
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

      const cycles = await this.$getCycles(this.routine.id);
      console.log("esto es cycles")
      console.log(cycles);
      this.cycles = cycles.content
      console.log(this.cycles);
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


    },

    async deleteRoutine(){
      await this.$deleteRoutine(this.routine);
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

    async finish(){
      await this.$modifyRoutine(this.routine, this.newData);
    },

    ...mapActions(useRoutineStore, {
      $getCycles:'getCycles',
      $getRoutine:'get',
      $getCycleExercises:'getCycleExercises',
      $getAllRoutines: 'getAll',
      $deleteCycleExercise: 'deleteCycleExercise',
      $deleteCycle:'deleteCycle',
      $deleteRoutine:'delete',
      $modifyRoutine:'modify'
    }),

    ...mapActions(useExerciseStore, {
      $getAllExercises: 'getAll',
    }),

    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
      $login: 'login',
      $logout: 'logout',
    }),

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