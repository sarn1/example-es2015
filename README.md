# example-es2015
- https://teamtreehouse.com/library/getting-started-with-es2015
- https://github.com/taniarascia/es6

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
