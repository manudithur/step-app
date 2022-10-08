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
    <span class="pa-2"> {{ amount }} </span>
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

    data(){
      return{
        amount: 1
      }
    },

    methods: {
      increaseAmount() {
        this.amount++;
      },

      decreaseAmount(){
        if(this.amount>0){
          this.amount--;
        }
      },

      removeElement() {
        //metodo del store para sacar del array al ejercicio
      }
    },

    computed: {

    }
  }
</script>
