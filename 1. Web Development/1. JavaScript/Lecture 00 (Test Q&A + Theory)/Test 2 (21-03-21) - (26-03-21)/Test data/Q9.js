// Find the output of following :

function globalFunction(x) {
  return function outerFunction(y) {
    return function innerFunction(z) {
      return x + y + z;
    };
  };
}

let instance1 = globalFunction(2);
var instance2 = instance1(3);
console.log(instance2());


// Options:

// 1) undefined
// 2) error
// 3) NaN
// 4) 5undefined

// Solution:
// 3