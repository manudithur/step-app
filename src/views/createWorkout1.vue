<template>
  <v-app>
    <LoginNavBar />
    <v-main class="content">
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
                >Workout Name</v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4" class="text-center">
                <h5 class="onWhite mt-2">Category</h5>
              </v-col>
              <v-col cols="6">
                <v-select
                  class="justify-center"
                  v-model="select1"
                  :items="items1"
                  rounded
                  single-line
                  solo
                  background-color="#55B8FF"
                  dark
                />
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
      <v-row class="mb-16">
        <v-col cols="9" />
        <v-col cols="1">
          <v-btn rounded elevation="5" class="pa-7 mb-16 next" width="100%">Next</v-btn>
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

 </style>

<script>
import LoginNavBar from "@/components/LoginNavBar";
import FooterBar from "@/components/FooterBar";

export default {
  data() {
    return {
      select1: "Full Body",
      items1: ["Chest", "Back", "Bicep", "Tricep", "Abs"],
      items2: ["Very High", "High", "Moderate", "Low", "Very Low"],
    };
  },

  name: "createWorkout1",
  components: { FooterBar, LoginNavBar },
};
</script>

