import {defineStore} from "pinia";
import {RoutineApi} from "@/api/routine";
import {CycleExerciseApi} from "@/api/cycleExercise";

export const useRoutineStore = defineStore("routine", {
    state: () => ({
        items: [] }
    ),
    getters: {
        findIndex() {
            return (routine) => {
                return this.items.findIndex(item => item.id === routine.id)
            }
        },
    },
    actions: {

        //estos son locales
        push(routine) {
            this.items.push(routine);
        },
        replace(index, routine) {
            this.items[index] = routine;
        },
        splice(index) {
            this.items.splice(index, 1);
        },
        replaceAll(routine) {
            this.items = routine;
        },


        //estos usan la api
        async create(routine) {
            const result = await RoutineApi.add(routine);
            if (!this.findIndex(result))
                this.push(result);
            return result;
        },
        async modify(routine, newData) {
            const result = await RoutineApi.modify(routine.id, newData);
            const index = this.findIndex(result);
            if (index >= 0)
                this.replace(index, result);
            return result;
        },
        async delete(routine) {
            await RoutineApi.delete(routine.id);
            const index = this.findIndex(routine);
            if (index >= 0)
                this.splice(index);
        },
        async get(routine) {
            const index = this.findIndex(routine);
            if (index >= 0)
                return this.items[index];

            const result = await RoutineApi.get(routine.id);
            this.push(result);
            return result;
        },
        async getAll(controller) {
            const result = await RoutineApi.getAll(controller);
            return result;
        },

        async addCycle(routineId, cycle){
            return await RoutineApi.addCycle(routineId, cycle);
        },
        async addCycleExercise(cycleExercise, cycleId, exerciseId){
            await CycleExerciseApi.add(cycleExercise, cycleId, exerciseId);

        },
        async getCycles(routineId){
            return await RoutineApi.getCycles(routineId)
        },
        async getCycleExercises(cycleId){
            return await CycleExerciseApi.getCycleExercises(cycleId)

        },
        async deleteCycleExercise(cycleId, exerciseId){
            return await CycleExerciseApi.deleteCycleExercise( cycleId, exerciseId);
        },
        async deleteCycle(routineId, cycleId){
            return await RoutineApi.deleteCycle(routineId, cycleId);
        }
    },
});
