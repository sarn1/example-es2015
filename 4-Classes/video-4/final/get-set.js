'use strict';

class Student {
  
  get name() {
    return `${this.firstName} ${this.lastName}`;
  }
  
  set name(input) {
    let name = input.split(' ');
    this.firstName = name[0];
    this.lastName = name[1];
  }
  
  constructor({ firstName, lastName, age, interestLevel = 5 } = {}) {
    this.firstName = firstName;
    this.lastName = lastName;           
    this.age = age;
    this.interestLevel = interestLevel;
  }
}

let stevenJ = new Student({ firstName: 'Steven', lastName: 'Jones', age: 22 });
  
console.log(stevenJ.name);  
stevenJ.name = 'Steven Jennings';  
console.log(stevenJ.name); 
               