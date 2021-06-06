let arr=[1,2,3,4,5,6];

// let sum=0;
// for(let i=0;i<arr.length;i++)
// {
//     sum+=arr[i];
// }
// console.log(sum);

let sum = arr.reduce(function(acc,cval){
    console.log('acc=> '+acc+" "+"cval=> "+cval);
    return acc+cval;
})
console.log(sum);