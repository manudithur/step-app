<template>
  <v-app>
    <LoginNavBar/>
    <v-main class="content">
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
                  v-for="(stage, index) in stages" :key="stage.message"
                  @click="updateStage(index)">
                {{stage.message}}
              </v-btn>
            </v-row>
          </v-card>

          <v-window>
            <v-window-item
            v-for="(stage) in stages" :key="stage.message"
            >
              <v-card class="white rounded-xl pa-5 mb-15">
                <h1 class="ma-5">{{title}}</h1>
                <v-row v-for="i in count " :key="`${i}`">
                  <ExerciseData class="ma-5"></ExerciseData>
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

.content {
  background: url(../assets/fondo.png);
  background-size: cover;
}

.banner-text {
  font-size: 65px;
}

p {
  font-size: 15px;
}

</style>

<script>
import LoginNavBar from '../components/LoginNavBar.vue';
import FooterBar from '../components/FooterBar.vue';
import ExerciseData from "@/components/exerciseData";

export default {
  name: 'App',
  data() {
    return {
      selectedStage: 0,
      stages: [{message:"Warmup", counter: 0}, {message:"Cycle 1", counter: 0}, {message:"Cooldown", counter: 0}]
    }
  },
  //metodo que en onclick agregue stage, en el array stages hacer push (ver metodo pasando index para el orden)
  //metaobjeto rutina
  methods: {
    updateStage(index) {
      this.selectedStage = index;
    },

    updateContent(){
      this.stages[this.selectedStage].counter++
    }
  },

  computed: {
    title() {
      return this.stages[this.selectedStage].message
    },
    count(){
      return this.stages[this.selectedStage].counter
    }
  },

  components: {
    LoginNavBar,
    FooterBar,
    ExerciseData
  }

};
</script>