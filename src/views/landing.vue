<template>
    <v-app>
      <LoginNavBar/>
      <v-main class="content">
        <v-container fluid class="pb-10">
          <v-row class="justify-center pt-10">
            <v-col cols="4" class="pt-15" >
              <v-container class="white--text pt-15">
                <h1 class="banner-text">Let us enhance your workout experience.</h1>
                <p>Help us find a workout plan that fits your needs by answering 3 quick questions.</p>
                <v-btn x-large elevation="4" class="button rounded-lg white">
                  Join Now!
                </v-btn>
              </v-container>
            </v-col>
            <v-col cols="5">
              <v-img src="../assets/trainers.png"  class="mb-0 pb-0" max-width="900px" min-width="800px"></v-img>
            </v-col>
          </v-row>
          <v-row class="justify-center ma-0">
            <v-card class="white rounded-xl pa-5">
              <v-col cols="200">
                  <v-row class="justify-center text-center pa-5">
                    <h1>Top Rated Workouts</h1>
                  </v-row>
                  <v-row>
                    <v-col cols="100">
                      <v-card class="secondary rounded-xl white--text pb-5">
                        <v-img :aspect-ratio="1.8" class="text-left" width="600" src="../assets/chestpump.png">
                          <v-container class="pa-5">
                            <div class="pa-3" style="display:inline-block">
                              <v-chip class="white pa-5" large style="font-weight:bold">CHEST</v-chip>
                            </div>
                            <div class="pa-3" style="display:inline-block">
                              <v-chip class="white pa-5" large style="font-weight:bold">EXTREME</v-chip>
                            </div>
                          </v-container>
                        </v-img>
                        <div class="pt-5 text-center">
                          <h1>CHEST PUMP</h1>
                        </div>
                        
                        <v-row class="justify-center text-center pa-5">
                          <v-col cols="15">
                            <v-avatar size="80"><v-img src="../assets/lory.png"></v-img></v-avatar>
                          </v-col>
                          <v-col cols="50">
                            <h2>Lory Stenson</h2>
                            <p>5+ years of experience</p>
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
                    </v-col>
                    <v-col class="text-center" cols="100">
                      <v-card class="secondary rounded-xl white--text pb-5">
                        <v-img :aspect-ratio="1.8" class="text-left" width="600" src="../assets/slowyoga.png">
                          <v-container class="pa-5">
                            <div class="pa-3" style="display:inline-block">
                              <v-chip class="white pa-5" large style="font-weight:bold" >YOGA</v-chip>
                            </div>
                            <div class="pa-3" style="display:inline-block">
                              <v-chip class="white pa-5" large style="font-weight:bold">ELONGATION</v-chip>
                            </div>
                          </v-container>
                        </v-img>
                        <div class="pt-5">
                          <h1>SLOW YOGA</h1>
                        </div>
                        
                        <v-row class="justify-center pa-5">
                          <v-col cols="15">
                            <v-avatar size="80"><v-img src="../assets/michelle.png"></v-img></v-avatar>
                          </v-col>
                          <v-col cols="50">
                            <h2>Michelle Jogi</h2>
                            <p>8+ years of experience</p>
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
                            <p class="black--text">833 reviews</p>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>
              </v-col>
            </v-card>
          </v-row>
        </v-container>
      </v-main>
      <FooterBar/>
    </v-app>
  </template>
  
  <!-- Ojo con el important-->
  <style>
    
    .button{
      color:#1B56ED !important; 
      font-weight:bold;
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
  
  export default {
    name: 'App',
    data: () => ({
    
    }),
  
    components: {
      LoginNavBar,
      FooterBar
  }
  
  };
  </script>
  