<template>
  <v-app>
    <LoginNavBar/>
    <v-main class = "content">
      <v-row>
        <v-col cols="2"/>
        <v-col cols="8">
          <v-container class="mt-5 white--text">
            <h1>Create a new Workout:</h1>
            <h3 class="mt-6">Step 3: Review Workout</h3>
          </v-container>
          <v-card class = "white rounded-xl pa-5">
            <v-container v-for="cycle in cicles" :key="cycle.cycleName">
              <v-row>
                <h2 class="onWhite ma-4">{{cycle.cycleName}}</h2>
              </v-row>
              <WorkoutReview v-for="items in cycle.exercises" :key="items" :workout-name="items.name" :repsOrTime="items.repsOrTime"></WorkoutReview>
            </v-container>
          </v-card>
          </v-col>
      </v-row>
    </v-main>
    <FooterBar/>
  </v-app>
</template>

<script>
import LoginNavBar from "@/components/LoginNavBar";
import FooterBar from "@/components/FooterBar";
import WorkoutReview from "@/components/WorkoutReview";


export default {
  data(){
    return{
      cicles:[
        {
          cycleName: "Warmup",
          exercises: [
            {
              name:"Hola",
              repsOrTime: "x10"
            }
          ],
        }
      ]
    }
  },

  name: "createWorkout3",
  components: {FooterBar, LoginNavBar, WorkoutReview}
}
</script>

<style scoped>

.content {
  background: url(../assets/fondo.png);
  background-size: cover;
}

.onWhite{
  color: #5A6175;
  font-size: x-large;
  margin-left: 7%;
  margin-right: 7%;

}

</style>