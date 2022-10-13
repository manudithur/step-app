import {Api} from "./api"

//en la api hay una categoria opcional de sports, por eso eligio esto
export {RoutineApi, Routine}

class RoutineApi{

    //creo la url de la API
    static getUrl(slug){
        return `${Api.baseUrl}/routines${ slug ? `/${slug}` : ""}`;
    }

    static async add(routine){
        console.log(routine)
        return await Api.post(RoutineApi.getUrl(), true, {
            "name":`${routine.name}`,
            "detail": `${routine.detail}`,
            "isPublic": true,
            "difficulty":`${routine.difficulty}`,
        })
    }

    static async modify(routine){
        return await Api.put(RoutineApi.getUrl(routine.id),true, routine);
    }

    static async delete(id){
        return await Api.delete(RoutineApi.getUrl(id), true)
    }

    static async get(id){
        return await Api.get(RoutineApi.getUrl(id), true)
    }

    static async getAll(){
        return await Api.get(RoutineApi.getUrl(),true)
    }
}

class Routine{
    constructor(name, detail, isPublic, difficulty) {
        //capaz los segundos dos atributos no sean necesarios
        this.name=name;
        this.detail = detail;
        this.isPublic = isPublic;
        this.difficulty = difficulty;
    }

}