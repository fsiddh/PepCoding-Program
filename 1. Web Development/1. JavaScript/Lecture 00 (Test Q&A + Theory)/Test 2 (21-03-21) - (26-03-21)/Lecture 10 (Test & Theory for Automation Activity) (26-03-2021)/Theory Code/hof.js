// feature -> implement -> polyfill
function squarer(a) {
    return a * a;
}
function cuber(a) {
    return a * a * a;
}
// function myMap(arr, cb) {
//     let tArr = [];
//     for (let i = 0; i < arr.length; i++) {
//         let ans = cb(arr[i]);
//         tArr.push(ans);
//     }
//     return tArr;

// }
let newArr = myMap(arr, squarer);
// let newArr = arr.map(squarer);
// let cubeArr = arr.map(cuber);
// console.log("New Arr", newArr);
// console.log("arr", arr);
// console.log("`````````````````````````");

// console.log("cube arr", cubeArr);
// **********************filter***********************************
// function isEven(num) {
//     return num % 2 == 0;
// }
// function Myfilter(arr, test) {
//     let tArr = [];
//     for (let i = 0; i < arr.length; i++) {
//         if (test(arr[i]) == true) {
//             tArr.push(arr[i]);
//         }
//     }
//     return tArr;
// }

let EvenArr = arr.filter(isEven);
// console.log("EvenArr ", EvenArr);
// console.log("arr ", arr);
// console.log("``````````````````````````````");
// EvenArr = Myfilter(arr, isEven);
// console.log("EvenArr ", EvenArr);
// console.log("arr ", arr);
// ********************************************
// empty function
// function fn() {
// }


// let newArr = arr.filter(fn);
// console.log(newArr);

let arr = [10, 20, 30, 40, 50, 17, 11, 23];
function add(storage, ith) {
    return storage + ith;
}
function product(storage, ith) {
    return storage * ith;
}
// let product = arr.reduce(add);
function myReduce(arr, cb) {
    let storage = arr[0];
    for (let i = 1; i < arr.length; i++) {
        storage = cb(storage, arr[i]);
    }
    return storage;
}
console.log("sum", myReduce(arr,add));
console.log("product", myReduce(arr,product));
// pure function -> hof
// map ,filter ,reduce 
