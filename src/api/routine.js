import {Api} from "./api"
import {UserApi} from "@/api/user";

export {RoutineApi, Routine, Cycle}

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
    static async getCycles(id){
        return await Api.get(RoutineApi.getUrl(`${id}/cycles`))
    }


    static async getAll(){
        return await Api.get(RoutineApi.getUrl(),true)
    }

    static async getUserRoutines(){
        let ans = await this.getAll()
        let routines = ans.content
        let user = await UserApi.get();
        let res = [];
        routines.forEach((routine) => {
            if (routine.user.id === user.id)
                res.push(routine)
        })
        return res;
    }

    static async addCycle(routineId,cycle) {
        return await Api.post(RoutineApi.getUrl(`${routineId}/cycles`), true, cycle);
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

class Cycle{
    constructor(name, detail, order, repetitions,type){
        this.name = name;
        this.detail = detail;
        this.type= type;
        this.order = order;
        this.repetitions = repetitions;
    }
}