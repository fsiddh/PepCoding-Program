// smaller function
// call back function -> the function that are passed as a parameter to be used by that function later  
function add(x, y) {
    return x + y;
}
// smaller function
function sub(x, y) {
    return x - y;
}
function divide(x, y) {
    if (y == 0) {
        return "invalid operation"
    }
    return x % y;
}
function multiply(x, y) {
    return x * y;
}
// higher order function -> a function that accepts a function as an argument or returns a function
// we use composition instead of inheritance
// bigger function
function calculator(x, y, opertorFn) {
    let ans = opertorFn(x, y);
    return ans;
}
// props
console.log("Result is : ",calculator(10,20,add))
console.log("Result is : ",calculator(10,20,multiply))
console.log("Result is : ",calculator(10,20,divide))
console.log("Result is : ",calculator(10,20,sub))