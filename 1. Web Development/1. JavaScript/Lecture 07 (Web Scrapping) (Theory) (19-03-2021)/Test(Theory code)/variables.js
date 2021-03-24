// variable declare
// var,let ,const
// variable declare -> var , redeclared, 
// scope
// var a;
// console.log(a);
// var a;
// a = 10;
// a = 10.1;
// console.log(a);
// let -> can't be redeclared;,you can't access before declaration, 
// let is blocked scope i.e you can have same varibale name in diffrent blocks
// 2015
// console.log(a);
// declare
// let a;
// init
// a = 10;
// let a;
// a = 10.1;
// console.log(a);
// block scope=> 
// {
//     let a = 10;
//     console.log("28", a);
//     {
//         // let a = 20;
//         console.log("31", a);
//         {
//             console.log("33", a);
//         }
//     }
//     console.log("36",a)
// }

// const -> exactly behaves like let but it stores 
// value/address of the variable


// {
//     const a = 10;
//     console.log("28", a);
//     {
//         const a = 20;
//         console.log("31", a);
//         {
//             const a=30;
//             console.log("33", a);
//         }
//     }
//     console.log("36",a)
//     a=20;
// }
// array -> storage
// const a=[10,20];
// a=",mjvbvb";
// let a=[10,20,30];
// a=[30,20,30];
// console.log(a);
// const a=[10,20];
// a[0]=30;
// console.log(a);
// Javascript -> trademark oracle is very good emulation 
// Ecmascript
// class object ,functions, arrays


// let obj = {
//     0: 10,
//     1: 20,
//     2: 30,
//     3: 40
// }
// let keys = Object.keys(obj);
// for (let i = 0; i < keys.length; i++) {
//     console.log(i, " ->", obj[i]);
// }
// let arr=[10,20,30];
// console.log(arr[55]);
// for(key in arr){
//     console.log(key ,"  : ",arr[key] );
// }




