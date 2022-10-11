import {Api} from "./api"

//en la api hay una categoria opcional de sports, por eso eligio esto
export {ExerciseApi, Exercise}

class ExerciseApi{

    //creo la url de la API
    static getUrl(slug){
        return `${Api.baseUrl}/exercises${ slug ? `/${slug}` : ""}`;
    }

    static async add(exercise){
        return await Api.post(ExerciseApi.getUrl(), true, {
            "name":`${exercise.name}`,
            "detail": `${exercise.detail}`,
            "type":"exercise",
            "metadata":null
        })
    }

    static async modify(exercise){
        return await Api.put(ExerciseApi.getUrl(exercise.id),true, exercise);
    }

    static async delete(id){
        return await Api.delete(ExerciseApi.getUrl(id), true)
    }

    static async get(id){
        return await Api.get(ExerciseApi.getUrl(id), true)
    }

    static async getAll(){
        return await Api.get(ExerciseApi.getUrl(),true)
    }
}

class Exercise{
    constructor(name, detail, type, metadata) {
        this.name=name;
        this.detail = detail;
        this.type = type;
        this.metadata = metadata;
    }

}