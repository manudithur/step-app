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

}

class CycleExercise{
    constructor(order, duration, repetitions){
        this.order = order;
        this.duration = duration;
        this.repetitions = repetitions;
    }
}