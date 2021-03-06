// use 
// /nodejs

// We had exported a var and a function from lib.js file.
// Therefore in "libfileObj" var we recieve those info. in the form of an object! 

let libfileObj = require("./lib.js");
console.log("Inside client");
console.log(libfileObj.val)
libfileObj.func();