'use strict';

let Student = function(data) {
  this.name = data.name;
  this.age = data.age;
}

let joey = new Student({ name: 'Joey', age: 25 });
let sarah = new Student({ name: 'Sarah', age: 22 });

console.log(joey);
console.log(sarah);