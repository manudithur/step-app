<template>
  <v-app>
    <NavBar/>
    <v-main class="content justify-center">
      <v-row class="justify-center">
        <v-container class="mt-16 white--text">
            <h1 class="ml-5">Create a new Exercise:</h1>
        </v-container>
        <v-col cols="8">
        <createExercise @createdExercise="getAllExercises"/>
        </v-col>
      </v-row>
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-row>
            <v-col cols="2"/>
            <v-col cols="8">
              <v-container class="mt-10 white--text">
                <h1>Create a new Workout:</h1>
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
                      v-model="routine.name"
                    >Workout Name</v-text-field>
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
                        v-model="routine.detail"
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
        <v-window-item :value="2">
          <v-row>
            <v-col cols="2" />
            <v-col cols="8">
              <v-container class="mt-10 white--text">
                <h1>Create a new Workout:</h1>
                <h3 class="mt-5 mb-5">Step 2: Create Routine</h3>
              </v-container>

              <v-card class="white rounded-xl  mb-15 ">
                <v-row class="justify-center">
                  <v-btn
                      class="cycleButton ma-5 pa-8 rounded-l"
                      v-for="(cycle, index) in cycles" :key="cycle.cycleName"
                      @click="updateStage(index)">
                    {{cycle.cycleName}}
                  </v-btn>
                </v-row>
              </v-card>

              <v-window>
                <v-window-item  v-for="(cycle) in cycles" :key="cycle.cycleName">
                  <v-card class="white rounded-xl pa-8 mb-15">
                    <h1 class="mb-5">{{cycles[selectedStage].cycleName}}</h1>
                    <v-row class="mt-5" v-for="(n,index) in cycles[selectedStage].count" :key="n">
                      <v-select
                          :items="exercises"
                          v-model="cycles[selectedStage].exercises[index].id"
                          item-value="id"
                          item-text="name"
                          label="Select exercise"
                          rounded
                          single-line
                          solo
                          background-color="#55B8FF"
                          dark
                      ></v-select>

                      <v-btn-toggle></v-btn-toggle>

                      <v-btn @click="decreaseAmount(index)" class="rounded-pill mx-3 mt-1">-</v-btn>

                      <h2 class="pa-2 "> {{ cycles[selectedStage].exercises[index].repetitions}} </h2>

                      <v-btn @click="increaseAmount(index)" class="rounded-pill mx-3 mt-1">+</v-btn>
                      <v-icon class="mt-n9" @click="deleteElement(index)">mdi-delete</v-icon>


                    </v-row>
                    <v-row class="justify-center">
                      <v-btn
                          @click="updateContent()"
                          class="addButton rounded-pill"
                          large
                      >+</v-btn>

                    </v-row>

                  </v-card>
                </v-window-item>
              </v-window>

            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
      <v-row class="mb-16">
        <v-row>
        <v-col cols="2" />
        <v-col cols="1">
        <v-btn v-if="step !== 1 " rounded elevation="5" class="pa-7 mb-16 mt-10 next" width="100%" @click="step--">Prev</v-btn>
        </v-col>
        <v-col cols="6"/>
        <v-col cols="1">
          <v-btn v-if="step !== 2" rounded elevation="5" class="pa-7 mb-16 mt-10 next" width="100%" @click="step++">Next</v-btn>
          <router-link to="/home" class="RLink">
            <v-btn v-if="step === 2" rounded elevation="5" class="pa-7 mb-16 mt-10 next" width="100%" @click="finish">Finish</v-btn>
          </router-link>
        </v-col>
      </v-row>

      </v-row>

    </v-main>
    <FooterBar />
  </v-app>
</template>

<style scoped>

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
    max-width: 800px;
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

<script>
import NavBar from "@/components/NavBar";
import FooterBar from "@/components/FooterBar";
import {mapActions, mapState} from "pinia";
import {useSecurityStore} from "@/stores/SecurityStore";
import {useRoutineStore} from "@/stores/routineStore";
import {Routine, Cycle} from "@/api/routine";
import createExercise from "@/components/createExercise";
import {useExerciseStore} from "@/stores/exerciseStore";

export default {
  data() {
    return {

      select1: "Full Body",
      items2: ['rookie', 'beginner', 'intermediate', 'advanced', 'expert'],
      step:1,
      selectedStage: 0,
      cycles:[
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
      routine: {
        name: "",
        detail: "",
        isPublic:"true",
        difficulty: "rookie"
      },
      exercises: undefined,
      selectedExercise:[[],[],[]]
    }
  },

  async created(){
    const securityStore = useSecurityStore();
    await securityStore.initialize();
    await this.$getCurrentUser();
    await this.getAllExercises()

  },

  methods: {
    updateInfo(exercise, index){

      this.cycles[this.selectedStage].exercises[index].name = exercise.name;
      this.cycles[this.selectedStage].exercises[index].id = exercise.id;
    },

    updateStage(index) {
      this.selectedStage = index;
    },

    updateContent(){
      this.cycles[this.selectedStage].exercises.push({id:"",name:"",repetitions: 1})
      this.cycles[this.selectedStage].count++
      this.selectedExercise[this.selectedStage].push({});
    },

    ...mapActions(useRoutineStore,{
      $createRoutine: 'create',
      $addCycle : 'addCycle',
      $addCycleExercise: 'addCycleExercise'
    }),

    ...mapActions(useExerciseStore,{
      $getAllExercises: 'getAll',
      $getName: 'findIndex'
    }),

    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
      $login: 'login',
      $logout: 'logout',
    }),

    async finish(){
      let metadata = {img: this.imageUrl}
      const myRoutine = new Routine(this.routine.name, this.routine.detail, this.routine.isPublic, this.routine.difficulty, JSON.stringify(metadata));
      console.log("Metadata de mi rutina: " + myRoutine.metadata);
      this.routine = await this.$createRoutine(myRoutine);
      const warmup = new Cycle(this.cycles[0].cycleName, this.cycles[0].cycleName, 1, this.cycles[0].repetitions,"warmup");
      const cycle1 = new Cycle(this.cycles[1].cycleName, this.cycles[1].cycleName, 2 , this.cycles[1].repetitions,"warmup");
      const cooldown = new Cycle(this.cycles[2].cycleName, this.cycles[2].cycleName, 3 , this.cycles[2].repetitions,"warmup");
      const c1=await this.$addCycle(this.routine.id, warmup);
      const c2 =await  this.$addCycle(this.routine.id, cycle1);
      const c3 = await this.$addCycle(this.routine.id, cooldown);

      for(let i = 0 ; i < this.cycles[0].count ; i++){

        await this.$addCycleExercise({"order":i+1,"duration":this.cycles[0].exercises[i].repetitions,"repetitions":this.cycles[0].exercises[i].repetitions},c1.id, this.cycles[0].exercises[i].id);
      }
      for(let i = 0 ; i < this.cycles[1].count ; i++){

        await this.$addCycleExercise({"order":i+1,"duration":this.cycles[1].exercises[i].repetitions,"repetitions":this.cycles[1].exercises[i].repetitions},c2.id, this.cycles[1].exercises[i].id);
      }
      for(let i = 0 ; i < this.cycles[2].count ; i++){
        await this.$addCycleExercise({"order":i+1,"duration":this.cycles[2].exercises[i].repetitions,"repetitions":this.cycles[2].exercises[i].repetitions},c3.id, this.cycles[2].exercises[i].id);
      }
    },

    kill(index, cycleIndex){
      this.cycles[cycleIndex].exercises.splice(index,1);
    },

    increaseAmount(index) {
      this.cycles[this.selectedStage].exercises[index].repetitions++;
    },

    decreaseAmount(index) {
      if (this.cycles[this.selectedStage].exercises[index].repetitions > 1)
        this.cycles[this.selectedStage].exercises[index].repetitions--;
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

    },

    async getAllExercises(){
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
  },


  computed: {
    title() {
      return this.cycles[this.selectedStage].cycleName
    },
  ...mapState(useSecurityStore, {
    $user: state => state.user,
  }),
  ...mapState(useSecurityStore, {
    $isLoggedIn: 'isLoggedIn'
  }),

  },



  name: "createWorkout",
  components: { FooterBar, NavBar, createExercise },
};
</script>

