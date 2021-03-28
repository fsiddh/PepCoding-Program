const fs = require("fs");
console.log("before");

let promise = fs.promises.readFile("f1.txt"); // this ".rF" is an "promises" method which work similar to a callback fn() ie
                                              // Asynchronously

console.log("Initial State: ", promise); // Initial state of a "promise" is always pending

promise.then(function (data) { // ".then" executes when the promise is completed or resolved!
    console.log(data+""); 
})

promise.catch(function(err){ // ".catch" executes when the promise is rejected or some error has occured!
    console.log("err", err);
})

console.log("after");
