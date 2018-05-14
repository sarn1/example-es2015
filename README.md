# example-es2015
- https://teamtreehouse.com/library/getting-started-with-es2015
- https://github.com/taniarascia/es6
- https://repl.it/repls/VirtuousJointTelephones

# Notes #

## History ##
- Javascript was developed in 10 days by Brendan Eich at Netscape.
- Microsoft adopted their own version of Javascript calling it JScript.
- Standardization of Javascript was established by an orgaization called ECMA Interational by 1997.
- ECMAScript is the same as Javascript, and the name can be used interchangeably, since the name "Javascript" is owned by Netscape, Microsoft and Netscape agree upon the name ECMAScript.
- By 1993, ECMAScript 3 came out expanding the language to include RegEx and Exception Handling.
- In 2009, ECMAScript 5 came out making JSON the primary data layer and provided many JSON handling methods.
- ES2015 is ES6, the 6th iteration of Javascript and the largest change in Javascript since its initial offering.
- Because not all browsers handle ES6, you would use tools such as Babel to transponder ES6 code to ES5 code.

## Variable Scope
- Variable used to only be declared using `var` which creates a variable in the global namespace.  ES6 allows to newer ways to declare variables, `let` and `const`

```javascript
var hello = 'hello';

function sayHi() {
  var hello = 'hi';
  console.log(hello);
}

sayHi();
console.log(hello)

// output 
hi
hello
```
- You can see that `var` has function level scoping but ES6 allows block level scoping.  A block can be a function, loop, or if-else statement.

```javascript
(function initLoop() {
  function doLoop(x) {
    console.log('loop: ', x);
  }
  
  for (var i = 0; i < 10; i++) {
    doLoop( i+1);
  }
})();

// output
loop: 1
loop: 2
loop: 3
loop: 4
loop: 5
loop: 6
loop: 7
loop: 8
loop: 9
loop: 10
```
- This is fine but then this causes an infintie loop of "loop: 5
- Why 5 and not 4?  The function changes the global variable "i" to 3, and then when it returns the loop increments it to 4 ("i++"), and then when the function is called again, 1 is added to make 5 ("doLoop(i + 1)"). Then inside the function, the print uses the passed-in argument instead of "i", so it prints 5 each time.  This is a great example of why global variables are often a bad idea.

```javascript
(function initLoop() {
  function doLoop(x) {
    i = 3;
    console.log('loop: ', x);
  }
  
  for (var i = 0; i < 10; i++) {
    doLoop( i+1);
  }
})();

// Infinite Loop: 5
```
- A correct way to do this with block level scoping is...

```javascript
(function initLoop() {
  function doLoop(x) {
    // i = 3; -- causes error, varible not defined, since i is now at a block-level scoping
    console.log('loop: ', x);
  }
  
  for (let i = 0; i < 10; i++) {
    doLoop( i+1);
  }
})();
```
- The following will throw an error that a variable has alreay been declared.  And it's right!  You can do this if the 2 lines are in different scope, but not the same scope.
```javascript
const student = { name: 'Ken'; }
var student = { name: 'Jay'; }
```
- So this will work...
```javscript 
(function () {
  const student = { name: 'James' };
  
  function createStudent(name) {
    const student = { name: name };
    return student;
  }
  
  console.log(createStudent('Ken'));
  console.log(student);
})();

// output
{ name: 'Ken' }
{ name: 'James' }
```
- Another example of block level.  Ken is used not James.
```javascript
(function () {
  let student = { name: 'James' };
  
  function createStudent(name) {
    student = { name: name };
    return student;
  }
  
  console.log(createStudent('Ken'));
  console.log(student);
})();
// output
{ name: 'Ken' }
{ name: 'Ken' }
```

## Immediate Invoked Function Expression
```javascript
(function () {
  // some code here
})();
```
- It's a Immediately Invoked Function Expression, which is a is a design pattern that invokes a self executing anonymous function. There are two parts to this design pattern. First is the JavaScript (function () { Here what is happening is the creating an anonymous function that is scoped to just that function. the second part is the () at the end of the function block. This creates an immediately executing function expression, and the JavaScript interpreter will directly invoke the function. Here is an example:

```javascript
(function () { 
    var aName = "Barry";
})();
// Variable name is not accessible from the outside scope
aName // throws "Uncaught ReferenceError: aName is not defined"
```

## Template String
- Any variables you want to wrap in a variable in a string is wrapped in a dollar sign and curly braces.
```javascript
const student = { name: 'James', followerCount: 34 };

let tableHtml = `
  <table class="table">
    <thead>
      <tr>
        <td>Name</td>
        <td>Followers</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${student.name}</td>
        <td>${student.followerCount}</td>
      </tr>
    </tbody>
  </table>`;

console.log(tableHtml);
```

## String Search Method
```javascript
let strToSearch = 'a-really-long-hyphenated-string';

console.log(/^a-really/.test(strToSearch)); // test string w/ regular expression

console.log(strToSearch.indexOf('a-really') === 0); // indexOf

console.log(strToSearch.startsWith('lly', 5)); // startsWith

console.log(/hyphenated-string$/.test(strToSearch)); // test string w/ regular expression

console.log(strToSearch.indexOf('hyphenated-string') === strToSearch.length - 'hyphenated-string'.length); // indexOf

console.log(strToSearch.endsWith('hyphenated-string', 21)); // endsWith
```

## Arrow Functions (Lambda) To Create Functions 
- The following will cause an issue because `var getKeys = Alena.getKeys;` is called outside scope.  This is corrected by using a lambda expression.
```javascript
// person constructor taking data
var Person = function (data) {
  for (var key in data) {
    this[key] = data[key];  
  }
  // method
  this.getKeys = function () {     // the fix is turn this from an anonymous function to an arrow function. this.getKeys = () => {
    return Object.keys(this);
  }
}

// instantiate new person
var Alena = new Person({ name: 'Alena', role: 'Teacher' });

console.log('Alena\'s Keys:', Alena.getKeys()); // 'this' refers to 'Alena'

// assign get key method to var outside of person instance -- this causes an issue
var getKeys = Alena.getKeys;

console.log(getKeys()); // 'this' refers to Alena

```
- What the lambda expression does is binds the function to the instance to the person no matter where it was called.  Previously it only binds from within the instantiation, but now it is bind when accessing directly like in the case of running `console.log`

## Default Parameters
- Can be bool, array, functions, or objects.
```javascript
function test (name = 'Sarn', num) {

test(undefined, 1);
```
## Rest Parameters and Spread Operator
- Rest parameters allow you to specify an unknown number of parameters.
- Rest parameters preceeds with 3 dots and must be the last parameter.
- Think of it as, the rest parameter grabs the parameters and turns the *rest* of the params into an array.
```javascript
function func(name, ...params) {
  console.log(name, params);
}

func('Andrew', 1,2,3);

// output
Andrew [1,2,3]
```
- A spread operator allows you to specify an unknown number of array properties.
- A spread operator adds array elements and spreads them out in another array.
```javascript
const originalFlavors = ['Chocolate', 'Vanilla', 'Tomato'];

const newFlavors = ['Strawberry', 'Mint Chocolate Chip', 'Superman'];

const inventory = ['Rocky Road', ...originalFlavors, 'Neopolitan', ...newFlavors];

console.log(inventory);

// output
[ 'Rocky Road',
  'Chocolate',
  'Vanilla',
  'Tomato',
  'Neopolitan',
  'Strawberry',
  'Mint Chocolate Chip',
  'Superman' ]
```
- Spread operator can be use to split an array for output purposes.
```javascript
function myFunction (name, iceCreamFlavor) {
  console.log(`${name} really likes ${iceCreamFlavor} ice cream.`)
}

let args = ['Gabe', 'Vanilla'];

myFunction(...args);

// output
Gave really likes Vanilla ice cream.
```

## Destructuring
- Destructuring lets you break apart an array or object into variables.
```javascript
let widgets = ['widget1', 'widget2', 'widget3', 'widget4', 'widget5'];

let [a, b, c, ...d] = widgets;

console.log(b);
console.log(d);

// output
widget2
['widget4', 'widget5']
```

```javascript
let parentObject = {
  title: 'Super Important',
  childObject: {
    title: 'Equally Important'
  }
}

let { title, childObject: { title: childTitle } } = parentObject

console.log(childTitle);

// output
Equally Important
```

## Misc
- Object Property Shorthand allows you to access values as variable names.
- A set is like an array but does not allow duplicate data and has some unique methods for utlity.
- Map?

## Structure of Class
- Javascript is a prototype language so it won't have all the OOP features like Java.
```javascript
'use strict';

class Student {
  constructor({ name, age, interestLevel = 5 } = {}) {
    this.name = name;
    this.age = age;
    this.interestLevel = interestLevel;
    this.grades = new Map();
  }
}

let joey = new Student({ name: 'Joey', age: 25 });
let sarah = new Student({ name: 'Sarah', age: 22 });
  
sarah.grades.set('History', 'B');
sarah.grades.set('Math', 'A');
  
console.log(Array.from(sarah.grades));

//console.log(joey);
//console.log(sarah);
```
## Sub-Classes
- Joisting = A named Javascript function that can be appear at the bottom of the script but can be called before it.  Sub-classes are not joisted, so the class must be declared and defined before the sub-class.

```javascript
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

class Student extends Person {              
 dance(traditional) {             
  if(traditional) {
    super.dance();
    return;           
  }               
  const dances = [
    'lyrical',
    'tap',
    'ballet',
    'jazz'
  ]; 
  console.log(`${this.name} is doing the ${dances[Math.floor(Math.random() * dances.length)]}!`);
 }
               
 constructor({ name, age, interestLevel = 5 } = {}) {
   super({ name, age });      // a "super function" is needed in the subclass to use its parent's variable (instance) since what this does is call the constructor of the parent     
   this.name = name;
   this.age = age;
   this.interestLevel = interestLevel;
   this.grades = new Map;
 }
}

let stevenJ = new Student({ name: 'Steven', age: 22, interestLevel: 3 });
stevenJ.dance(true);
console.log(stevenJ.interestLevel);
```
## Static Class
class Bird {
  static changeColor(bird, color) {
    bird.color = color; // can't use "this" since its static, without it you would need to do the commented call below.
  }
  constructor({ color = 'red' } = {}) {
    this.color = color;
  }
}

let redBird = new Bird;               
console.log(redBird.color);
Bird.changeColor(redBird, 'blue');
// Bird.changeColor(redBird, 'blue');
console.log(redBird.color);               
               
// output
red
blue
```

## Getters & Setters
```javascript
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
```
