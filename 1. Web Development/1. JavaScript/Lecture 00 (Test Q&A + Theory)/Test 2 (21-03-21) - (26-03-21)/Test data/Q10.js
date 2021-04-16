//Q- Find the output of the following:

let arr = ["a", "b", "c", "d", 1, 2, 3, 4];

arr.map(function (e) {
  return 2 * e;
});

(function () {
  arr.filter(function () {});
})();

console.log(arr);

let nArr;
nArr = arr.filter(function (e) {
  return Number.isInteger(e);
});
nArr = new Array();
console.log(nArr);

nArr = arr
  .filter(function (e) {
    return !Number.isInteger(e);
  })
  .map(function (e) {
    return e + 1;
  });

console.log(nArr);


// Options:

// 1)
// []
// [1, 2, 3, 4]
// ['b', 'c', 'd', 'e']

// 2)
// ["a", "b", "c", "d", 1, 2, 3, 4];
// [1, 2, 3, 4]
// ["a1","b1","c1","d1"]

// 3)
// ["a", "b", "c", "d", 1, 2, 3, 4];
// []
// ['b', 'c', 'd', 'e']

// 4)
// [ 'a', 'b', 'c', 'd', 1, 2, 3, 4 ]
// []
// [ 'a1', 'b1', 'c1', 'd1' ]

// Solution:
// 4