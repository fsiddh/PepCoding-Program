// function fn()
// {
//     console.log(this.person);
//     console.log(this);
//     function abc()
//     {
//         console.log(this);
//         console.log(this.person);
//     }
//     abc();
// }

// let obj = {
//     person:'Tushar',
//     func:fn
// }

// obj.func();

//////////////////////////////soln -1 using bind
//  let ret = functioni.bind(argument)
// the bind method returns another function whose this se set equal to the argument that is paased to bind.

// function fn()
// {
//     // console.log(this.person);
//     // console.log(this);
//     function abc()
//     {
//         console.log(this);
//         console.log(this.person);
//     }
//     // abc();
//     let ret = abc.bind(this);
//     // the value of this for this ret function is equal to this ie obj
//     // ret();
//     // abc();
//     return ret;
// }

// let obj = {
//     person:'Tushar',
//     func:fn
// }

// let returnValue =obj.func();
// returnValue();

//////////////////////////////////////soln-2 Arrow Function
//syntax
//   let fon = ()=>{
//   }
// the this of arrow function is equal to the this of their immediate parent function/ lexically superior this

function fn()
{
    console.log(this.person);
    console.log(this);
    let abc = ()=>{
        console.log(this);
        console.log(this.person);
    }
    abc();
}

let obj = {
    person:'Tushar',
    func:fn
}

obj.func();
// let ret = obj.func;
// ret();