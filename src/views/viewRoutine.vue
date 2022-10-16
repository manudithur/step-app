<template>
  <v-app>
    <NavBar/>
    <v-main class="content">
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-row>
            <v-col cols="2"/>
            <v-col cols="8">
              <v-container class="mt-16 white--text">
                <h1>Edit Workout:</h1>
                <h3 class="mt-16">Step 1: Workout Info</h3>
              </v-container>
              <v-card class="white rounded-xl pa-5">
                <h1>{{cycles}}</h1>
                <v-row>
                  <v-col cols="4" class="text-center">
                    <h5 class="onWhite mt-6">Workout Name</h5>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                        class="mt-4 inputField"
                        solo
                        rounded
                        single-line
                        dark
                        background-color="#55B8FF"
                        v-model="routine.name"
                    >{{routine.name}}</v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" class="text-center">
                    <h5 class="onWhite mt-5">Description</h5>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                        class="mt-4 inputField"
                        solo
                        rounded
                        single-line
                        dark
                        background-color="#55B8FF"
                        v-model="routine.detail"
                    >{{ routine.detail }}</v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" class="text-center">
                    <h5 class="onWhite mt-2">Intensity</h5>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                        rounded
                        single-line
                        solo
                        background-color="#55B8FF"
                        dark
                        v-model="routine.difficulty"
                    >{{routine.difficulty}}</v-text-field>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item :value="2">
          <v-row>
            <v-col cols="2" />
            <v-col cols="8">
              <v-container class="mt-16 white--text">
                <h1>Create a new Workout:</h1>
                <h3 class="mt-16">Step 2: Create Routine</h3>
              </v-container>

              <v-card class="white rounded-xl  mb-15">
                <v-row>
                  <v-btn
                      class="cycleButton"
                      v-for="(cycle, index) in cycles" :key="cycle.cycleName"
                      @click="updateStage(index)">
                    {{cycle.cycleName}}
                  </v-btn>
                </v-row>
              </v-card>

              <v-window>
                <v-window-item  v-for="(cycle) in cycles" :key="cycle.cycleName">
                  <v-card class="white rounded-xl pa-5 mb-15">
                    <h1 class="ma-5">{{cycles[selectedStage].cycleName}}</h1>
                    <v-row v-for="(n,index) in cycles[selectedStage].count" :key="n">
                      <v-select
                          :items="exercises"
                          item-text="name"
                          item-value="id"
                          label="Select exercise"
                          v-validate="'required'"
                          v-model="cycles[selectedStage].exercises[index].id"
                          rounded
                          single-line
                          solo
                          background-color="#55B8FF"
                          dark
                      ></v-select>
                      <v-btn-toggle></v-btn-toggle>
                      <v-btn @click="decreaseAmount(index)">-</v-btn>

                      <p class="pa-2"> {{ cycles[selectedStage].exercises[index].repsOrTime}} </p>

                      <v-btn @click="increaseAmount(index)">+</v-btn>
                      <v-btn><v-icon
                          @click="deleteElement(index)">mdi-delete</v-icon></v-btn>
                    </v-row>
                    <v-row class="justify-center">
                      <v-btn
                          @click="updateContent()"
                          class="addButton"
                          small
                      >+</v-btn>
                    </v-row>
                  </v-card>
                </v-window-item>
              </v-window>

            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item :value="3">
          <v-row>
            <v-col cols="2"/>
            <v-col cols="8">
              <v-container class="mt-5 white--text">
                <h1>Create a new Workout:</h1>
                <h3 class="mt-6">Step 3: Review Workout</h3>
              </v-container>

              <v-card class = "white rounded-xl pa-5">
                <div v-for="(cycle) in cycles"
                     :key="cycle.id">
                  <v-row>
                    <h2>{{cycle.cycleName}}</h2>
                  </v-row>

                  <div v-for="exercise in cycle.exercises" :key="exercise">
                    <v-row>
                      <ExercisePill :name="getName(exercise.id)" :repetitions="exercise.repsOrTime"/>
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
      cycleExercises:undefined,
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
    await this.getCycleExercises();
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

    async getCycleExercises(){
      this.cycles.forEach(element => this.cycleExercises.push(this.$getCycleExercises(element.id)))
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