class Person {
  constructor(name, age) {
    if (typeof name !== "string") {
      throw new TypeError("Name must be a string");
    }
    if (typeof age !== "number") {
      throw new TypeError("Age must be a number");
    }
    this.name = name;
    this.age = age;

    this.greet = function () {
      console.log(
        `Hello, my name is ${this.name} and I'm ${this.age} years old.`
      );
    };
  }
}

const person1 = new Person("Steve", 4);
const person2 = { name: "Bill", age: 23 };
person1.greet.call(person1);

person1.greet.bind(person2);

person1.greet.apply(person2);
