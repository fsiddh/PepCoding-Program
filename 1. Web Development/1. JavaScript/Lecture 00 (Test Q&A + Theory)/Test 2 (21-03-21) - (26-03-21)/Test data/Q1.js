// Q-  List the side effect and convert the function to a pure function which does the same thing

let arr = [1, 2, 3, 4];

function f(arr) {
    for (x in arr) {
        arr[x] = 0
    }
    return arr;
}

console.log(arr);

console.log(f(arr));

console.log(arr);


// Solution:
// arr is getting changed that is side effect

// function f(arr) {
//     let nArr = arr.map(function(e){return 0})
//     return nArr;
// }