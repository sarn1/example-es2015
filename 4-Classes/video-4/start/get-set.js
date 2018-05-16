'use strict';

class Student {
  constructor({ name, age, interestLevel = 5 } = {}) {
    this.name = name;
    this.age = age;
    this.interestLevel = interestLevel;
  }
}