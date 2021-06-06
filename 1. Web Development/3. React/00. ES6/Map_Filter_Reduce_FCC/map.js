//higher order function
// any fn that takes another fn as an argument or returns another function 


let arr = [1,2,3,4,5,6];
// let narr=[];
// for(let i=0;i<arr.length;i++)
// {
//     narr[i]=2*arr[i];
// }
// console.log(narr);
// console.log(arr);
let fn = function(el){
    console.log(el);
    return 2*el;
}
let narr = arr.map(fn)
console.log(narr);