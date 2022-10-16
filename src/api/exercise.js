import {Api} from "./api"

//en la api hay una categoria opcional de sports, por eso eligio esto
export {ExerciseApi, Exercise, Img}

class ExerciseApi{

    //creo la url de la API
    static getUrl(slug){
        return `${Api.baseUrl}/exercises${ slug ? `/${slug}` : ""}`;
    }

    static async add(exercise){
        return await Api.post(ExerciseApi.getUrl(), true, exercise);
    }

    static async addImg(exercise, img){
        return await Api.post(ExerciseApi.getUrl(`${exercise.id}/images`), true, img)
    }

    static async getImg(exercise){
        return await Api.get(ExerciseApi.getUrl(`${exercise.id}/images`), true)
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
    constructor(name, detail, type) {
        this.name=name;
        this.detail = detail;
        this.type = type;
    }
}

class Img {
    constructor(url) {
        this.number = 1;
        this.url = url;
    }
}
