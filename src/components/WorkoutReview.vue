<template>
  <v-row>
    <v-col cols="7">
      <v-card dark color="#55B8FF" class="text-center rounded-xl mr-4">
        <h1>{{WorkoutName}}</h1>
      </v-card>
    </v-col>
    <v-col cols="2">
      <v-card class="mr-4 ml-4" color="#55B8FF">
        <p class="white--text text-center mt-3">{{repsOrTime}}</p>
      </v-card>
    </v-col>
    <v-col cols="2" >
      <v-btn @click="close()" icon class="mt-2 ml-4">
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props:{
    WorkoutName:{
      type:String
    },
    repsOrTime:{
      type:String
    },
    index:{
      type:Number
    }
  },
  methods:{
    close() {
      this.$emit('myEvent');
      //$emit que se suscriba a tu padre que le pase el indice del evento a borrar
  }},
  emits:['myEvent'],
  name: "WorkoutReview"
}
</script>

<style scoped>


</style>