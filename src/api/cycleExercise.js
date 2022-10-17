import {Api} from "./api"

//en la api hay una categoria opcional de sports, por eso eligio esto
export {CycleExerciseApi, CycleExercise}

class CycleExerciseApi{

    //creo la url de la API
    static getUrl(slug){
        return `${Api.baseUrl}/cycles${ slug ? `/${slug}` : ""}`;
    }

    static async add(cycleExercise, cycleId, exerciseId){
        return await Api.post(CycleExerciseApi.getUrl(`${cycleId}/exercises/${exerciseId}`), true, cycleExercise);

    }
    static async getCycleExercises(id){
        return await Api.get(CycleExerciseApi.getUrl(`${id}/exercises`))
    }

    static async deleteCycleExercise(cycleId, exerciseId){
        return await Api.delete(CycleExerciseApi.getUrl(`${cycleId}/exercises/${exerciseId}`), true)
    }

}

class CycleExercise{
    constructor(order, duration, repetitions){
        this.order = order;
        this.duration = duration;
        this.repetitions = repetitions;
    }
}