// function fullName(person) {
//   return person.firstName + " " + person.lastName;
// }

// const person = {
//   firstName: "John",
//   lastName: "Doe",
// };

// console.log(fullName(person));

// checks if the person is 18 or older

// function isAdult(person) {
//   return person.age >= 18;
// }

// const person2 = {
//   firstName: "Jane",
//   lastName: "Doe",
//   age: 25,
// };

// console.log(isAdult(person2));

// //fFilters an array of person objects to keep only those at least minAge years old.
// function filterByAge(people, minAge) {
//   return people.filter((person) => person.age >= minAge);
// }

// const people = [
//   { firstName: "John", lastName: "Doe", age: 17 },
//   { firstName: "Jane", lastName: "Smith", age: 22 },
//   { firstName: "Alice", lastName: "Johnson", age: 30 },
//   { firstName: "Bob", lastName: "Brown", age: 15 },
// ];

// const adults = filterByAge(people, 18);
// console.log(adults);

//compose function

function compose(...fns) {
  return function (x) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}

function fullName(person) {
  return `${person.firstName} ${person.lastName}`;
}

function isAdult(person) {
  return person.age >= 18;
}

const fullNameAndAdultStatus = compose(isAdult, fullName);

const person = { firstName: "John", lastName: "Doe", age: 25 };
const result3 = fullNameAndAdultStatus(person);
console.log(result3);
