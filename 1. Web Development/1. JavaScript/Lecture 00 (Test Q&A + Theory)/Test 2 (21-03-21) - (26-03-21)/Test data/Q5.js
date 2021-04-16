//Q create a polyfill of reduce

// Solution:

function reduce(arr, reducer) {
  let ans = arr[0];
  for (let i = 1; i < arr.length; i++) {
    ans = reducer(ans, arr[i]);
  }
  return ans;
}

