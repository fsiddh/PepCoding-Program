// Q - Write a function f that returns product of x and y with both of the following function calls

// f(x, y)
// f(x)(y)



// Solution:

function f(y, x) {
  if (arguments.length == 1) {
    return function (x) {
      return y * x;
    };
  } else {
    return x * y;
  }
}

