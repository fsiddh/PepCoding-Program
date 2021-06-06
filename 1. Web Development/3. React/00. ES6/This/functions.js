// var person = 'Tushar'
function fn()
{
    'use strict' // when use strict is used inside a function and when that is function is called normally
    //  the value of this inside that function will be equal to undefined
    console.log(this);
    console.log(`Hi my name is ${this.person}`);
}

// In functions the value of this is dependent upon how a function is called
// Dynamicaly/ runtime this ki value bind hoti h functions pe

// fn(); //1
// When a fn is called by default the value of thsi is passed to it ie equal to the window object

let obj ={
    person:'Alexander',
    func:fn
}

obj.func(); //2
// when a function is called through an object, the this value of the function is equal to the object 
//  through which it is called.


// let fon = obj.func;
// fon();


// setTimeout(obj.func,1000)
