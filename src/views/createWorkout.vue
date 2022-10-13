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
                <h1>Create a new Workout:</h1>
                <h3 class="mt-16">Step 1: Workout Info</h3>
              </v-container>
              <v-card class="white rounded-xl pa-5">
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
                      v-model="wname"
                    >Workout Name</v-text-field>
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
                        v-model="wdescription"
                    >{{ wdescription }}</v-text-field>
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
                      v-model="wdifficulty"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" class="text-center">
                    <h5 class="onWhite mt-2">Cover Image</h5>
                  </v-col>
                  <v-col cols="6">
                      <v-btn
                        class="mb-4 py-6 white--text"
                        block
                        color="#55B8FF"
                        rounded
                      ><input type="file" hidden> Attach Image</v-btn>
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
                    <v-row v-for="(exercise, index) in cycles[selectedStage].exercises" :key="exercise.name">
                      <ExerciseData class="ma-5" :reps-or-time="exercise.repsOrTime" @decreaseAmount="decreaseAmount(index)" @increaseAmount="increaseAmount(index)" @deleteElement="deleteElement(index)"></ExerciseData>
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
                <v-container v-for="(cycle, cycleIndex) in cycles" :key="cycle.cycleName">
                  <v-row>
                    <h2 class="onWhite ma-4">{{cycle.cycleName}}</h2>
                  </v-row>
                  <p>{{cycle.exercises}}</p>
                  <WorkoutReview v-for="(item, index) in cycle.exercises" :key="item" :workout-name="item.name" :repsOrTime="item.repsOrTime" @myEvent="kill(index, cycleIndex)"></WorkoutReview>
                </v-container>
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
          <v-btn v-if="step === 3" rounded elevation="5" class="pa-7 mb-16 mt-10 next" width="100%" @click="createRoutine">Finish</v-btn>
        </v-col>
      </v-row>
    </v-main>
    <FooterBar />
  </v-app>
</template>

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

<script>
import NavBar from "@/components/NavBar";
import FooterBar from "@/components/FooterBar";
import {mapActions, mapState} from "pinia";
import {useSecurityStore} from "@/stores/SecurityStore";
import {useRoutineStore} from "@/stores/routineStore";
import {Routine} from "@/api/routine";
import ExerciseData from "@/components/exerciseData";

export default {
  data() {
    return {
      wname:"",
      wdescription:"",
      wdifficulty:"rookie",
      select1: "Full Body",
      items1: ["Chest", "Back", "Bicep", "Tricep", "Abs"],
      items2: ["Very High", "High", "rookie", "Low", "Very Low"],
      step:1,
      selectedStage: 0,
      cycles:[
        {
          cycleName: "Warmup",
          exercises: [
            {
              name: "",
              repsOrTime: 1
            }
          ],
        },
        {
          cycleName:"Cycle 1",
          exercises: [
            {
              name: "",
              repsOrTime: 1
            }
          ],
        },
        {
          cycleName: "Cooldown",
          exercises: [
            {
              name: "",
              repsOrTime: 0
            }
          ],
        },
      ],
    };
  },

  methods: {
    updateStage(index) {
      this.selectedStage = index;
    },

    updateContent(){
      this.cycles[this.selectedStage].exercises.push({name:"",repsOrTime: "1"})
      console.log(this.cycles)
    },



    ...mapActions(useRoutineStore,{
      $createRoutine: 'create'
    }),

    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
      $login: 'login',
      $logout: 'logout',
    }),

    async createRoutine(){
      const routine = new Routine(this.wname, this.wdescription,true, this.wdifficulty);
      this.routine = await this.$createRoutine(routine);
    },

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
  components: { FooterBar, NavBar, ExerciseData },
};
</script>

