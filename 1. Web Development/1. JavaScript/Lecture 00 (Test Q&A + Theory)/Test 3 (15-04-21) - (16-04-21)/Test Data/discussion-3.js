// //Creation of Promise

// var promise = new Promise(function executer(resolve, reject) {
//   // async code  which on compvarion calls
//   //resolve or reject
// });

// //executer is producer code which has 2 predfined callbacks resolve and reject

// // Initially promise has 2 properties
// //     1- result which is undefined
// //     2- state is pending

// // After promise is resolved the state becomes fullfilled
// // and result can be
// //     1- resolved value
// //     2- error

// // result as a value
// var promise = new Promise(function executer(resolve, reject) {
//   setTimeout(() => {
//     resolve("Some value");
//   }, 1000);
// });

// //promise resolves after 1 sec with result = Some value

// // result as an error
// var promise = new Promise(function executer(resolve, reject) {
//   setTimeout(() => {
//     reject(new Error("Some error"));
//   }, 1000);
// });

// //promise resolves after 1 sec with result = error

// // The executor should call only one resolve or one reject. Any state change is final.

// // All further calls of resolve and reject are ignored

// var promise = new Promise(function executer(resolve, reject) {
//   resolve("Some value which will be resolved");
//   resolve("Some value 2"); //Ignored
//   resolve("Some value 3"); //Ignored
//   resolve("Some value 4"); //Ignored
// });

// //The properties state and result are internal
// //To get them we have to use .then .catch and .finally

// // Getting resolved value with then

// promise = new Promise(function (resolve, reject) {
//   setTimeout(() => {
//     resolve("Some result");
//   }, 1000);
// });

// //then only works after promise has state fullfilled
// promise.then(function (receivedValue) {
//   console.log(receivedValue);
// });

// //  Getting error with then

// promise = new Promise(function (resolve, reject) {
//   setTimeout(() => {
//     reject("Some result");
//   }, 1000);
// });

// promise.then(null, function (receivedError) {
//   console.log(receivedError);
// });

// //then can handle both simultaneously
// //but promise only returns either error or some value

// promise.then(
//   function (receivedValue) {
//     console.log(receivedValue);
//   },
//   function (receivedError) {
//     console.log(receivedError);
//   }
// );

// //To handle error we can use catch also

// promise = new Promise(function (resolve, reject) {
//   setTimeout(() => {
//     reject("Some result");
//   }, 1000);
// });

// promise.catch(function (receivedError) {
//   console.log(receivedError);
// });

// //finally
// // 1-Another handler which can be atteached before then and catch
// // 2-Doesn't get any value or error like then and catch
// // 3-Instead it passed the result to next handler

// new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     resolve("Some value");
//   }, 1000);
// })
//   .finally(function () {
//     console.log(
//       "Finally block to do cleaning tasks like deallocating resources"
//     );
//   })
//   .then(function (value) {
//     console.log(value);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// //We can attach multiple then to a promise and also to a settled promise

// // the promise becomes resolved immediately upon creation
// let promise = new Promise(function (resolve) {
//   resolve("done!");
// });

// promise.then(console.log); // done! (shows up right now)

// //Sequence of async tasks => Promise chaining

// new Promise(function (resolve, reject) {
//   setTimeout(() => resolve(1), 1000);
// })
//   .then(function (result) {
//     console.log(result);
//     return result * 2;
//   })
//   .then(function (result) {
//     console.log(result);
//     return result * 2;
//   })
//   .then(function (result) {
//     console.log(result);
//     return result * 2;
//   })
//   .then(function (result) {
//     console.log(result);
//     return result * 2;
//   })
//   .then(function (result) {
//     console.log(result);
//     return result * 2;
//   });

// new Promise(function (resolve, reject) {
//   setTimeout(() => resolve(1), 1000);
// })
//   .then(function (result) {
//     return new Promise(function (resolve, reject) {
//       setTimeout(() => resolve(result * 2), 2000);
//     });
//   })
//   .then(function (result) {
//     return new Promise(function (resolve, reject) {
//       setTimeout(() => resolve(result * 2), 1000);
//     });
//   })
//   .then(function (result) {
//     return new Promise(function (resolve, reject) {
//       setTimeout(() => resolve(result * 2), 500);
//     });
//   })
//   .then(function (result) {
//     console.log(result);
//   });

// // The whole thing works, because a call to promise.then returns a promise, so that we can call the next .then on it.

// // When a handler returns a value, it becomes the result of that promise, so the next .then is called with it.

// // A classic newbie error: technically we can also add many .then to a single promise. This is not chaining.

// //Promise.all

// function pg(value) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(function () {
//       resolve(value);
//     }, 1000);
//   });
// }

// Promise.all([pg(0), pg(1), pg(2)])
//   .then(function (results) {
//     console.log(results);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// // Promises in loop

// // 1- Sequence

// let p = pg(1);

// for (let i = 2; i <= 10; i++) {
//   p = p.then(function (result) {
//     console.log(result);
//     return pg(i);
//   });
// }

// p.then(function (result) {
//   console.log(result);
// })

// 2- Parallel

// for (let j = 1; j <= 5; j++) {
//   pg(j).then(function (result) {
//     console.log(result);
//   });
// }

// Macrotasks and Microtasks queue are essentially queue structures present in js engine to maintain in which order the asynchronous functions should get executed.

// As they are queue so the FIFO logic stays the same. The difference being microtasks queue has higher priority than macrotasks queue.

// Promises are pushed into microtasks queue and setTimeout, setInterval are passed to macrotasks queue

// setTimeout(function () {
//   console.log(1);
// });

// let p = new Promise(function (resolve, reject) {
//   resolve(2);
// });

// p.then(function (v) {
//   console.log(v);
// });

// In the above example promise will be executed before setTimeout even though setTimeout was called first as promise is pushed to microtask queue with higher priority and setTimeout is pushed to macrotask queue

// Thunk is nothing but a wrapper function around a value. You dont need to pass anything to a thunk just call it and it will give you a value. Now thunks can be synchronous as well as asynchronous.

// function add(x, y) {
//   return x + y;
// }

// function thunk() {
//   return add(3, 5);
// }

//Above is an example of synchronous thunk

// function thunk2(cb) {
//   setTimeout(function () {
//     cb(add(3, 5));
//   }, 100);
// }

// Above is an example of asynchronous thunk. In this however we have to pass a callback to retrieve the wrapped value

// A shallow copy constructs a new object and then inserts references into it to the objects found in the original. A deep copy constructs a new object and then, recursively, inserts copies into it of the objects found in the original.

// To copy an object in JavaScript, you have three options:

// Use the spread (...) syntax
// Use the Object.assign() method
// Use the JSON.stringify() and JSON.parse() methods

// const person = {
//   firstName: "John",
//   lastName: "Doe",
// };

// // using spread ...
// let p1 = {
//   ...person,
// };

// // using  Object.assign() method
// let p2 = Object.assign({}, person);

// // using JSON
// let p3 = JSON.parse(JSON.stringify(person));

// Both spread (...) and Object.assign() perform a shallow copy while the JSON methods carry a deep copy

// Note that some references get undefined when using JSON method

// If you do not use Dates, functions, undefined, Infinity, RegExps, Maps, Sets, Blobs, FileLists, ImageDatas, sparse Arrays, Typed Arrays or other complex types within your object, a very simple one liner to deep clone an object is:

// JSON.parse(JSON.stringify(object))

// null vs undefined vs undeclared

// undefined is a variable that has been declared but no value exists and is a type of itself ‘undefined’.

// let a;

// a is undefined as it is declared but has no value

// null is a value of a variable and is a type of object.

// let b = null

// undeclared variables is a variable that has been declared without ‘var’ keyword.

// testVar = "hello world";

// as opposed to

// var testVar = "hello world";

// When former code is executed, undeclared variables are created as global variable and they are configurable (ex. can be deleted).

// If we have a bit of code which may give error at some point its better to put it in a
// try catch block

// try {
//   console.log(someNotDeclaredVariable);
// } catch (err) {
//   console.log(err);
// }

// We can explicitly throw errors for our custom conditions by

// throw Error("message")


// In JavaScript everything is either a primitive or an object 

// Therefore functions and arrays are also nothing but Object

// To prove it if we can add a property to something we can say its an Object, so 

// function f() {
//     return 2;
// }

// console.log(f);

// f.des = "returns 2 as a number"

// console.log(f);


// let a = [1, 2, 3]

// console.log(a);

// a.someVal = 4;

// console.log(a);




