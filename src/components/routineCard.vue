<template>
  <v-container class="pa-5">
    <v-card class=" rounded-xl centerCard pa-12" height="230px">
      <div>
        <h2>{{name}}</h2>
        <p>{{detail}}</p>
        <p>Created on: {{dateString}}</p>
      </div>
    </v-card>
  </v-container>
</template>

<script>

export default{
  name: "RoutineCard",
  props:{
    name: String,
    detail: String,
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