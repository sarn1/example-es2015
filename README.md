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
```
