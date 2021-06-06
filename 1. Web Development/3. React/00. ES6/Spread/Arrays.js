//WHat is spread?
// ... is the symbol of spread
// iterative elements ko expand

// let arr = [1,2];

// console.log(...arr);

//////////////////////////////////////////////
//copy 

let arr =[0,1,2,3,4,5,6]
let idx=3;
//i have to insert el 10 at idx 3
// i have to make this immutably
let narr =[];
// for(let i=0;i<idx;i++)
// {
//     narr[i]=arr[i];
// }
// narr[idx]=10;
// for(let i=idx;i<arr.length;i++)
// {
//     narr.push(arr[i]);
// }
// console.log(arr);
// console.log(narr);


// narr=arr;
// narr[0]=1000;
// console.log(arr);
// console.log(narr);

// narr=[...arr];
// narr[0]=1000;
// console.log(arr);
// console.log(narr);

narr= [...arr.slice(0,idx),10,...arr.slice(idx)];
// console.log(narr);

narr[0]=1000;
console.log(arr);
console.log(narr);