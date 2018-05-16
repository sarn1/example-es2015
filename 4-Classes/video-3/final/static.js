'use strict';

class Bird {
  static changeColor(bird, color) {
    bird.color = color;
  }
  constructor({ color = 'red' } = {}) {
    this.color = color;
  }
}

let redBird = new Bird;               
console.log(redBird.color);
Bird.changeColor(redBird, 'blue');
console.log(redBird.color);               
               