const fs = require("fs");
console.log("before");

let promise = fs.promises.readFile("f1.txt");

console.log("Initial State: ", promise);
promise.then(function (data) {
    console.log(data+"");
})

promise.catch(function(err){
    console.log("err", err);
})

console.log("after");
