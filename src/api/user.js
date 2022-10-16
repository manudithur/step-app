import {Api} from "./api"

export {UserApi, Credentials, User, VerificationData,Editables}

class UserApi{
    static getUrl(slug){
        return  `${Api.baseUrl}/users${ slug ? `/${slug}` : ""}`;
    }

    static async login(credentials) {
        return await Api.post(UserApi.getUrl('login'), false, credentials);
    }

    static async addUser(user){
        return await Api.post(UserApi.getUrl(),false, user)
    }

    static async verify(verificationData){
        return await Api.post(UserApi.getUrl('verify_email'), false, verificationData)
    }

    static async saveEdit(editables){
        return await Api.put(UserApi.getUrl('current'), true, editables)
    }

    static async logout(){
        return await Api.post(UserApi.getUrl('logout'),true)
    }

    static async get(){
        return Api.get(UserApi.getUrl('current'),true)
    }

}

class Credentials{
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

class User{
    constructor(username, email, password){
        this.firstName = username;
        this.lastName = username;
        this.password = password;
        this.email = email;
        this.username = username;
    }
}

class VerificationData{
    constructor(email, code){
        this.email=email;
        this.code=code;
    }
}

class Editables{
    constructor(firstName, lastName, imageUrl, metadata){
        this.firstName = firstName;
        this.lastName = lastName;
        this.imageUrl = imageUrl;
        this.metadata = metadata;
    }
}
