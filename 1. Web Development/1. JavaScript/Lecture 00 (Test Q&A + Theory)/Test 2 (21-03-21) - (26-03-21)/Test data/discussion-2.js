// Pure functions are the functions which don't have any external dependency, doesn't mutate and given reference works on an input give some output and the output remains same everytime for the same input

function add(x, y) {
  return x + y;
}

// Here add is a pure function

// Examples of impure function

function add(x, y) {
  console.log(x + y);
}

// The above function prints something on the console and hence it is impure. Doing something other than working on inputs and returning a value without mutating anything is called a side effect and printing on the console is a side effect of running this function.

let a = [1, 2, 3];

function change() {
  a[0] = 0;
}

// The function change works on the data that was not passed to it, i.e, an external dependency that makes it impure furthermore it also changes the contents of the array "a" for all of its further existence and hence mutating it.

// If a function takes another function as an input parameter that function becomes a higher order function and the function passed as a parameter is called a callback.

function sub(x, y) {
  return x - y;
}

function mul(x, y) {
  return x * y;
}

function cal(x, y, op) {
  return op(x, y);
}

console.log(cal(2, 3, sub));
console.log(cal(2, 3, mul));

// Here cal is a higher order function as it can take another function as an argument
// The advantage of this approach is the we can switch out the callback function and entirely change the function's task. As in the first call because we passed sub function as callback we got subtraction of 2 and 3 and in the 2nd call we passed mul function as callback we got multiplication of 2 and 3.

// map filter and reduce are some higher order methods defined on Array

let arr = [1, 2, 3, 4];

// map works on an array takes a function as input and calls that function on every element of the array pushing the result into a new array and then returns the new array without mutating the original array

console.log(
  arr.map(function (e) {
    return 2 * x;
  })
);

// the above code gives us an array of numbers that are twice of the numbers present in arr array

// filter method works on the same principle as map but instead of calling the function to generate new value for each element, filter checks for a condition and if the element satisfy the condition it is returned in thed new Array.

function checkEven(x) {
  return x % 2 === 0;
}

console.log(arr.filter(checkEven));

// the above code give us the array [2,4]

// The reduce function takes all the elements and performs the same operation between each element, hence reducing all the elements to a singular value. The way it finds which operation to perform is through the callback function passed to it.

function adder(x, y) {
  return x + y;
}

console.log(arr.reduce(adder));

// the above code gives us the sum of all the elements of the arr array.

// Note map filter and reduce does not mutate the array

// A polyfill is a piece of code used to provide modern functionality on older browsers that do not natively support it.

// following is the polyfill function of map

let a = [3, 4, 5, 6, 7, 8];

function myPolyFill(arr, cb) {
  let nArr = [];
  for (x in arr) {
    nArr.push(cb(arr[x]));
  }
  return nArr;
}

function sq(x) {
  return x * x;
}

console.log(myPolyFill(a, sq));
console.log(a.map(sq));

// Closure comes in picture when we talk about function defined inside another function and the outer fucntion is removed from the callstack but the inner function is still in the callstack and is referencing the variables of outer function, which it has access to even after outer function removed from stack due to "closure".

function f() {
  let a = [];
  var i;
  for (i = 0; i < 2; i++) {
    a.push(function () {
      return 2 * i;
    });
  }
  return a;
}

let a = f();

console.log(a[0]());
console.log(a[1]());

// this gives output
// 4
// 4

// Because the inner functions which were returned in the array were accessing its parent function variable "i" which after the loop became 2. The parent function f was called and removed from the stack after it was executed. Still after that because of closure context the child functions were able to access "i" and this closure context will always have the most updated value of i. Note the copy of i was not saved with the child function when it was saved in the array.

// Right now all the code we wrote was synchronous that means when the execution starts the code will always run top to bottom left to right without skipping any line. We can delay the execution of some code( callback function) and this paradigm is called asynchronous.There are multiple ways of doing this, the 2 ways we are going to discuss this is using setInterval and setTimeout.

// setTimeout is a function that takes 2 things a callback and time in ms. Whenever it is invoked, it goes out of normal execution and wait for the time passed to it and after that time passes it invokes the callback function. Hence delaying the execution of callback function, giving it an asychronous nature.

setTimeout(function () {
  console.log("2 seconds has been passed");
}, 2000);

// setInterval is as if an extension of setTimeout. Instead of executing callback function only once, it creates an interval and keep executing the callback function after each cycle of the time passed to it. The way to stop it is to clear the interval.

let interval = setInterval(function () {
  console.log(".5 seconds has been passed");
}, 500);

clearInterval(interval);
