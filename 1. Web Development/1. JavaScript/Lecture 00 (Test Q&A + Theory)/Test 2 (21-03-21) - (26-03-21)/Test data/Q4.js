// Q find the output of the following code 

let a = ["a", "b"]
a[2] = a 

function f(a) {
    a = a[2]
    console.log(a);
    let n = Array("a", "b")
    console.log(a[2] = n);
    console.log(a);
    console.log(n);
    a = n;
    console.log(a);
}


console.log(a);
f(a)
console.log(a);

// Options:

// 1)
// ["a", "b", ["a", "b"]]
// ["a", "b"]
// ["a", "b", ["a", "b"]]
// ["a", "b", ["a", "b"]]
// ["a", "b"]
// ["a", "b"]
// ["a", "b", ["a", "b"]]



// 2)
// [ 'a', 'b', [Circular] ]
// [ 'a', 'b', [Circular] ]
// [ 'a', 'b' ]
// [ 'a', 'b', [ 'a', 'b' ] ]
// [ 'a', 'b' ]
// [ 'a', 'b' ]
// [ 'a', 'b', [ 'a', 'b' ] ]


// Solution:
// option 2