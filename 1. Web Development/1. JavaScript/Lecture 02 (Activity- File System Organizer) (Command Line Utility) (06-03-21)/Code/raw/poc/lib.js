// In projects for reusibility purposes many times various files require diff. vars
// and functions. Using "Module.export"  we can achieve such feat.

// Although exporting a whole file isn't possible, fragments(vars, funstions) of a file 
// can only be exported.

// Here we export a var "a" and a function fn.
// Which we recieve in client.js file 

let a = 10;
function fn() {
    console.log("Hello");
}
function fn1() {
    console.log("I am fn1");
}
// nodejs
module.exports = {
    val: a,
    func: fn
}