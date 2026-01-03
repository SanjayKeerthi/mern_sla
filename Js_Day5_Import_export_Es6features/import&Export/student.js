export default class Student {
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    getDetails () {
        return `${this.name} is ${this.age} Years Old`;
    }
}