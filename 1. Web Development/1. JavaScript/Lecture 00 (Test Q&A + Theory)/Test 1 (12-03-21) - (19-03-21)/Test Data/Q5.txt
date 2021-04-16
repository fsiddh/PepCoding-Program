Title: 
Dynamic Game of Arrays 

Meta-Tags:
Javascript, JS, interview, questions, interview questions,functions,arrays,practice

Description:
Find output of the following:


let arr = [1, 2, 3];
(function () {
  for (x in arr) arr.unshift(arr.pop());
  console.log(arr);
})();

let randomAdder = function (arr = ["a", "b"]) {
  arr[arr.length * arr.length] = arr.length * arr.length;
};

randomAdder(arr);
randomAdder();

console.log(arr[9]);
console.log(arr[8]);

Options:

A)  
[ 3, 2, 1 ]
9
["a", "b"]

B)  
[ 3, 2, 1 ]
9
undefined

C)  
[ 1, 2, 3 ]
9
["a", "b"]

D)  
[ 1, 2, 3 ]
9
undefined


Solution:
D 