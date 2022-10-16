<template>
  <v-container class="pa-5">
    <v-card class=" rounded-xl centerCard pa-12 secondary" height="50px">
      <div>

          <v-row class="white--text">
            <h2>{{name}}</h2>
            <v-spacer/>
            <h2 class="pr-3">{{repetitions}}</h2>
          </v-row>

      </div>
    </v-card>
  </v-container>
</template>

<script>

export default{
  name: "ExercisePill",
  props:{
    name: String,
    repetitions: String,
    isActivity: Boolean,
    isRest: Boolean,
    date: Number,
    id: Number
  },

  computed:{
    dateString(){
      const d = new Date(parseInt(this.date));
      return d.toLocaleDateString()
    }
  },

}
</script>

<style scoped>
#navbar {
  background-color: white;
}

.bar-btn {
  font-size: 20px;
}

.eBox{
  height:100%;
  width: 100%;
}
</style>