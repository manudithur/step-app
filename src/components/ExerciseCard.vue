<template>
      <v-container class="pa-5">
          <v-card class=" rounded-xl centerCard pa-12"
          width="330"
          height="220">
            <div>
              <h2>{{name}}</h2>
              <p>{{detail}}</p>
            </div>
          </v-card>
      </v-container>
</template>

<script>
export default{
  name: "ExerciseCard",
  props:{
    name: String,
    detail: String,
    isActivity: Boolean,
    isRest: Boolean,
    id: Number
  }
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

