'use strict';

function greet(name = 'Guil', timeOfDay = 'Day') {
  console.log(`Good ${timeOfDay}, ${name}!`);
}

greet(undefined, 'Afternoon');