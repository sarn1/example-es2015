'use strict';

class Person {
  dance() {
    const dances = [
      'waltz',
      'tango',
      'mambo',
      'foxtrot'
    ];
    console.log(`${this.name} is doing the ${dances[Math.floor(Math.random() * dances.length)]}!`);
  }
  constructor({ name, age, eyeColor = 'brown' } = {}) {
    this.name = name;
    this.age = age;
    this.eyeColor = eyeColor;
  }
}

let stevenJ = new Person({ name: 'Steven', age: 22 });
stevenJ.dance();