import { defineStore } from "pinia";
import { ExerciseApi } from "@/api/exercise";

export const useExerciseStore = defineStore("exercise", {
    state: () => ({
        items: [] }
    ),
    getters: {
        findIndex() {
            return (exercise) => {
                return this.items.findIndex(item => item.id === exercise.id)
            }
        },
    },
    actions: {

        //estos son locales
        push(exercise) {
            this.items.push(exercise);
        },
        replace(index, exercise) {
            this.items[index] = exercise;
        },
        splice(index) {
            this.items.splice(index, 1);
        },
        replaceAll(exercise) {
            this.items = exercise;
        },


        //estos usan la api
        async create(exercise) {
            const result = await ExerciseApi.add(exercise);
            if (!this.findIndex(result))
                this.push(result);
            return result;
        },

        async modify(exercise, newData) {
            const result = await ExerciseApi.modify(exercise.id,newData);
            const index = this.findIndex(result);
            if (index >= 0)
                this.replace(index, result);
            return result;
        },
        async delete(exercise) {
            await ExerciseApi.delete(exercise.id);
            const index = this.findIndex(exercise);
            if (index >= 0)
                this.splice(index);
        },
        async get(exercise) {
            const index = this.findIndex(exercise);
            if (index >= 0)
                return this.items[index];

            const result = await ExerciseApi.get();
            this.push(result);
            return result;
        },
        async getAll(controller) {
            const result = await ExerciseApi.getAll(controller);
            return result;
        }
    },
});
