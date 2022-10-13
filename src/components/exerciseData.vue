<template>
  <v-row>
    <v-select
        rounded
        single-line
        solo
        background-color="#55B8FF"
        dark
    ></v-select>
    <v-btn-toggle></v-btn-toggle>
    <v-btn @click="decreaseAmount()">-</v-btn>
    <span class="pa-2"> {{ repsOrTime}} </span>
    <v-btn @click="increaseAmount()">+</v-btn>
    <v-btn><v-icon
    @click="removeElement()">mdi-delete</v-icon></v-btn>
  </v-row>
</template>

<style scoped>

</style>

<script>
  export default{
    name: 'ExerciseData',

    props:{
      repsOrTime:{
        type:Number
      }
    },

    methods: {
      increaseAmount() {
        this.$emit('increaseAmount');
      },

      decreaseAmount() {
        this.$emit('decreaseAmount');
      },

      removeElement() {
        this.$emit('deleteElement');
      }

    },

    emits:['deleteElement','decreaseAmount','increaseAmount'],

    computed: {

    }
  }
</script>
