// // function are treated as a variable 
// function fn(a) {
//     console.log(a);
//     a();
// }

// // fn([1,2,3,4,5]);
// // fn("i am a param")
// function inner() {
//     console.log("i will be passed as a param");
// }
// fn(inner);


// array 
// map .filter reduce

let arr = [1, 2, 3, 4, 5, 6];

function squarer(x) {
    return x * x;
}
function cube(param) {
    return param * param * param;
}
// polyfill-> older machine
// higher order function
function map(arr, cb) {
    let tempArr = [];
    for (let i = 0; i < arr.length; i++) {
        let sVal =  cb(arr[i]);
        tempArr.push(sVal);
    }
    return tempArr;
}
// let newArr = map(arr, squarer);
let newArr = map(arr, cube);
console.log(newArr)