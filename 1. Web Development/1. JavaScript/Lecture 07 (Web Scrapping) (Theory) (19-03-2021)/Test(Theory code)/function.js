// function statement
// function hello() {
//     console.log("hello");
// }
// hello();
// we can assign value of one variable to another
// let a = 10;
// let b = a;
// console.log(b);
// // we can assign address of a variable to a variable
// let a = [10, 20, 30];
// let b = a;
// console.log(b);

// // functions are also treated as variables
// // we can assign address of a function to a variable
// // possible ,implications-> fp ,async 
// // function type

// function expression
// let varName = function () {
//     console.log("I am exp");
//     return 10;
// }
// let someMore = varName;
// someMore();
// console.log(someMore);
// console.log(varName)
// let a = varName();

// function 
// function fn() {
//     console.log("Hello");
// }


// function fn(){
//     console.log("I am Fake");
// }

// fn();


let fn = function () {
    console.log("hello");
}
let fn = function () {
    console.log("Fake");
}
// arrow function
// let fn = () => {
//     console.log("I am arrow")
// }
// fn();

//     // IIFE-> Immeditely invoked function expression

//     (function () {
//         console.log("I will be executed instantly");
//     })();
// console.log("after");



// Strings
// immutable
let varName = 10;
let a = 'I am single quotes string' + varName + "after";
let b = "I am double quotes" + varName + "after";
console.log("single", a);
console.log("double", b);
// template string
// multiline string
let c = `I am back ${varName} ${a} tick string`;
console.log("template", c);