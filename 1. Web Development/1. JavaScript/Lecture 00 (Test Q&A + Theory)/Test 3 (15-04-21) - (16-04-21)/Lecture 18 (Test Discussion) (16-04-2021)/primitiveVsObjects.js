// Primitive -> number ,boolean ,string,undefined, null ,symbol
// Objects -> arrays,functions, errors, dates, object
// function fn() {
//     console.log("hello from fn");
// }
// // functions are the object that implement callbable
// // object -> key :value
// //  property ,method

// fn.myProp = "hello";
// fn.innerFn = function () {
//     console.log("I am a method of a fn");
// }
// console.log(fn.myProp);
// fn.innerFn();
// console.log(fn);
// let str = new String("abc");
//  arr is an adapter of objects
// let arr = ["hi", "hello", "how ", "are ", "you"];
let arr = [10, 23, 4, 5, 67];

// arr["last Value"] = 10;
arr.sum = function () {
	let count = 0;
	for (let i = 0; i < this.length; i++) {
		count += arr[i];
	}
	console.log(count);
};
arr.sum();
// // console.log(arr);
// for (let key in arr) {
//     console.log(key, " : ", arr[key]);
// }
