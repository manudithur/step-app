<template>
  <v-row>
    <v-select
        :items="exercises"
        item-text="name"
        label="Select exercise"
        v-validate="'required'"
        v-model="exercise"
        rounded
        single-line
        solo
        background-color="#55B8FF"
        dark
    >{{exercise}}</v-select>
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
  import {mapActions} from "pinia";
  import {useSecurityStore} from "@/stores/SecurityStore";
  import {useExerciseStore} from "@/stores/exerciseStore";

  export default{
    name: 'ExerciseData',
    data: () => ({
      value:50,
      controller:'',
      exercises: undefined,
      exercise: undefined
    }),
    props:{
      repsOrTime:{
        type:Number
      }
    },
    async created() {
      const securityStore = useSecurityStore();
      await securityStore.initialize();
      //this.exercises = await this.getAllExercises().content;
      //await this.getAllExercises().then((value) => {

      await this.getAllExercises();


      //this.exercises= useExerciseStore().getAll().content;
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
      },
      ...mapActions(useSecurityStore, {
        $getCurrentUser: 'getCurrentUser',
        $login: 'login',
        $logout: 'logout',
      }),
      ...mapActions(useExerciseStore, {
        $createExercise: 'create',
        $modifyExercise: 'modify',
        $deleteExercise: 'delete',
        $getExercise: 'get',
        $getAllExercises: 'getAll'
      }),

      setResult(result){
        this.result = JSON.stringify(result, null, 2)
      },
      clearResult() {
        this.result = null
      },

      async getAllExercises() {
        try {
          this.controller = new AbortController()
          const exercises = await this.$getAllExercises(this.controller);
          this.exercises= exercises.content;
          this.controller = null
          this.setResult(exercises)
        } catch(e) {
          this.setResult(e)
        }
      }

    },

    emits:['deleteElement','decreaseAmount','increaseAmount'],

    computed: {

    }
  }
</script>
