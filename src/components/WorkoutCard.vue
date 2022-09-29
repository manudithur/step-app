
<!--NO USAR NO FUNCA AUN-->
<template>
  <v-card class="secondary rounded-xl white--text pb-5">
    <v-img
      aspect-ratio="{{size}}"
      class="text-left"
      width="600"
      :src="require('{{workoutImg}}')"
    >
      <v-container class="pa-5">
        <!--For con los chips-->
        <div class="pa-3" style="display: inline-block">
          <v-chip class="white pa-5" large style="font-weight: bold"
            >EXTREME</v-chip
          >
        </div>
      </v-container>
    </v-img>
    <div class="pt-5 text-center">
      <h1>{{workoutName}}</h1>
    </div>

    <v-row class="justify-center text-center pa-5">
      <v-col cols="15">
        <v-avatar size="80"><v-img :src="require('{{trainerImg}}')"></v-img></v-avatar>
      </v-col>
      <v-col cols="50">
        <h2>{{trainerName}}</h2>
        <p>{{trainerDescription}}</p>
      </v-col>
      <v-col cols="35">
        <v-rating
          background-color="black"
          color="black"
          empty-icon="mdi-star-outline"
          full-icon="mdi-star"
          half-icon="mdi-star-half-full"
          readonly
          length="5"
          dense
          size="20"
          value="4.5"
        ></v-rating>
        <p class="black--text">123 reviews</p>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
#navbar {
  background-color: white;
}

.bar-btn {
  font-size: 20px;
}
</style>

<script>
export default {
  name: "WorkoutCard",
  props: {
    size: Number,
    workoutName: String,
    workoutImg: String,
    chips: Array,
    trainerImg: String,
    trainerName: String,
    trainerDescription: String,
    reviewsCount: Number,
    review: Number,
  },
};
</script>
